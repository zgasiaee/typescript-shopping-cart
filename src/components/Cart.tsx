import useCart from "../hooks/useCart";
import { useState } from 'react';
import CartItem from "./CartItem";


const Cart =() => {

    const [confirm , setConfirm] = useState<boolean>(false)
    
    const {dispatch , REDUCER_ACTIONS , totalItems , totalPrice , cart} = useCart()

    const onSubmitOrder = () => {
        dispatch({ type : REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }

    const pageContent = confirm ? <h2 className="thanks">Thanks for your order</h2> : <>
      <ul className="cart">
         {cart.map(item => {
            return(
                <CartItem key={item.id} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
            )
         })}
      </ul>
      <div className="totals">
          <button className="submit" disabled={!totalItems} onClick={onSubmitOrder}>Place Order</button>
      </div>
    </>

    const content = (
        <main className="main-cart">
            {pageContent}
        </main>
    )


    return content
}

export default Cart;