import { ReducerActionType } from '../context/CartProvider'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReactElement, ChangeEvent } from 'react'

type propTypes = {
  item: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
}

const CartItem = ({ item, dispatch, REDUCER_ACTIONS }: propTypes) => {
  const img: string = new URL(`../assets/${item.id}.jpeg`, import.meta.url).href

  const lineTotal: number = item.quantity * item.price

  const highestQuantity = 10 > item.quantity ? 10 : item.quantity

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (item) => item + 1,
  )

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`option${value}`} value={value}>
        {value}
      </option>
    )
  })

  const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    })
  }

  const onremoveFromCart = () => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item })
  }

  const content = (
    <li className="cart-item">
      <img src={img} alt={item.name} />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.price)}
      </div>
      <select
        name="itemQuantity"
        id="itemQuantity"
        className="cart-select"
        value={item.quantity}
        aria-label="Item Quantity"
        onChange={onChangeQuantity}
      >
        {options}
      </select>
      <div className="item-subTotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(lineTotal)}
      </div>
      <button
        className="button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onremoveFromCart}
      >
        ❌
      </button>
    </li>
  )

  return content
}

export default CartItem
