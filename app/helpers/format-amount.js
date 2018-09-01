import { helper as buildHelper } from '@ember/component/helper';

const formatter = new Intl.NumberFormat('en-US');

export default buildHelper(function(args) {
  var amount = args[0];
  return formatter.format(amount);
});
