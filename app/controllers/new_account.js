import Controller from '@ember/controller';
import Account from "../models/account";

export default Controller.extend({
  actions: {
    createAccount: function() {
      var controller = this;
      var account = Account.create({
        name: this.get('name')});
      account.save().then(function() {
        controller.transitionToRoute('accounts');
      });
    }
  }
});
