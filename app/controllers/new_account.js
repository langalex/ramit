import Ember from 'ember';
import Account from "../models/account";

export default Ember.Controller.extend({
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
