var
  impress = require('impress'),
  BlockedResources = require('impress-blocked-resources'),
  HtmlAngularMinify = require('impress-html-angular-minify'),
  HtmlMinify = require('impress-html-minify'),
  MySqlStorage = require('impress-mysql-storage');

module.exports = Application;

function Application(configs) {
  this.configs = configs || [];
  this._init();
}

Application.prototype = {

  _init: function() {
    var
      instance,
      htmlOptions,
      storageOptions;

    this._impress = new impress.Application();

    instance = this._impress
      .addConfig(this.configs);

    if (typeof instance.options.blockedResourcesDefaults == 'undefined' || instance.options.blockedResourcesDefaults) {
      instance.addBlockedResources(new BlockedResources());
    }

    htmlOptions = instance.options.html || {};
    if (htmlOptions.angular) {
      instance.addHtmlFilters(new HtmlAngularMinify());
    }
    if (htmlOptions.minify) {
      instance.addHtmlFilters(new HtmlMinify());
    }

    storageOptions = instance.options.storage || {};
    if (Object.keys(storageOptions).length > 0) {

      if (typeof storageOptions.driver != 'undefined' && storageOptions.driver != 'mysql') {
        console.error('Unsupported storage driver "'+storageOptions.driver+'"');
      }
      else {
        instance.addStorage(new MySqlStorage(storageOptions));
      }
    }

  },

  run: function() {
    this._impress.run();
  }

};
