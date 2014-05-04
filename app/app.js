import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import initStorage from './storage';

Ember.MODEL_FACTORY_INJECTIONS = true;

initStorage();
var App = Ember.Application.extend({
  modulePrefix: 'ramit', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'ramit');
remoteStorage.displayWidget();

export default App;
