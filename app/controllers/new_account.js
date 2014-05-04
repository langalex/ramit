import Account from "../models/account";

export default Ember.Controller.extend({
  actions: {
    createAccount: function() {
      var controller = this;
      var account = Account.create({
        name: this.get('name')});
      this.set('name', undefined);
      account.save().then(function() {
        controller.transitionToRoute('accounts');
      });
    }
  }
});
