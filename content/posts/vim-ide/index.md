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

## Grab a patched font of your choice

- Extract <a>this</a> tarball into your `$HOME/.local/share/fonts` directory
