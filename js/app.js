(function() {
  'use strict';

  // misc

  // close collapse navbar when clicking on a link inside of it
  $(document).on('click', '.navbar-collapse.in a', function() {
    $(this).parents('.navbar-collapse.in').removeClass('in').addClass('collapse');
  });

  // views

  var accounts = new Ractive({
    el: 'app',
    template: $('#app-template').html(),
    data: {
      route: 'accounts',
      accounts: [],
      any: function (list) {
        return list.length;
      }
    }
  });
  accounts.on('close', function(e) {
    hasher.setHash('');
  });
  accounts.on('add-account', function(e) {
    e.original.preventDefault();
    var $input = $(e.node).find('[name=name]');
    var name = $input.val();
    $input.val('');
    remoteStorage.accounts.add(name);
    hasher.setHash('');
  });
  accounts.on('remove-account', function(e) {
    e.original.preventDefault();
    if(confirm('Remove ' + e.context.name + '?')) {
      remoteStorage.accounts.remove(e.context.id);
      hasher.setHash('');
    }
  });

  // init

  Ramith.Storage.init();
  remoteStorage.access.claim('accounts', 'rw');
  remoteStorage.caching.enable('/accounts/');
  remoteStorage.displayWidget();
  remoteStorage.accounts.onChange(function(e) {
    if(e.oldValue === undefined) { // add
      accounts.get('accounts').push(e.newValue);
    } else if(e.newValue === undefined) { // remove
      var account = _(accounts.get('accounts')).find(function(a) { return a.id === e.oldValue.id; });
      var index = accounts.get('accounts').indexOf(account);
      accounts.get('accounts').splice(index, 1);
    }
  });
  remoteStorage.accounts.list().then(function(storedAccounts) {
    accounts.set('accounts', storedAccounts);
  });

  // routes

  crossroads.addRoute('/', function() {
    accounts.set('route', 'accounts');
  });

  crossroads.addRoute('/accounts/new', function() {
    accounts.set('route', 'new_account');
  });

  crossroads.addRoute('/accounts/{id}', function(id) {
    remoteStorage.accounts.get(id).then(function(account) {
      accounts.set('currentAccount', account);
      accounts.set('route', 'account');
    });
  });

  function handleChanges(newHash, oldHash){
    crossroads.parse(newHash);
  }

  hasher.changed.add(handleChanges);
  hasher.initialized.add(handleChanges);
  hasher.init();
})();
