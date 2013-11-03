(function() {
  'use strict';

  // views

  var accounts = new Ractive({
    el: 'accounts',
    template: $('#accounts-template').html(),
    data: {
      showNew: false,
      accounts: [],
      any: function (list) {
        return list.length;
      }
    }
  });
  accounts.on('add-account', function(e) {
    e.original.preventDefault();
    var $input = $(e.node).find('[name=name]');
    var name = $input.val();
    $input.val('');
    remoteStorage.accounts.add(name);
    hasher.setHash('/');
  });

  // init

  Ramith.Storage.init();
  remoteStorage.access.claim('accounts', 'rw');
  remoteStorage.caching.enable('/accounts/');
  remoteStorage.displayWidget();
  remoteStorage.accounts.onChange(function(e) {
    if(e.oldValue === undefined) {
      accounts.get('accounts').push(e.newValue);
    }
  });
  remoteStorage.accounts.list().then(function(storedAccounts) {
    accounts.set('accounts', storedAccounts);
  });

  // routes

  crossroads.addRoute('/', function(){
    accounts.set('showNew', false);
  });

  crossroads.addRoute('/accounts/new', function(){
    accounts.set('showNew', true);
  });

  function handleChanges(newHash, oldHash){
    crossroads.parse(newHash);
  }

  hasher.changed.add(handleChanges);
  hasher.initialized.add(handleChanges);
  hasher.init();
})();
