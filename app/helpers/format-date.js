import Ember from 'ember';

export default Ember.Helper.helper(function(args) {
  var d = new Date(args[0]);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
});
