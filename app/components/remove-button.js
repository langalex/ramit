import Ember from 'ember';

export default Ember.Component.extend({
  showConfirm: false,
  actions: {
    toggleConfirm: function() {
      this.toggleProperty('showConfirm');
    },
    sendDelete: function() {
      this.sendAction();
    }
  }
});
