export default function(){
  this.transition(
    this.fromRoute('accounts'),
    this.toRoute(['account', 'new_account', 'help']),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('account'),
    this.toRoute(['new_transaction', 'transaction']),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
