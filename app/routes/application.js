import Route from '@ember/routing/route';

export default Route.extend({
  setupController: function() {
    this.transitionTo('accounts');
  }
});
