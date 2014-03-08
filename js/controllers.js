(function controllers(App) {
  'use strict';

  App.NewAccountController = Ember.Controller.extend({
    actions: {
      createAccount: function() {
        var controller = this;
        var account = App.Account.create({
          name: this.get('name')});
        this.set('name', undefined);
        account.save().then(function() {
          controller.transitionToRoute('accounts');
        });
      }
    }
  });

  App.AccountController = Ember.Controller.extend({
    transactions: function() {
      if(this.get('model.transactions')) {
        return this.get('model.transactions').sortBy('date');
      }
    }.property('model.transactions.@each')
  });

  App.NewTransactionController = Ember.Controller.extend({
    actions: {
      createTransaction: function() {
        var account = this.get('model');
        var transaction = this.store.createRecord('transaction', {
          account: account,
          description: this.get('description'),
          amount: parseInt(this.get('amount'), 10)});
        transaction.save();
        account.get('transactions').pushObject(transaction);
        this.setProperties({description: undefined, amount: undefined});
        this.transitionToRoute('account', this.get('model'));
      }
    }
  });

  App.TransactionController = Ember.Controller.extend({
    actions: {
      deleteTransaction: function() {
        var transaction = this.get('model'),
          account = transaction.get('account');
        transaction.deleteRecord();
        this.transitionTo('account', account);
      }
    }
  });


})(window.Ramit);
