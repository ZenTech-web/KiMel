import { Link } from "react-router-dom"
import { TbChefHatFilled } from "react-icons/tb"
import { BsCart3 } from "react-icons/bs"

const Header = () => {
    return (
       <header className="w-full bg-gradient-header">
        <section className="max-w-[1024px] flex py-4 px-5 justify-between mx-auto">

        <div className="flex gap-2.5">
            <Link to="/">
            <div className="text-white text-[16px] font-bold w-9 h-9 bg-[#ffffff33] rounded-[8px] flex justify-center items-center">
                &lt;
            </div>
            </Link>
            <div className="flex items-center">
                <TbChefHatFilled className="text-4xl" style={{ color: '#FFD600' }} />
                <p className="text-2xl text-white font-black font-nunito">Cardápio</p>
            </div>
        </div>

        <div className="relative w-9 h-9 bg-[#ffffff33] rounded-lg flex justify-center items-center">
            <BsCart3 className="text-white text-[18px]" />
            <span className="absolute -top-2 -right-2 bg-[#FFD600] text-dark text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center">
                0
            </span>
        </div>

        </section>
       </header>
    )
}

export default Header