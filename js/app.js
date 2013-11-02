(function() {
  'use strict';

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
    accounts.get('accounts').push({name: name, balance: 0});
    hasher.setHash('/');
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
