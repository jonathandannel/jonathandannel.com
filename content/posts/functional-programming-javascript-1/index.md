---
title: Functional programming in Javascript (Part 1)
description: Closures, higher order functions, and memoization
author: "Jonathan Dannel"
category: "javascript"
cover: lambda.png
date: "2021-04-13T00:00:00.001Z"
tags: ["functional programming", "javascript"]
---

Having recently worked with [Clojure](https://clojure.org/) in depth for the first time, I realized that I've been bitten by the functional programming bug. There's something really elegant and satisfying about writing code in a purely functional mindset, and I've found myself approaching my 'native' language, Javascript, in much the same way. It turns out that Javascript is extremely well-suited to a functional style of programming, and I'd like to share some of the things I've learned along the way.

Functional programming isn't some mystical secret guarded by mathematicians working with Lisp anymore. Nearly every modern language has added support for anonymous functions, map/filter/reduce methods, and other goodies. Javascript is no different. It's actually become quite mainstream!

For example, if you've ever used a library like React or Redux, you're pretty much already doing functional programming to some extent. After all, React is just about functions taking some input (props) and returning some output (HTML), with some extra implementation logic behind the scenes.

## The gist of functional programming

- A function's return value should only change if its arguments change
- A function should have no side effects. If you're calling functions without using their return values, they probably have side effects
- Prefer immutable data. That is, prefer returning new objects and arrays rather than changing their values in place. It's dangerous to change values that other parts of your program might be reliant on, and you're bound to break something
- Avoid state whenever possible. It's not always avoidable, but the values that you need should ideally be returned from functions when possible - no class instances that hold their own data, and no mutable variables littered everywhere
- A function should have one purpose and do its job well. This makes it easy to reuse, chain with other functions, and reason about what it does
- Functions should be composable and be able to work together to build bigger functions or solve bigger problems

With that out of the way, let's jump right in and take a look at some basic Javascript features that we can use to start solving problems in a more functional manner.

## A core concept: Closures

Closures are all about scope. A function nested in another function is able to access variables defined in the outer scope.


```javascript
function incrementFrom(start) {
  let total = start;
  return function () {
    total++;
    return total;
  };
}

const generateNext = incrementFrom(5);

// incrementFrom returns a function which we can call to increment the value at our discretion
// We bind the variable 'generateNext' to the function that incrementFrom returns

console.log(generateNext); // [Function (anonymous)]

console.log(generateNext()); // 6
console.log(generateNext()); // 7
console.log(generateNext()); // 8
```

If you've never seen a closure before, pay extra attention to this piece of code:

```javascript
const generateNext = incrementFrom(5);

// incrementFrom returns a function which we can call to increment the value at our discretion
// We bind the variable 'generateNext' to the function that incrementFrom returns
```

Just remember that `incrementFrom` returns a function, and we're binding it to a variable. The variable is now a function that we can call.

In this example, the variable `total` and the function that modifies/reads it is enclosed by the outer function (hence the term closure). The value is hidden from the outer scope and can only be accessed and manipulated by the anonymous function that it returns, which can be called over and over to increment the value by one.

We can even omit the variable altogether and just use the argument value to keep track of the total. The function will "remember" its original argument's value. We can also use ES6 syntax to make the code more concise.

```javascript
const incrementFrom = (start) => () => start++;

const generateNext = incrementFrom(5);

console.log(generateNext()); // 6
console.log(generateNext()); // 7
console.log(generateNext()); // 8
```


## Higher order functions

The previous bit of code is not only an example of a closure, but a higher order function.

Part of what makes Javascript so well suited for functional styles of programming is that it allows functions to be passed to other functions, return other functions, and call functions inside functions. Functions are treated as first class citizens and can be passed around freely.

The cornerstone of functional programming is the higher order function: the function that either returns function or takes another function as an argument.

### A trite example: Logging

```javascript
const add = (a, b) => a + b;

const attachLogger = (fn) => (...args) => {
  const returnValue = fn(...args);
  console.log(`Function ${fn.name} called with ${args}`);
  console.log(`Function ${fn.name} returned ${returnValue}`);
  return returnValue;
};

const loggedAdd = attachLogger(add);

loggedAdd(8, 5);

// Function add called with 8,5
// Function add returned 13
```

- `attachLogger` is a function that takes a function as an argument and returns a new function
- This new function accepts any number of arguments. We've assigned it to a variable, `loggedAdd`
- When the new function is called with arguments, it calls the original function `add` with those arguments and assigns its value to a variable
- The inner function logs some stuff and returns the value

If you've ever used something like Express or Redux, functions like these are commonly referred to as "middleware". They wrap routes and methods, do something with data, and send the function off to its next desination.

Since `attachLogger(add)` is simply a function that is waiting for args to be passed to it in parentheses, we don't have to bind it to a variable. We can just call it directly:

```javascript
attachLogger(add)(10, 20);

// Function add called with 10,20
// Function add returned 30
```
It's somewhat of a silly example, but with a function like this, we can avoid putting `console.log` statements inside other functions. We can just attach this logger to a function if we need it. This reinforces the principle that functions should do only what they say they do. Logging is a side effect, but we've isolated the side effect to an area of code that explicitly provides one.

### Another trite example: Doing something once

What if we want a function to run only once, and ignore all subsequent calls? A higher order function can help us with that!

Imagine a fictitious scenario where we want to prevent multiple orders being placed if a user is doing some online shopping and clicks the "order now" button too many times.

```javascript
const once = (fn) => {
  let complete = false;
  return (...args) => {
    if (complete) {
      console.log("Order has already been placed");
    }
    if (!complete) {
      complete = true;
      fn(...args);
    }
  };
};

const billUser = (orderNumber, total, itemCount) =>
  console.log(
    `Your order #${orderNumber} is on its way! ${itemCount} items - $${total}`
  );

const billOnce = once(billUser);

billOnce(2252, 85, 3); //Your order #2252 is on its way! 3 items - $85
billOnce(2252, 85, 3); // Order has already been placed
billOnce(2252, 85, 3); // Order has already been placed
```

Just like in the closure example (well, this *is* a closure), we use a variable (this time, a flag) defined in the outer scope to dictate the logic of the inner function. We bind `billOnce` to the result of `once(billUser)`, which is an anonymous function `(...args) => ...` and call it like any other function.


It's a silly example (and rife with logging side effects), but I like it! If we wanted to improve on the idea, we could make the `complete` variable an array of order numbers, check if the order number is already in there, and allow the "order" to go through if it isn't.

### A small note: Point-free programming

When dealing with functions that return other functions, it's sometimes common to see the following:

```javascript
fetch(url).then(response => processResponse(response))
```

If `processResponse` takes a response, and the anonymous function is being called with a response, you could just do this:

```javascript
fetch(url).then(processResponse)
```

This is called *point-free* or *tacit* style, and when used appropriately it can make your code a little cleaner and more understandable.

## Built in higher order functions

Javascript thankfully makes it easy to avoid for loops and imperative solutions to problems. There are some really great built in methods that allow us to work with collections in a declarative and functional manner.

### Filter

Filter is a built in array method that returns a new array with only the items from the original that fulfill a certain predicate.

It takes a function as an argument, iterates over the array, and calls the function with the value of the current element as an argument.

```javascript
const items = [1, 2, 3, 4, 5, 6, 7, 8];
const isEven = (number) => number % 2 === 0;
const even = items.filter(isEven);
console.log(even); // [ 2, 4, 6, 8 ]
```

### Map

Another immutable array method that returns a new array. It takes a function as an argument, loops over the array, passes the current element to your function, and replaces each element with the value returned by your function.

```javascript
const words = ["apple", "orange", "banana", "kiwi"];
const pluralize = (word) => word.concat("s");
const pluralWords = words.map(pluralize);
console.log(pluralWords) // [ 'apples', 'oranges', 'bananas', 'kiwis' ]
```

As a side note, you can give your `map` and `filter` callback functions a second and third parameter that allow access to the index of the current element and original array. The same goes for `forEach`.

```javascript
const numbers = [9, 3, 15, 6, 4, 12];

console.log(
  numbers.filter((value, index, original) => {
    console.log(`Value ${value} is at index: ${index}`);
    if (index === original.length - 1) {
      console.log(`Finished looping through ${original}`);
    }
    return value > 8;
  })
);

// Value 9 is at index: 0
// Value 3 is at index: 1
// Value 15 is at index: 2
// Value 6 is at index: 3
// Value 4 is at index: 4
// Value 12 is at index: 5
// Finished looping through 9,3,15,6,4,12
// [ 9, 15, 12 ]
```

So, in essence, map and filter pass three arguments to the function you provide it with. It's up to you whether or not the callback you provide accepts these extra arguments.

### Reduce

Reduce iterates through the array and passes two important arguments to the function it is provided with: an accumulator and the current element. The accumulator stores what is returned from each iteration, and makes its new value available to each subsequent iteration.

The second (optional) argument to reduce, besides the callback you provide, is an initial value to use as the accumulator. If none is provided, the first element is used as the accumulator and is skipped in the loop.

```javascript
const numbers = [3, 5, 7, 6];
const add = (sum, number) => total + number;
const sum = numbers.reduce(add)
console.log(sum); // 21
```

This is a trivial example, but gets the point across. Reduce is not only for accumulating sums and products, though. It's also really powerful for situations where you need to rapidly transform data structures that you're working on without lots of code.

What if we had an array of objects, and we wanted to construct an object with the 'name' field as keys, and keep the rest of the properties as values? What if we also wanted to add an `id` property to each value based on the object's index in the original array? Reduce makes this *super* simple.

```javascript
const people = [
  { name: "jon", age: 31, occupation: "programmer" },
  { name: "sarah", age: 26, occupation: "designer" },
  { name: "bardia", age: 28, occupation: "data scientist" },
  { name: "jane", age: 30, occupation: "writer" },
];

const peopleDatabase = people.reduce(
  (acc, { name, age, occupation }, index) => {
    acc[name] = { age, occupation, id: index };
    return acc;
  },
  {}
);

console.log(peopleDatabase);

/*
{
  jon: { age: 31, occupation: 'programmer', id: 0 },
  sarah: { age: 26, occupation: 'designer', id: 1 },
  bardia: { age: 28, occupation: 'data scientist', id: 2 },
  jane: { age: 30, occupation: 'writer', id: 3 }
}
*/
```

Now  we're making use of the third callback parameter, which provides an index, as well as the optional initial accumulator value (we want to build an object, not another array). We're also destructuring the 'current element' argument to get what we need, and assigning the key of the accumulator object to the person's name. Note that it's really important to return the actual accumulator after each iteration!

Here's another example:

```javascript

const shoppingCart = [
  { itemName: "cat food", price: 47, shipping: 15, quantity: 3 },
  { itemName: "widescreen monitor", price: 940, shipping: 70, quantity: 1 },
  { itemName: "fancy pillow", price: 65, shipping: 5, quantity: 2 },
  { itemName: "laptop charger", price: 90, shipping: 5, quantity: 1 },
  { itemName: "guitar strings", price: 12, shipping: 2, quantity: 4 },
];

const formatOrderSummary = (
  acc,
  { itemName, price, shipping, quantity },
  index
) => {
  const itemNumber = index + 1;
  const key = `${itemNumber}. ${itemName} (${quantity})`;
  const value = `$${(price + shipping) * quantity}`;
  acc[key] = value;
  return acc;
};

const orderSummary = shoppingCart.reduce(formatOrderSummary, {});

console.log(orderSummary);

/*
  {
    '1. cat food (3)': '$186',
    '2. widescreen monitor (1)': '$1010',
    '3. fancy pillow (2)': '$140',
    '4. laptop charger (1)': '$95',
    '5. guitar strings (4)': '$56'
  }
/*
```

These three methods can be chained together to effectively manipulate all kinds of data. So as not to bore you with more examples, consider the following pseudocode:

```javascript
const transformedData = originalData
  .filter(matchingConditions)
  .map(addSomeStuff)
  .reduce(mergeSomeValuesTogether);
```

Something like that would be a whole lot more in keeping with the functional philosophy than the alternative, which might consist of many loops, many variables, and hard to follow logic.

## Memoization

The last thing we'll look at is memoization, since it's the perfect combination of closure and higher order function.

All memoization really means is caching the result of a function call and returning this cached value during subsequent calls (provided the same arguments) instead of recomputing a possibly expensive value.

```javascript
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      cache[key] = fn(...args);
      return cache[key];
    }
  };
};
```

The general idea is to wrap a function with `memoize` and decide whether to call the inner function or use a value already in the cache.

- We know that since we're using pure functions, a function given the same input always returns the same output.
- We store the arguments as a key in the cache object for easy lookup (turned into JSON first, since we want to be able to handle arrays, objects, strings, numbers, and whatever else) as well as the value returned from the function after it's called for the first time.
- If we encounter the same set of arguments, we know the value is in our hash map, and we return it.

So, how awesome is memoize? Let's do a little test!

```javascript
const memoizeWithPerformance = (fn) => {
  let cache = {};
  return (...args) => {
    console.time("Execution time");
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.timeEnd("Execution time");
      return cache[key];
    } else {
      cache[key] = fn(...args);
      console.timeEnd("Execution time");
      return cache[key];
    }
  };
};

const expensiveComputation = (a, b) => {
  const hugeArray = Array(a).fill(Math.random() * b);
  return hugeArray.filter((v) => v % 2 !== 0);
};

const memoizedPerformance = memoizeWithPerformance(expensiveComputation);

memoizedPerformance(90000000, 12); // Execution time: 651.696ms
memoizedPerformance(90000000, 12); // Execution time: 0.011ms
memoizedPerformance(90000000, 12); // Execution time: 0.006ms
```

As you can see, the first time we call the function, it takes hundreds of milliseconds. But subsequent calls take a fraction of a millisecond. How cool is that?

## That's all for now

Whew, that was a lot of code. It's probably best to keep these posts short, so in the next part, we'll go over some cool techniques like currying, composition, and a few higher level, bigger picture strategies for approaching problems the functional way. Thanks for reading, and stay tuned for more!
