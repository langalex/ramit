(function models(App) {
  'use strict';

  App.Account = Ember.Object.extend({
    balance: function() {
      return this.get('transactions').reduce(function(sum, t) {
        return sum + t.get('amount');
      }, 0);
    }.property('transactions.@each'),
    transactions: [],

    save: function() {
      // if(type.typeKey === 'account') {
      var account = this;
      return remoteStorage.ramit.addAccount(this.get('name')).then(function(data) {
        account.set('id', data.id);
        App.Account.all.pushObject(account);
      });
      // } else if(type.typeKey === 'transaction') {
      //   var d = $.Deferred();
      //   remoteStorage.ramit.addTransaction(record.get('account.id'), record.get('description'), record.get('amount')).then(function(t) {
      //     d.resolve({id: t.id, description: t.description, amount: t.amount, date: new Date(t.date).toString()});
      //   });
      //   return d;
      // } else {
      //   throw(new Ember.Error('unknown type' + type.typeKey));
      // }

    },
    updateRecord: function() {
    },
    deleteRecord: function() {
    }

  });

  App.Account.find = function(id) {
    if(id) { // find one
      throw new Ember.Error('not implemented find account by id');
    } else { // find all
      var d = $.Deferred();
      if(App.Account.all === undefined) {
        App.Account.all = [];
        remoteStorage.ramit.listAccounts().then(function(accounts) {
          accounts.forEach(function(account) {
            var a = App.Account.create(account);
            App.Account.all.pushObject(a);
            remoteStorage.ramit.listTransactions(account.id).then(function(transactions) {
              a.get('transactions').pushObjects(transactions.map(function(t) { return App.Transaction.create(t); }));
            });
          });
          App.Account.all.set('isLoading', false);
          d.resolve(App.Account.all);
        });
      } else {
        d.resolve(App.Account.all);
      }
      return d.promise();
    }

  };
  // App.Account.find = function(store, type, id) {
  //   console.log('find', store, type, id);
  //   if(type.typeKey == 'transaction') {
  //     return remoteStorage.ramit.getTransaction(accountId, id);
  //   } else {
  //     throw(new Ember.Error('unknown type' + type.typeKey));
  //   }
  //
  // }

  // transaction


  App.Transaction = Ember.Object.extend();

  // App.Account.FIXTURES = [{id: 'test-account', name: 'test account', transactions: ['t1', 't2']}];
  // App.Transaction.FIXTURES = [
  //   {id: 't1', description: 'test transaction', amount: 10, date: '2014-01-01 12:24:00', account: 'test-account'},
  //   {id: 't2', description: 'test transaction 2', amount: 15, date: '2013-01-10 14:45:39', account: 'test-account'}
  // ];

  // App.Account.FIXTURES = [];
  // App.Transaction.FIXTURES = [];
})(window.Ramit);
