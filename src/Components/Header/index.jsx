import { Link } from "react-router-dom"
import { BsCart3 } from "react-icons/bs"

const Header = ({ title, bg, icon, onCartClick, cartCount = 0 }) => {
    return (
       <header style={{background: bg}} className="w-full ">
        <section className="max-w-[1024px] flex py-4 px-5 justify-between mx-auto">

        <div className="flex gap-2.5">
            <Link to="/">
            <div className="text-white text-[16px] font-bold w-9 h-9 bg-[#ffffff33] rounded-[8px] flex justify-center items-center">
                &lt;
            </div>
            </Link>
            <div className="flex items-center">
                {icon}
                <p className="text-2xl text-white font-black font-nunito">{title}</p>
            </div>
        </div>

        <div onClick={onCartClick} className="relative w-9 h-9 bg-[#ffffff33] rounded-lg flex justify-center items-center cursor-pointer">
            <BsCart3 className="text-white text-[18px]" />
            <span className="absolute -top-2 -right-2 bg-[#FFD600] text-dark text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center">
                {cartCount}
            </span>
        </div>

        </section>
       </header>
    )
}

export default Header