import { useContext } from "react";
import ProductContext from "../context/ProductProvider";
import { UseProductsContextType } from "../context/ProductProvider";

const useProduct = () : UseProductsContextType => {
    return useContext(ProductContext)
}

export default useProduct;