window.Ramit = window.Ramit || {};

window.Ramit.Routes = function(app, remoteStorage) {
  crossroads.routed.add(function() {
    app.set('currentAccount', null);
    app.set('currentTransaction', null);
    $('#main-nav.in').removeClass('in').addClass('collapse');
  });

  crossroads.addRoute('/', function() {
    remoteStorage.ramit.listAccounts().then(function(accounts) {
      if(accounts.length) {
        app.set('route', 'accounts');
      } else {
        hasher.setHash('help');
      }
    });
  });

  crossroads.addRoute('help', function() {
    app.set('route', 'help');
  });

  crossroads.addRoute('/accounts/new', function() {
    app.set('route', 'new_account');
    app.set('new_account', {});
    $('#account-name').focus();
  });

  crossroads.addRoute('/accounts/{id}', function(id) {
    remoteStorage.ramit.getAccount(id).then(function(account) {
      app.set('currentAccount', account);
      remoteStorage.ramit.listTransactions(id).then(function(transactions) {
        app.set('currentAccount.transactions', transactions);
        app.set('currentAccount.balance', _(transactions).reduce(function(memo, t) {
          return memo + t.amount;
        }, 0));
      });
      app.set('route', 'account');
    });
  });

  crossroads.addRoute('/accounts/{id}/transactions/new', function(id) {
    remoteStorage.ramit.getAccount(id).then(function(account) {
      app.set('new_transaction', {});
      app.set('currentAccount', account);
      app.set('route', 'new_transaction');
      $('#transaction-description').focus();
    });
  });

  crossroads.addRoute('/accounts/{account_id}/transactions/{id}', function(accountId, id) {
    remoteStorage.ramit.getAccount(accountId).then(function(account) {
      app.set('currentAccount', account);
      remoteStorage.ramit.getTransaction(accountId, id).then(function(transaction) {
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
