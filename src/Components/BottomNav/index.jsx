import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useCart } from "../../Context/CartContext"

const BottomNav = ({ onCartClick }) => {
    const { cartItems } = useCart()
    const count = cartItems.length
    const [shaking, setShaking] = useState(false)
    const prevCount = useRef(count)

    useEffect(() => {
        if (count > prevCount.current) {
            setShaking(true)
            const t = setTimeout(() => setShaking(false), 500)
            return () => clearTimeout(t)
        }
        prevCount.current = count
    }, [count])

    return (
      <section className="w-full fixed bottom-0 left-0 z-10 bg-white py-2.5 px-2.5 shadow-[0_-4px_10px_rgba(0,0,0,0.07)]">
        <menu>
          <ul className="flex text-[8px] font-extralight justify-between uppercase max-w-5xl mx-auto">
            <li><Link to="/" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🏠</span>início</Link></li>
            <li><Link to="/Snack" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🍽️</span>Cardápio</Link></li>
            <li><Link to="/Acaí" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🫐</span>montar</Link></li>
            <li onClick={onCartClick} className="relative flex flex-col items-center gap-0.5 cursor-pointer">
              <span className={`relative text-xl inline-block ${shaking ? "animate-cart-shake" : ""}`}>
                🛒
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-orange text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {count}
                  </span>
                )}
              </span>
              carrinho
            </li>
          </ul>
        </menu>
      </section>
    )
}

export default BottomNav
