import { mapBy, sum, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: ['name'],
  balances: mapBy('model', 'balance'),
  totalBalance: sum('balances'),
  sortedAccounts: sort('model', 'sortProperties')
});
