/* global remoteStorage */
import { debounce } from '@ember/runloop';

import EmberObject, { computed } from '@ember/object';

var Transaction = EmberObject.extend({
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

const TransactionHandler = EmberObject.extend({
  newTransactions: computed(function() {
    return [];
  }),
  newTransaction: function(transaction) {
    this.get('newTransactions').push(transaction);
    debounce(this, this.flushNewTransactions, 100);
  },
  flushNewTransactions() {
    Transaction.all.pushObjects(this.get('newTransactions'));
    this.get('newTransactions').clear();
  }
});
const transactionHandler = TransactionHandler.create();

remoteStorage.ramit.onAddTransaction(function(transactionData) {
  var existing = Transaction.all.find(function(a) { return a.get('id') === transactionData.id; });
  if(existing) {
    existing.setProperties(transactionData);
  } else {
    transactionHandler.newTransaction(Transaction.create(transactionData));
  }
});

remoteStorage.ramit.onRemoveTransaction(function(transactionData) {
  var transaction = Transaction.find(transactionData.id);
  Transaction.all.removeObject(transaction);
});

export default Transaction;
