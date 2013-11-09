(function() {
  'use strict';
  window.Ramit = window.Ramit || {};

  // views

  Ramit.App = Ractive.extend({
    getAccount: function(id) {
      return _(this.get('accounts')).find(function(a) { return a.id === id; });
    }
  });

  var app = new Ramit.App({
    el: 'app',
    template: $('#app-template').html(),
    data: {
      route: 'loading',
      accounts: [],
      new_transaction: {},
      new_account: {},
      sort: function(list, key, desc) {
        var sorted = _(list).sortBy(key);
        if(desc == 'desc') {
          return _(sorted).reverse();
        } else {
          return sorted;
        }
        return ;
      },
      any: function (list) {
        return(!!(list && list.length));
      },
      formatDate: function(timestamp) {
        var d = new Date(timestamp);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      }
    }
  });

  app.on('add-account', function(e) {
    e.original.preventDefault();
    remoteStorage.ramit.addAccount(e.context.name).then(function() {
      hasher.setHash('');
    });
  });
  app.on('remove-account', function(e) {
    e.original.preventDefault();
    if(confirm('Remove ' + e.context.name + '?')) {
      remoteStorage.ramit.removeAccount(e.context.id);
      hasher.setHash('');
    }
  });
  app.on('add-transaction', function(e) {
    e.original.preventDefault();
    var context = e.context;
    remoteStorage.ramit.addTransaction(app.get('currentAccount.id'), context.description, context.amount);
    hasher.setHash('accounts', app.get('currentAccount.id'));
  });
  app.on('remove-transaction', function(e) {
    e.original.preventDefault();
    if(confirm('Remove ' + e.context.description + '?')) {
      remoteStorage.ramit.removeTransaction(e.context.account_id, e.context.id);
      hasher.setHash('accounts', e.context.account_id);
    }
  });

  // init
  remoteStorage.displayWidget();
  remoteStorage.ramit.onAddAccount(function(account) {
    app.get('accounts').push(account);
  });
  remoteStorage.ramit.onRemoveAccount(function(removedAccount) {
    var account = app.getAccount(removedAccount.id);
    var index = app.get('accounts').indexOf(account);
    app.get('accounts').splice(index, 1);
  });
  remoteStorage.ramit.onAddTransaction(function(transaction) {
    var account = app.getAccount(transaction.account_id);
    var index = app.get('accounts').indexOf(account);
    if(account.transactions === undefined) {
      app.set('accounts[' + index + '].transactions', []);
    }
    app.getAccount(transaction.account_id).transactions.push(transaction);
  });
  remoteStorage.ramit.onRemoveTransaction(function(removedTransaction) {
    var account = app.getAccount(removedTransaction.account_id);
    var transaction = _(account.transactions).find(function(t) { return t.id == removedTransaction.id; });
    if(account.transactions) {
      var index = account.transactions.indexOf(transaction);
      account.transactions.splice(index, 1);
    }
  });

  remoteStorage.ramit.listAccounts().then(function(storedAccounts) {
    app.set('accounts', storedAccounts);
    app.set('route', 'accounts');
  });

  Ramit.Routes(app, remoteStorage);
})();
