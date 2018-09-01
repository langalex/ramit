import Route from '@ember/routing/route';
import Account from '../models/account';

export default Route.extend({
  model: function() {
    return Account.find();
  }
});
