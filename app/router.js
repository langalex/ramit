var Router = Ember.Router.extend({
  location: 'hash'
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('accounts', {path: 'accounts'});
  this.route('account', {path: 'account/:account_id'});
  this.route('transaction', {path: 'transaction/:transaction_id'});
  this.route('new_transaction', {path: ':account_id/new_transaction'});
  this.route('new_account', {path: 'new_account'});
  this.route('help', {path: 'help'});
});

export default Router;
