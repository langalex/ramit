window.Ramith = window.Ramith || {};

window.Ramith.Routes = function(app, remoteStorage) {
  crossroads.routed.add(function() {
    app.set('currentAccount', null);
    app.set('currentTransaction', null);
    $('#main-nav.in').removeClass('in').addClass('collapse');
  });

  crossroads.addRoute('/', function() {
    app.set('route', 'accounts');
  });

  crossroads.addRoute('/accounts/new', function() {
    app.set('route', 'new_account');
    app.set('new_account', {});
    $('#account-name').focus();
  });

  crossroads.addRoute('/accounts/{id}', function(id) {
    remoteStorage.ramith.getAccount(id).then(function(account) {
      app.set('currentAccount', account);
      remoteStorage.ramith.listTransactions(id).then(function(transactions) {
        app.set('currentAccount.transactions', transactions);
      });
      app.set('route', 'account');
    });
  });

  crossroads.addRoute('/accounts/{id}/transactions/new', function(id) {
    remoteStorage.ramith.getAccount(id).then(function(account) {
      app.set('new_transaction', {});
      app.set('currentAccount', account);
      app.set('route', 'new_transaction');
      $('#transaction-description').focus();
    });
  });

  crossroads.addRoute('/accounts/{account_id}/transactions/{id}', function(accountId, id) {
    remoteStorage.ramith.getAccount(accountId).then(function(account) {
      app.set('currentAccount', account);
      remoteStorage.ramith.getTransaction(accountId, id).then(function(transaction) {
        app.set('currentTransaction', transaction);
      });
      app.set('route', 'transaction');
    });
  });

  function handleChanges(newHash, oldHash){
    crossroads.parse(newHash);
  }

  hasher.changed.add(handleChanges);
  hasher.initialized.add(handleChanges);
  hasher.init();
};
