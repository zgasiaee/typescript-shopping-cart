import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
import Product from "./Product";
import { ReactElement } from "react";

const ProductList =() => {

    const {dispatch , REDUCER_ACTIONS , cart} = useCart()
    const {products} = useProduct()

    let pageContent : ReactElement | ReactElement[] = <p>Loading...</p>

    if(products?.length){
       pageContent = products.map(product => {
           const inCart : boolean = cart.some(item => item.id === product.id)

           return (
               <Product key={product.id} product={product} dispatch={dispatch} REDUCE_ACTIONS={REDUCER_ACTIONS} inCart={inCart} /> 
           )
       })
    }

    const content = (
        <main className="main-content">
            {pageContent}
        </main>
    )

    return content
}

export default ProductList;