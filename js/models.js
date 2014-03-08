(function models(App) {
  'use strict';

  App.Store = DS.Store.extend({
    adapter: DS.FixtureAdapter.extend({})
  });

  App.Account = DS.Model.extend({
    name: DS.attr('string'),
    balance: function() {
      return this.get('transactions').reduce(function(sum, t) {
        return sum + t.get('amount');
      }, 0);
    }.property('transactions.@each'),
    transactions: DS.hasMany('transaction', {async: true})
  });

  App.Transaction = DS.Model.extend({
    account: DS.belongsTo('account'),
    description: DS.attr('string'),
    amount: DS.attr('integer'),
    date: DS.attr('date')
  });

  App.Account.FIXTURES = [{id: 'test-account', name: 'test account', transactions: ['t1', 't2']}];
  App.Transaction.FIXTURES = [
    {id: 't1', description: 'test transaction', amount: 10, date: '2014-01-01 12:24:00', account: 'test-account'},
    {id: 't2', description: 'test transaction 2', amount: 15, date: '2013-01-10 14:45:39', account: 'test-account'}
  ];

  // App.Account.FIXTURES = [];
  // App.Transaction.FIXTURES = [];
})(window.Ramit);
