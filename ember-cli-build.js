/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import(app.bowerDirectory + '/fastclick/fastclick-1.0.6/lib/fastclick.js');
  app.import(app.bowerDirectory + '/remotestorage/release/0.11.2/remotestorage.js');

  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
  app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.css');
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.eot');
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.svg');
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.ttf');
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff');
  app.import(app.bowerDirectory + '/font-awesome/fonts/FontAwesome.otf');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
