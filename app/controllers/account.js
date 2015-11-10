import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteAccount: function() {
      this.get('model').delete();
      this.transitionToRoute('accounts');
    }
  },
  sortedTransactions: function() {
    return this.get('model.transactions').sortBy('date').reverse();
  }.property('model.transactions.@each.date')
});
