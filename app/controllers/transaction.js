export default Ember.Controller.extend({
  actions: {
    deleteTransaction: function() {
      var transaction = this.get('model'),
        accountId = transaction.get('account_id');
      transaction.delete();
      this.transitionToRoute('account', accountId);
    }
  }
});
