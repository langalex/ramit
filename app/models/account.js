/* globals remoteStorage */

import EmberObject from '@ember/object';
import Transaction from './transaction';
import { computed } from '@ember/object';

var Account = EmberObject.extend({
  balance: computed('transactions.@each.amount', function() {
    return this.get('transactions').reduce(function(sum, t) {
      return sum + t.get('amount');
    }, 0);
  }),
  transactions: computed('account_id', 'all_transactions.@each.account_id', function() {
    return this.get('all_transactions').filterBy('account_id', this.get('id'));
  }),
  all_transactions: computed(function() {
    return Transaction.all;
  }),
  save: function() {
    var account = this;
    return remoteStorage.ramit.addAccount(this.get('name')).then(function(data) {
      account.setProperties(data);
      Account.all.pushObject(account);
    });
  },
  delete: function() {
    remoteStorage.ramit.removeAccount(this.get('id'));
    Account.all.removeObject(this);
  }
});
Account.reopenClass({
  all: [],
  find: function(id) {
    if(id) { // find one
      return Account.all.find(function(a) { return a.get('id') === id; });
    } else { // find all
      return Account.all;
    }
  }
});

remoteStorage.ramit.onAddAccount(function(accountData) {
  var existing = Account.all.find(function(a) { return a.get('id') === accountData.id; });
  if(existing) {
    existing.setProperties(accountData);
  } else {
    Account.all.pushObject(Account.create(accountData));
  }
});

remoteStorage.ramit.onRemoveAccount(function(accountData) {
  var account = Account.find(accountData.id);
  Account.all.removeObject(account);
});

export default Account;
