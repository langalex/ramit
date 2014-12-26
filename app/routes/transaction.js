import Ember from 'ember';
import Transaction from '../models/transaction';

export default Ember.Route.extend({
  model: function(params) {
    return Transaction.find(params.id);
  }
});
