d3-sandbox
==========
A sandbox for learning & experimenting with [d3.js](http://d3js.org/). Nothing special.

> [Dig it.](https://youtu.be/V-OYKd8SVrI)

# Installation
Assuming you already have [`node + npm`](https://nodejs.org/) & [`bower`](http://bower.io).

```bash
$ npm install # will run `bower install` as well
```

# Use
Gulp will precompile, serve, and reload your sandbox, if you ask it nicely.
```bash
# explicated
$ gulp sync
# or gulp, just (the default task does it, too)
$ gulp
```

# Dependencies
You could do without most of these 'dependencies', but this is the default setup.

### Components (bower)
```js
d3: ~3.5.5          // obviously
jquery: ~2.1.4      // just in case
```

### Modules (npm)
```js
browser-sync: ^2.7.10       // spend less time refreshing your page
gulp: ^3.9.0                // tie it all together
gulp-sass: ^2.0.1           // easy-peasy precompile
gulp-sourcemaps: ^1.5.2     // completely unnecessary, really
```

# Extras
I prefer [bourbon](http://bourbon.io) (and its [compliments](http://bitters.bourbon.io)) for styling, so it's included and used here. You don't have to, but you might like to.
