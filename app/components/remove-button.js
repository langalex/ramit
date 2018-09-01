import Component from '@ember/component';

export default Component.extend({
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
