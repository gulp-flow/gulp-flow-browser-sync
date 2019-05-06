# gulp-flow-browser-sync

Browser Sync bundle for [gulp-flow](https://github.com/gulp-flow/gulp-flow).


## Requirements

 * [gulp-flow](https://github.com/gulp-flow/gulp-flow) must be installed.


## Install

```sh
npm install --save-dev gulp-flow-browser-sync
```

or

```sh
yarn add --dev gulp-flow-browser-sync
```

## Usage

By default this bundle is preconfigured in `cfg.browserSync` and add some methods in `utils`.
See the source code for more details.

### Task

A common use case:

```js
'use strict';

let watched;
let gulp = require('gulp');
let flow = require('gulp-flow');

// load the browser sync bundle
require('gulp-flow-browser-sync');

let {cfg, gp, pipes, utils} = flow;

let {
  browserSync,
  createBrowserSyncInstance,
  initBrowserSyncInstance
} = utils;


//----------------------------------------------------------------------------//

flow.ensureEnv('local');


/*----------------------------------------------------------------------------*\
  Tasks
\*----------------------------------------------------------------------------*/

// browser-sync (livereload)
gulp.task(cfg.env + '.browser-sync', function() {
  createBrowserSyncInstance(cfg.env);
  return initBrowserSyncInstance(cfg.env);
});


/*----------------------------------------------------------------------------*\
  Watch
\*----------------------------------------------------------------------------*/

gulp.task(cfg.env + '.watch', function() {
  // ensure only once execution
  if(watched) {
    throw new Error(cfg.env + '.watch task is already active.');
  }

  watched = true;

  //------------------------------------------------------------------------//

  const reloadBrowser = browserSync.get(cfg.env).reload;


  /*------------------------------------------------------------------------*\
    Watchers
  \*------------------------------------------------------------------------*/

  // CSS
  gulp.watch(
    cfg.css.srcWatch,
    gulp.series(
      cfg.env + '.build.css',
      reloadBrowser
    )
  );

  // JS
  gulp.watch(
    './src/**/*.{js,jsx}',
    gulp.series(
      cfg.env + '.build.js',
      reloadBrowser
    )
  );

  // files
  gulp.watch(
    cfg.files.srcWatch,
    gulp.series(
      'build.files',
      reloadBrowser
    )
  );
});
```

And run your tasks: `gulp local`


## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow-browser-sync/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |