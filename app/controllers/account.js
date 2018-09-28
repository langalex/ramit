import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  actions: {
    deleteAccount: function() {
      this.get('model').delete();
      this.transitionToRoute('accounts');
    }
  },
  sortedTransactions: computed('model.transactions.@each.date', function() {
    return this.get('model.transactions').sortBy('date').reverse();
  })
});
