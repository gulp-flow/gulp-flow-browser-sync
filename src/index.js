/**
 * This file is part of gulp-flow-browser-sync.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code
 * or visit https://github.com/gulp-flow/gulp-flow.
 */

'use strict';

let flow = require('gulp-flow');
let {cfg, utils} = flow;


/*----------------------------------------------------------------------------*\
  Utils
\*----------------------------------------------------------------------------*/

utils.browserSync = require('browser-sync');

/**
 * Create an instance of BrowserSync.
 *
 * @param  {string} name Instance name for handle with flow.browserSync[get|has]
 * @return {BrowserSync} BrowserSync
 */
utils.createBrowserSyncInstance = function createBrowserSyncInstance(name) {
  // if already created
  if (utils.browserSync.has(name)) {
    throw new Error(`browserSync[${name}] is already defined.`);
  }

  return utils.browserSync.create(name);
};

/**
 * Init an existing instance of BrowserSync.
 *
 * @param  {string} name Instance name.
 * @return {Promise} Usable in Gulp tasks.
 */
utils.initBrowserSyncInstance = function initBrowserSyncInstance(name, browserSyncCfg) {
  // if not exists
  if (!utils.browserSync.has(name)) {
    throw new ReferenceError(`
      Browser sync instance is not correctly initialized.
      Note: run "{env}.browser-sync" task before "{env}.watch" task.
    `);
  }

  return new Promise((resolve) => {
    return utils
      .browserSync
      .get(name)
      .init(
        Object.assign({}, cfg.browserSync.init, (browserSyncCfg || {})),
        () => resolve()
      )
    ;
  });
};

utils.reloadBrowser = function reloadBrowser(done) {
  utils.browserSync.get(cfg.env).reload();
  done();
};


/*----------------------------------------------------------------------------*\
  Config
\*----------------------------------------------------------------------------*/

cfg.browserSync = {
  init: {
    // https://browsersync.io/docs/options/#option-open
    open: false,
    port: cfg.localPort,

    // https://browsersync.io/docs/options#option-https
    //https: true,

    // https://browsersync.io/docs/options/#option-server
    server: {
      baseDir: cfg.publicDir
    },

    // https://browsersync.io/docs/options#option-codeSync
    codeSync: true,

    // https://browsersync.io/docs/options#option-ghostMode
    ghostMode: false,

    // https://browsersync.io/docs/options#option-ui
    ui: {
      port: cfg.localPort + 1,

      weinre: {
        port: cfg.localPort + 2
      }
    }
  }
};
