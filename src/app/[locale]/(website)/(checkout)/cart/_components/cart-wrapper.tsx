
import CartHeader from './cart-header';
import CartList from './cart-list';

export default  function CartWrapper() {
  // const { error, data } = await getCartItems();
  return (
    <section>
      <CartHeader />
      <CartList />
    </section>
  );
}
