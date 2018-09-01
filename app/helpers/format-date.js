import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function(args) {
  var d = new Date(args[0]);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
});
