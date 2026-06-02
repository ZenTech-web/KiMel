import { Link } from "react-router-dom"
import { BsCart3 } from "react-icons/bs"
import { IoChevronBack } from "react-icons/io5"

const Header = ({ title, bg, icon, onCartClick, cartCount = 0 }) => {
    return (
       <header style={{background: bg}} className="w-full ">
        <section className="max-w-[1024px] flex py-4 px-5 justify-between mx-auto">

        <div className="flex gap-2.5">
            <Link to="/">
            <div className="text-white w-9 h-9 bg-white/20 rounded-lg flex justify-center items-center">
                <IoChevronBack size={20} />
            </div>
            </Link>
            <div className="flex items-center">
                {icon}
                <p className="text-2xl text-white font-black font-nunito">{title}</p>
            </div>
        </div>

        <div onClick={onCartClick} className="relative w-9 h-9 bg-white/20 rounded-lg flex justify-center items-center cursor-pointer">
            <BsCart3 className="text-white text-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow text-dark text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center">
                {cartCount}
              </span>
            )}
        </div>

        </section>
       </header>
    )
}

export default Header
