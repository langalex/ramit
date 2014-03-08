module("managing accounts", {
  setup: function() {
    Ramit.reset();
  }
});

test("add account", function(assert) {
  visit('/')
  click('a.add-account')
  fillIn('input[name=name]', 'my test account')
  click('button')
  andThen(function() {
    assert.contains( find('.account a').text(), 'my test account');
  });
});

