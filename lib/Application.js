var
  impress = require('impress'),
  BlockedResources = require('impress-blocked-resources'),
  HtmlAngularMinify = require('impress-html-angular-minify'),
  HtmlMinify = require('impress-html-minify'),
  MySqlStorage = require('impress-mysql-storage');

module.exports = Application;

function Application(options) {
  this.options = options || {};
  this._init();
}

Application.prototype = {

  _init: function() {
    this._initImpress();
    this._initBlockedResources();
    this._initHtmlFilters();
    this._initStorage();
  },

  _initImpress: function() {
    this._impress = new impress.Application(this.options);
  },

  _initBlockedResources: function() {
    var
      options,
      instance;

    instance = this._impress;
    options = instance.options;

    if (typeof options.blockedResourcesDefaults == 'undefined' || options.blockedResourcesDefaults) {
      instance.addBlockedResources(new BlockedResources());
    }
  },

  _initHtmlFilters: function() {
    var
      options,
      instance;

    instance = this._impress;
    options = instance.options;

    if (options.htmlAngular || options.htmlAngularMinify) {
      instance.addHtmlFilters(new HtmlAngularMinify());
    }
    if (options.htmlMinify) {
      instance.addHtmlFilters(new HtmlMinify());
    }
  },

  _initStorage: function() {
    var
      options,
      instance,
      storageOptions,
      storageOptionsMap;

    instance = this._impress;
    options = instance.options;

    if (options.storage || typeof options.storage == 'undefined') {

      storageOptionsMap = {
        storageDriver: 'driver',
        storageHost: 'host',
        storageUser: 'user',
        storagePassword: 'password',
        storageDatabase: 'database',
        storageTablename: 'tablename'
      };
      storageOptions = {};


      Object.keys(storageOptionsMap).forEach(function(key) {
        if (options.hasOwnProperty(key)) {
          storageOptions[storageOptionsMap[key]] = options[key];
        }
      });

      if (typeof storageOptions.driver != 'undefined' && storageOptions.driver != 'mysql') {
        console.error('Unsupported storage driver "'+storageOptions.driver+'"');
        process.exit();
      }

      instance.addStorage(new MySqlStorage(storageOptions));

    }

  },

  run: function() {
    this._impress.run();
  }

};
