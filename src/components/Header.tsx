import Navbar from './Navbar'
import useCart from '../hooks/useCart'

type propsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ viewCart, setViewCart }: propsType) => {
  const { totalItems, totalPrice } = useCart()

  const content = (
    <header className="header">
      <div className="title">
        <h1>Shopping Cart</h1>
        <div className="price-box">
          <p>Total Items : {totalItems}</p>
          <p>Total Price : {totalPrice} </p>
        </div>
      </div>
      <Navbar viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )

  return content
}

export default Header
