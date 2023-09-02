import { ReactElement, createContext, useMemo, useReducer } from 'react'

export type CartItemType = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
  type: string
  payload?: CartItemType
}

const reducer = (state: CartStateType, actin: ReducerAction): CartStateType => {
  switch (actin.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!actin.payload) {
        throw new Error('action.payload missing in ADD action')
      }
      const { id, name, price } = actin.payload

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      )

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id == id,
      )

      const quantity: number = itemExists ? itemExists.quantity + 1 : 1

      return {
        ...state,
        cart: [...filteredCart, { id, name, quantity, price }],
      }
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!actin.payload) {
        throw new Error('action.payload missing in REMOVE action')
      }

      const { id } = actin.payload

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      )

      return { ...state, cart: [...filteredCart] }
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!actin.payload) {
        throw new Error('action.payload missing in QUANTITY action')
      }

      const { id, quantity } = actin.payload

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id == id,
      )

      if (!itemExists) {
        throw new Error('item must exist in order to update quantity')
      }

      const updatedItem: CartItemType = { ...itemExists, quantity }

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      )

      return { ...state, cart: [...filteredCart, updatedItem] }
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }
    default:
      throw new Error('Unidentified reducer action type')
  }
}

const UseCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity
  }, 0)

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity * cartItem.price
    }, 0),
  )

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id.slice(-4))
    const itemB = Number(b.id.slice(-4))
    return itemA - itemB
  })

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof UseCartContext>

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
}

export const CartContext = createContext<UseCartContextType>(
  initCartContextState,
)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={UseCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
