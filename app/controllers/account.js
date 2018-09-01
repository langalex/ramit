import Controller from '@ember/controller';

export default Controller.extend({
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
