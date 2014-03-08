import startApp from '../helpers/start-app';

var App;

module("managing accounts", {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

test("add account", function(assert) {
  visit('/');
  click('a.add-account');
  fillIn('input[name=name]', 'my test account');
  click('button');
  andThen(function() {
    assert.contains( find('a.account').text(), 'my test account');
  });
});
