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

### Modules (npm)
```js
babelify: ^6.1.2            // transpile es6 to es5 as a browserify transform
browser-sync: ^2.7.10       // spend less time refreshing your page
browserify: ^10.2.4         // module bundler etc.
d3: ^3.5.5                  // obviously (this time via npm)
domready: ^1.0.8            // to execute the bundle on domready
gulp: ^3.9.0                // tie it all together
gulp-sass: ^2.0.1           // easy-peasy precompile
gulp-sourcemaps: ^1.5.2     // completely unnecessary, really
gulp-util: ^3.0.5           // access to gulp logging
lodash: ^3.9.3              // useful functions
vinyl-buffer: ^1.0.0
vinyl-source-stream: ^1.1.0
```

# Extras
I prefer [bourbon](http://bourbon.io) (and its [compliments](http://bitters.bourbon.io)) for styling, so it's included and used here. You don't have to, but you might like to.
