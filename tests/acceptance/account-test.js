// import startApp from '../helpers/start-app';
import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | managing accounts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /login', async function(assert) {
    await visit('/');
    await click('a.add-account');
    await fillIn('input[name=name]', 'my test account');
    await click('button');

    assert.contains( find('a.account').text(), 'my test account');
  });
});

// var App;

// module("managing accounts", {
//   setup: function() {
//     App = startApp();
//   },
//   teardown: function() {
//     App.reset();
//   }
// });
//
