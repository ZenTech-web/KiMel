import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(null)

const STORAGE_KEY = "kimel_cart"

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  const addItem = (item) => {
    setCartItems(prev => [...prev, { quantity: 1, ...item }])
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

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, cartItems, cartTotal, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
