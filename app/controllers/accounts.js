export default Ember.ArrayController.extend({
  sortProperties: ['name'],
  balances: Ember.computed.mapBy('model', 'balance'),
  totalBalance: Ember.computed.sum('balances')
});
