var Transaction = Ember.Object.extend({
  save: function() {
    var transaction = this;
    return remoteStorage.ramit.addTransaction(this.get('account.id'), this.get('description'),
      this.get('amount')).then(function(data) {
        transaction.setProperties(data);
        Transaction.all.pushObject(transaction);
    });
  },
  delete: function() {
    remoteStorage.ramit.removeTransaction(this.get('id'));
    Transaction.all.removeObject(this);
  }
});
Transaction.reopenClass({
  all: [],
  find: function(id) {
    if(id) { // find one
      return Transaction.all.find(function(t) { return t.get('id') === id; });
    } else { // find all
      return Transaction.all;
    }
  }
});

remoteStorage.ramit.onAddTransaction(function(transactionData) {
  var existing = Transaction.all.find(function(a) { return a.get('id') === transactionData.id; });
  if(existing) {
    existing.setProperties(transactionData);
  } else {
    Transaction.all.pushObject(Transaction.create(transactionData));
  }
});

remoteStorage.ramit.onRemoveTransaction(function(transactionData) {
  var transaction = Transaction.find(transactionData.id);
  Transaction.all.removeObject(transaction);
});

export default Transaction;
