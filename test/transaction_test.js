module("managing transactions", {
  setup: function() {
    Ramit.Account.FIXTURES.push({id: 'test-account', name: 'test account', transactions: []})
    Ramit.reset();
  },

  teardown: function() {
    Ramit.Account.FIXTURES = [];
  }
});

test("add transactions", function(assert) {
  visit('/account/test-account');
  click('a.add-transaction');
  fillIn('input#description', 'my test transaction')
  fillIn('input#amount', '20')
  click('button')
  andThen(function() {
    assert.contains( find('.transactions a').text(), 'my test transaction');
  });
});

test("remove transactions", function(assert) {
  Ramit.Account.FIXTURES[0].transactions.push('test-transaction');
  Ramit.Transaction.FIXTURES.push({id: 'test-transaction', name: 'test transaction', amount: 10})

  visit('/account/test-account');
  click('a.transaction');
  click('.remove-transaction');
  andThen(function() {
    assert.notContains( find('.transactions a').text(), 'test transaction');
  });
});
