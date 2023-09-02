type propsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ viewCart, setViewCart }: propsType) => {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>View Products</button>
  ) : (
    <button onClick={() => setViewCart(true)}>View Cart</button>
  )

  const content = <nav className="navbar">{button}</nav>

  return content
}

export default Navbar
