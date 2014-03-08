import Transaction from './transaction';

var Account = Ember.Object.extend({
  balance: function() {
    return this.get('transactions').reduce(function(sum, t) {
      return sum + t.get('amount');
    }, 0);
  }.property('transactions.@each'),
  transactions: function() {
    return this.get('all_transactions').filterBy('account_id', this.get('id'));
  }.property('account_id', 'all_transactions.@each'),
  all_transactions: function() {
    return Transaction.all;
  }.property(),
  save: function() {
    var account = this;
    return remoteStorage.ramit.addAccount(this.get('name')).then(function(data) {
      account.set('id', data.id);
    });
  },
  delete: function() {
    remoteStorage.ramit.removeAccount(this.get('id'));
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
  Account.all.pushObject(Account.create(accountData));
});

remoteStorage.ramit.onRemoveAccount(function(accountData) {
  var account = Account.find(accountData.id);
  Account.all.removeObject(account);
});

export default Account;
