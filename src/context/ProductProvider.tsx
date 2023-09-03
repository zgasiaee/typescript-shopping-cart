import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    id : string ,
    name : string ,
    price : number
}

const initState : ProductType[] = [
   {
       "id" : "item0001" ,
       "name" : "Lighter" ,
       "price" : 9
   } ,
   {
       "id" : "item0002" ,
       "name" : "Headphone" ,
       "price" : 17
   } ,
   {
       "id" : "item0003" ,
       "name" : "Sneakers" ,
       "price" : 23
   } ,
   {
       "id" : "item0004" ,
       "name" : "Watch" ,
       "price" : 12
   } ,
   {
       "id" : "item0005" ,
       "name" : "Laptop" ,
       "price" : 31
   } ,
   {
       "id" : "item0006" ,
       "name" : "Pot" ,
       "price" : 11
   }
]

export type UseProductsContextType = { products : ProductType[] }

const initContextState : UseProductsContextType = { products : [] }

const ProductContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children ?: ReactElement | ReactElement[] }

export const ProductProvider = ({children} : ChildrenType) : ReactElement => {
   const [products ] = useState<ProductType[]>(initState)

   return(
    <ProductContext.Provider value={{products}}>
        {children}
    </ProductContext.Provider>
   )
}

export default ProductContext