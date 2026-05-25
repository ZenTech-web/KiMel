import { Link } from "react-router-dom"

const BottomNav = ({ onCartClick }) => {
    return (
      <section className="w-full fixed bottom-0 left-0 z-10 bg-white py-2.5 px-2.5 shadow-[0_-4px_10px_rgba(0,0,0,0.07)]">
        <menu>
          <ul className="flex text-[8px] font-extralight justify-between uppercase max-w-[1024px] mx-auto">
            <li><Link to="/" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🏠</span>início</Link></li>
            <li><Link to="/Snack" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🍽️</span>Cardápio</Link></li>
            <li><Link to="/Acaí" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🫐</span>montar</Link></li>
            <li onClick={onCartClick} className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🛒</span>carrinho</li>
          </ul>
        </menu>
      </section>
    )
}

export default BottomNav
