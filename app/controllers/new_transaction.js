import Ember from 'ember';
import Transaction from '../models/transaction';

export default Ember.Controller.extend({
  actions: {
    createTransaction: function() {
      var account = this.get('model');
      var transaction = Transaction.create({
        account: account,
        description: this.get('description'),
        amount: parseInt(this.get('amount'), 10)});
      transaction.save();
      this.setProperties({description: undefined, amount: undefined});
      this.transitionToRoute('account', account);
    }
  }
});
