import { useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = props => {

    const [isCheckout, setIsCheckedout] = useState(false);

    const cartCtx = useContext(CartContext);

    const cartRemoveHandler = (id) => {
        cartCtx.RemoveItem(id);
    };

    const cartAddHandler = (item) => {
        cartCtx.AddItem({ ...item, amount: 1 });
    };

    const orderHandler = event => {
        setIsCheckedout(true);
    }

    const CartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartRemoveHandler.bind(null, item.id)}
                onAdd={cartAddHandler.bind(null, item)}
            />))}
    </ul>);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const modalActions = 
    <div className={classes.actions}>
        <button
            className={classes['button--alt']}
            onClick={props.onClose}>
            Close
        </button>
        {hasItems && <button
            className={classes.button}
            onClick={orderHandler}>
            Order
        </button>}
    </div>;

    return (

        <Modal onClose={props.onClose}>
            {CartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </Modal>)
};

export default Cart;