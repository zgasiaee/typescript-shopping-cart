import useCart from "../hooks/useCart"

type propsType = {
    viewCart: boolean
  }

const Footer = ({ viewCart } : propsType) => {

    const {totalItems , totalPrice} = useCart()

    const year : number = new Date().getFullYear()

    const pageContent = viewCart ? <p>Shopping Cart &copy; {year} </p> : (
        <>
           <span className="total-box">
             <p>Total Items : {totalItems}</p>
             <p>Total Price : {totalPrice} </p>
           </span>
           <p>Shopping Cart &copy; {year}</p>
        </>
    )

    const content = (
        <footer className="footer">
             {pageContent}
        </footer>
    )

  return content
}

export default Footer
