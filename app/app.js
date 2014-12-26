import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import initStorage from './storage';

Ember.MODEL_FACTORY_INJECTIONS = true;

initStorage();
var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);
remoteStorage.displayWidget();

export default App;
