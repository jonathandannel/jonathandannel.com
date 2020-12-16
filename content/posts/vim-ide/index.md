---
title: Turn vim into a fully fledged IDE
description: It's not actually that hard
category: "code"
cover: geo.jpg
date: "2019-12-17T00:00:00.001Z"
tags: ["workflow", "vim", "tmux", "ide"]
---

## Step one

Download neovim

`sudo apt install neovim`

Let's test some code highlighting:

```javascript
const a = b => b.reduce((a, e) => (a += e), 0)
```

```clojure
(def bit-bucket-writer
  (proxy [java.io.Writer] []
    (write [buf] nil)
    (close []    nil)
    (flush []    nil)))

(defmacro noprint
  "Evaluates the given `forms` with all printing to `*out*` silenced."
  [& forms]
  `(binding [*out* bit-bucket-writer]
     ~@forms))

(noprint
  (println "Hello, nobody!"))
;; => nil
```

## Grab a patched font of your choice

- Extract <a>this</a> tarball into your `$HOME/.local/share/fonts` directory
