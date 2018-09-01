import Route from '@ember/routing/route';
import Account from '../models/account';

export default Route.extend({
  model: function(params) {
    return Account.find(params.account_id);
  }
});
