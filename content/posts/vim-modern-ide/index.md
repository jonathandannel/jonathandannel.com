---
title: Turn vim into your daily use IDE
description: It's not actually that hard
author: "Jonathan Dannel"
category: "code"
cover: geo.jpg
date: "2019-12-17T00:00:00.001Z"
tags: ["workflow", "vim", "tmux", "ide"]
---

So, you've learned the basics of vim and can `hjkl` all over the place like it's nobody's business. You're yanking and jumping between marks like it's second nature. Yet, when it comes time to do your real work, at your job, you're opting for VSCode, Atom, or Sublime in vim mode (or not) instead.

Why not just use pure vim? I asked myself the same question before making the switch about 6 months ago, and I haven't looked back since.

Disclaimer: Vim isn't the be all end all of text editors and it's not always a suitable replacement for an IDE. If, for example, you're developing huge enterprise Java applications or Android apps with tons of platform specific plugins, vim is probably not the right tool for the job. It suits my needs, though, and after taking the time to set it up in earnest, I ended up preferring it immensely over anything else I've tried (even Emacs).

Under the right circumstances and while working on the right projects, it's an excellent and incredibly extensible choice for lightning fast coding with a tiny memory footprint and a certain 'cool factor' that can't be denied.

This step-by-step introductory post is written with the intention of simplifying the transition to full-time Vim usage and eventual greybeard status.

## Download neovim

Neovim is basically a more modern fork of vim, introducing some (argurable) performance and quality of life improvements. It's backwards compatible with most vanilla vim features/plugins and adds some new ones too.

Detailed, platform specific instructions can be found on the <a href="https://github.com/neovim/neovim/wiki/Installing-Neovim">neovim repo</a>.

For simplicity, I always prefer using a package manager.

- On Arch and derivatives:

  - `sudo pacman -S neovim`

- On Debian/Ubuntu:

  - `sudo apt install neovim`

- If you're on a Mac:

  - `brew install neovim`

## Install a plugin manager for vim

While it's possible to manually clone plugin repos and include them via vim scripts, it's way easier to use a plugin manager to handle everything. The two most popular packages in this arena are `vim-plug` and `vundle`. Personally, I like vim-plug.

You can install it easily via `curl`:

```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

(Note: From here on out, the assumption is that we're working with `vim-plug`)

## Create your config file(s)

If you followed the above install script or added `vim-plug` via other means, the next step is to find/create your config and start editing it.

`mkdir ~/.config/nvim && touch ~/.config/nvim/init.vim`

This is where your nvim config exists now. Note: You can migrate your vanilla vim settings by adding the line `source ~/.vimrc` (or wherever your .vimrc is).

## Edit init.vim

Add these two lines to your config:

```bash
call plug#begin(stdpath('data') . '/plugs')
call plug#end()
```

In between these two lines, you're going to declare all packages you want to import and use in your config.

Note: When we say `stdpath('data')`, it resolves to your ~/\$USER/.local/share/nvim directory. `stdpath('config')` refers to the directory we just made, where `init.vim` lives.

## Creating the IDE look

The first order of business is to make vim look pretty. Thankfully, this is easy!

### File tree

Vim, by default, does not include an anchored file tree where you can easily get an overview of all the directories and contents in a project. Generally, `nerdtree` is a popular solution.

The syntax for vim-plug package imports is `Plug <github repo>'`. So, after adding `nerdtree`, our `init.vim` will look like this:

```bash
call plug#begin(stdpath('data') . '/plugs')
Plug 'scrooloose/nerdtree'
call plug#end()
```

Now, let's fire up vim-plug and let it do its thing! In your terminal, type in

`nvim +PlugInstall`

and everything between `plug#begin()` and `plug#end()` will be installed.

Open up `init.vim` again and let's bind NERDTree to a key and define some basic options. Add the following <strong>after</strong> your imports:

```javascript
let g:NERDTreeShowHidden = 1
let g:NERDTreeMinimalUI = 1
let g:NERDTreeIgnore = []
let g:NERDTreeStatusline = ''
" Automaticaly close nvim if NERDTree is only thing left open
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
" Toggle NERDTree
nnoremap <silent> <C-b> :NERDTreeToggle<CR>
```

We're showing hidden dot files, using a minimal UI, not ignoring any files, not adding a status line, and binding a toggle key to show/hide the file tree.

Reload nvim and press `CTRL` + `b`. You should see all files in the directory you ran it from. This is cool, but it all looks rather ugly still:

IMAGEIMAGEIMAGEIMAGEIMAGE

### Adding a color scheme

There are tons of really awesome color schemes for vim. Let's choose one from here:

https://github.com/rafi/awesome-vim-colorschemes

I'm gonna go with https://github.com/morhetz/gruvbox because it's classic, and Gruvbox is awesome.

Just add `Plug morhetz/gruvbox` before the `#plug end` to import the repo as a plugin.

After your plugin block, add `colorscheme gruvbox` on a new line to set the color scheme. Then do `nvim +PlugInstall` from your terminal to once again install any new plugins. Reload nvim and you should see your color scheme change.

What I also like to do is change my terminal's background color to match the theme's background color. I'm using alacritty, so I'll edit my `.alacritty.yml` to use a background color of `#262626`.

Now's also a decent time to add a few boilerplate settings. After your colorscheme declaration (or wherever, as long as it's not in the plugin import block), add the following:

```bash
syntax enable
:set termguicolors
:set background=dark
:set relativenumber
:set numberwidth=3
```

Personally, I like relative line numbers for more accurate for quick jumps between lines, but if you like seeing absolute line numbers, just use `:set number` instead of `:set relativenumber`.

PHOTOIMAGEIMAGEIMAGEIMAGE

That looks a bit better.

### Adding a custom status line

Airline is a lighter weight version of Powerline. You can check out the repo here: https://github.com/vim-airline/vim-airline

In the plugin import block, add these:

```bash
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
```

In the body of your config, set some options:

```bash
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#fnamecollapse = 1
let g:airline#extensions#tabline#fnamemod = ':t'
```

Choose a theme from the list https://github.com/vim-airline/vim-airline-themes/blob/master/doc/airline-themes.txt and enable it:

I'm going to set it as `gruvbox` since the gruvbox theme we imported actually has some entries for airline colors already included. But feel free to add anything you want! You can also change the airline colorscheme on the fly inside nvim by typing `:AirlineTheme` and pressing `Tab` to get a list of all themes.

```bash
let g:airline_theme='gruvbox'
```

Restart nvim and you should see a status line at the bottom of your window as well as some tab and buffer indicators at the top. Airline is super customizable, so follow the docs to add and remove items from the UI as you see fit. Just keep in mind that since we enabled powerline fonts, the nice glyphs won't render correctly unless you have patched fonts on your system. We'll go through that in a minute.

### Adding icons

```bash
Plug 'ryanoasis/vim-devicons'
```

Note: These might not render correctly yet. We'll fix that now.

### Installing a patched font

If you aren't seeing icons in your file tree after installing `vim-devicons`, or if your status line is full of random symbols, that means you need to install a patched font. On a fresh install of Manjaro i3, it seems that these fonts are included already, but from my experience they're not included with most distros.

Two decent options are:

- https://github.com/powerline/fonts
- https://github.com/ryanoasis/nerd-fonts

I really like the selection of Nerd fonts, so let's go with that.

Navigate to the font you want to use. Fira Mono is a nice choice.
https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraMono/Regular

In the `complete` dir, grab the .ttf file you want (`Fira Mono Regular Nerd Font Complete.otf`) and move it to `~/.local/share/fonts/`. You may have to create this directory if it doesn't exist.

Now, refresh your font cache (or log in/out):

`sudo fc-cache -f -v`

In your terminal settings, you can now specify that font as the default. If you're using a terminal without a GUI for setting options, like alacritty, you need to specify the actual family for the font.

Run `fc-list | grep Fira` and you should get something back like
`/home/jonathan/.local/share/fonts/Fira Mono Regular Nerd Font Complete.otf: FiraMono Nerd Font:style=Regular`

The actual name of the font, in this case, is `FiraMono Nerd Font`. So you'd specify it that way in your alacritty config:

```yaml
font:
  normal:
    family: FiraMono Nerd Font
    size: 10
```

Reload your terminal and you should now see all your nice new icons when you open nvim.

There are more streamlined ways of adding patched fonts (various scripts and such), but I find this method pretty quick and hassle free. You can check the powerline/nerd repos and docs for more methods if this one doesn't suit you.

### Add some transparency (questionable)

Sometimes it's nice to have a little bit of transparency in your terminal. However, if you change your terminal's opacity, your theme background will still be a solid color. Adding this line to your config can fix that:

```bash
:hi! Normal guibg=NONE
```

This can be kind of distracting, but I like it sometimes.

## Adding functionality

Now that we're more or less through with making things look pretty, know how to add plugins, and understand how to edit the config, let's run through a bunch of small additions in quick succession.

### Fuzzy finding (CTRL + P to open file)

Probably my favorite plugin. It renders the file tree pretty useless once you're used to just launching new splits from `fzf`. This, in turn, saves screen space and allows you room for another split or two.

In your plugin block:

```bash
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
```

In the body of your config, add some custom binds to launch splits from fzf (or else fzf files will open in the current pane). Also, bind this to the familiar `CTRL` + `p`.

```bash
nnoremap <C-p> :FZF<CR>
let g:fzf_action = {
  \ 'ctrl-t': 'tab split',
  \ 'ctrl-s': 'split',
  \ 'ctrl-v': 'vsplit'
  \}
```

Now you can use `CTRL` + `p` to directly open and jump to any file in your project. And, in the case of the bindings above, use `CTRL` + `v` to open the selected file in a vertical split.

### Auto closing tags (html, jsx, etc) https://github.com/alvan/vim-closetag

```bash
Plug 'alvan/vim-closetag'
```

And some config:

```bash
let g:closetag_filenames = '*.html,*.xhtml,*.phtml,*.js,*jsx'
let g:closetag_xhtml_filenames = '*.xhtml,*.jsx,*.js'
let g:closetag_filetypesjjj = 'html,xhtml,phtml,*.js'
let g:closetag_xhtml_filetypes = 'xhtml,jsx,js'
let g:closetag_emptyTags_caseSensitive = 1
let g:closetag_regions = {
    \ 'typescript.tsx': 'jsxRegion,tsxRegion',
    \ 'javascript.jsx': 'jsxRegion',
    \ }
let g:closetag_shortcut = '>'
```

### Git support (docs: https://github.com/tpope/vim-fugitive)

Run git commands in vim.

```bash
Plug 'tpope/vim-fugitive'
```

### Auto closing brackets/parens

Note: This could get annoying if not configured correctly. Check the repo and docs.

```bash
Plug 'jiangmiao/auto-pairs'
```

### Persistent sessions

```bash
Plug 'tpope/vim-obsession'
```

Now you can type `:Obsession` to start tracking your vim session (open buffers, splits, marks, etc). Close vim, and then run `nvim -S` to reload the session exactly as it was. I love this one.

### Remap some keys (optional)

All the different ways to remap vim's core bindings are out of the scope of this post, but here are a couple of simple ones that make life a little easier.

- Use `ALT` + `h j k l` to move between splits

```bash
tnoremap <A-h> <C-\><C-n><C-w>h
tnoremap <A-j> <C-\><C-n><C-w>j
tnoremap <A-k> <C-\><C-n><C-w>k
tnoremap <A-l> <C-\><C-n><C-w>l
nnoremap <A-h> <C-w>h
nnoremap <A-j> <C-w>j
nnoremap <A-k> <C-w>k
nnoremap <A-l> <C-w>l
```

- Remap `ESC` in insert mode

```bash
inoremap jk <Esc>
inoremap kj <Esc>
```

### Yank to clipboard

```bash
:set clipboard=unnamedplus
```

## Language specific functionality

### Code completion

`Coc.nvim` is a great choice for multi-language support. It's an all around awesome package that has never failed me in Python, Javascript, and Go.

Add it as a plugin:

```bash
Plug 'neoclide/coc.nvim', {'branch': 'release'}
```

Since I'm primarily a web dev that works with React and Node.js, there are two things that are an absolute necessityfor real world projects: `eslint` and `prettier`. First, we need to set up a language server or install a `coc` extension. Without a language extension, we can't get intellisense to work.

For Javascript, the recommended extension is `coc-tsserver`. This handles both Typescript and Javascript syntax.

We can either run an install command within nvim (`:CocInstall <extension>`) or we can specify a list of extensions to load in our config, then run `:CocInstall`. The latter is more organized and makes more sense to me, so let's do that.

In init.vim:

```bash
let g:coc_global_extensions = ['coc-emmet', 'coc-css', 'coc-html', 'coc-json', 'coc-tsserver']
let g:coc_disable_startup_warning = 1
```

We're adding support for Emmet, CSS, HTML, JSON, and JS/TS. There are tons of languages (Go, Python, etc) and frameworks (like Flow for JS) that Coc.nvim supports, so check out the list and add the extensions you need.

https://github.com/neoclide/coc.nvim/wiki/Language-servers

Open up nvim and run `:CocInstall`. Nice!

### Prettier to format on save

Add `coc-prettier` to the list in g:coc_global_extensions, then add the following under the other coc settings:

```bash
command! -nargs=0 Prettier :CocCommand prettier.formatFile
let g:prettier#autoformat = 1
```

Create a file in your `nvim` directory called `coc-settings.json` and add a line for configuring formatting on save:

```bash
{ "coc.preferences.formatOnSaveFiletypes": ["*"] }
```

Note: You can explicitly define some filetypes here, but for now it's not necessary since we've only added prettier.

Install, reload, and prettier should be working properly and responding to the rulesets in your project's prettier config file.

### Eslint

Same as above. Add `coc-eslint`, and in your `coc-settings.json` add:

```bash
"eslint.options": { "configFile": "C:/mydirectory/.eslintrc.json" }
```

More detailed instructions can be found here: https://github.com/neoclide/coc-eslint

## The tip of the iceberg

There are TONS of plugins, scripts, and complex hacks to make vim do exactly what you want. This was a very basic introduction to getting your config started up and functional for every day use, but there's so much more to explore, and so many cool ways to extend your config. If the vim workflow suits you, it may be worthwhile looking into a terminal multiplexer like `tmux` or a tiling window manager like `i3`. Those are way out of the scope of this post, but worthwhile to keep in mind.

Thanks for reading, and happy hacking :)

```

```
