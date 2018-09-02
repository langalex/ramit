import Controller from '@ember/controller';
import Transaction from '../models/transaction';

export default Controller.extend({
  actions: {
    updateAmount(value) {
      this.set('amount', value);
    },
    updateDescription(value) {
      this.set('description', value);
    },
    createTransaction() {
      var account = this.get('model');
      var transaction = Transaction.create({
        account: account,
        description: this.get('description'),
        amount: parseInt(this.get('amount'), 10)});
      transaction.save();
      this.transitionToRoute('account', account);
    }
  }
});
