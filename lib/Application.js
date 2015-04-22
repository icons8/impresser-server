var
  impresser = require('impresser'),
  BlockedResources = require('impresser-blocked-resources'),
  HtmlAngularMinifier = require('impresser-html-angular-minifier'),
  HtmlMinifier = require('impresser-html-minifier'),
  MySqlStorage = require('impresser-mysql-storage');

module.exports = Application;

function Application(options) {
  this.options = options || {};
  this._init();
}

Application.prototype = {

  _init: function() {
    this._initImpresser();
    this._initBlockedResources();
    this._initHtmlFilters();
    this._initStorage();
  },

  _initImpresser: function() {
    this._impresser = new impresser.Application(this.options);
  },

  _initBlockedResources: function() {
    var
      options,
      instance;

    instance = this._impresser;
    options = instance.options;

    if (typeof options.blockedResourcesDefaults == 'undefined' || options.blockedResourcesDefaults) {
      instance.addBlockedResources(new BlockedResources());
    }
  },

  _initHtmlFilters: function() {
    var
      options,
      instance;

    instance = this._impresser;
    options = instance.options;

    if (options.htmlAngular || options.htmlAngularMinify) {
      instance.addHtmlFilters(new HtmlAngularMinifier());
    }
    if (options.htmlMinify) {
      instance.addHtmlFilters(new HtmlMinifier());
    }
  },

  _initStorage: function() {
    var
      options,
      instance,
      storageOptions,
      storageOptionsMap;

    instance = this._impresser;
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
    this._impresser.run();
  }

};
