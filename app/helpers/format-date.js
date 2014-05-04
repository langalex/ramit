export default function(attribute) {
  var d = new Date(this.get(attribute));
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
