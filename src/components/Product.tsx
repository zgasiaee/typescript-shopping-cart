import { ProductType } from '../context/ProductProvider'
import { ReducerAction, ReducerActionType } from '../context/CartProvider'
import { ReactElement } from 'react'

type propsType = {
  product: ProductType
  dispatch: React.Dispatch<ReducerAction>
  REDUCE_ACTIONS: ReducerActionType
  inCart: boolean
}

const Product = ({
  product,
  dispatch,
  REDUCE_ACTIONS,
  inCart,
}: propsType): ReactElement => {
  const img: string = new URL(
    `../assets/${product.id}.jpeg`,
    import.meta.url,
  ).href

  const onAddToCart = () => {
    dispatch({ type: REDUCE_ACTIONS.ADD, payload: { ...product, quantity: 1 } })
  }

  const itemInCart = inCart ? ' -> Item in Cart ✔️' : null

  const content = (
    <article className="product">
      <h3 className='name'>{product.name}</h3>
        <img src={img} alt={product.name} />
      <p className='price'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )

  return content
}

export default Product
