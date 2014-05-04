import Account from '../models/account';

export default Ember.Route.extend({
  model: function() {
    return Account.find();
  }
});
