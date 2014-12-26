import Ember from 'ember';
import Account from '../models/account';

export default Ember.Route.extend({
  model: function(params) {
    return Account.find(params.account_id);
  }
});
