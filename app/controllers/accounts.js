import { mapBy, sum, sort } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortProperties: computed(function() { return ['name']; }),
  balances: mapBy('model', 'balance'),
  totalBalance: sum('balances'),
  sortedAccounts: sort('model', 'sortProperties')
});
