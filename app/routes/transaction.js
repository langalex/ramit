import Route from '@ember/routing/route';
import Transaction from '../models/transaction';

export default Route.extend({
  model: function(params) {
    return Transaction.find(params.id);
  }
});
