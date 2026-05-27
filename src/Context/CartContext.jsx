import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  const addItem = (item) => {
    setCartItems(prev => [...prev, { ...item, quantity: 1 }])
  }

  const updateQty = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev]
      const newQty = (updated[index].quantity || 1) + delta
      if (newQty <= 0) return updated.filter((_, i) => i !== index)
      updated[index] = { ...updated[index], quantity: newQty }
      return updated
    })
  }

  const removeItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen, cartItems, cartTotal, addItem, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
