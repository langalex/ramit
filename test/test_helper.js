Ramit.rootElement = '#qunit-fixture';
Ramit.setupForTesting();
Ramit.injectTestHelpers();


QUnit.assert.contains = function(haystack, needle, message) {
  var actual = haystack.indexOf(needle) > -1;
  QUnit.push(actual, actual, needle, message);
};

QUnit.assert.notContains = function(haystack, needle, message) {
  var actual = haystack.indexOf(needle) == -1;
  QUnit.push(actual, actual, needle, message);
};
