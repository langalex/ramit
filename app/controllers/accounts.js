import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name'],
  balances: Ember.computed.mapBy('model', 'balance'),
  totalBalance: Ember.computed.sum('balances'),
  sortedAccounts: Ember.computed.sort('model', 'sortProperties')
});
