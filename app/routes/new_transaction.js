import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('account', params.account_id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.setProperties({description: undefined, amount: undefined});
  }
});
