/* globals requirejs,require */
import { keys } from '@ember/polyfills';

// TODO: load based on params
keys(requirejs.entries).forEach(function(entry) {
  if ((/\-test/).test(entry)) {
    require(entry, null, null, true);
  }
});
