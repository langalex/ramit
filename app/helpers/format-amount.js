import Ember from 'ember';

const formatter = new Intl.NumberFormat('en-US');

export default Ember.Helper.helper(function(args) {
  var amount = args[0];
  return formatter.format(amount);
});
