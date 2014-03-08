export default Ember.Route.extend({
  setupController: function() {
    this.transitionTo('accounts');
  }
});
