import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
