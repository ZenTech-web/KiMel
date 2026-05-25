import Card from "../../Components/Card"
import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import { Link } from "react-router-dom"

const Snack = () => {
    return (
      <>
      <Header/>

      <main className="bg-cream pb-12">

      <section className="max-w-[1024px] mx-auto py-5 bg-gradient-banner">

         <h1 className="text-center text-white text-2xl font-black">Ki <span className="text-yellow-dark">Mel</span> Sorveteria</h1>
         <p className="text-center text-white text-[12px]">Escolha sua categoria favorita &#x1F924;</p> 
      </section>

      <section className="max-w-5xl mx-auto py-5 px-5 grid grid-cols-2 gap-4 justify-items-center">
        <Card
        fix="#FFB500"
        boderColor="#FFB500"
        fixImg="#FFF8F0"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍟</span>}
        product="Batatinhas"
        type="Crocantes e deliciosas"
        />
        <Card
        fix="#FF4E8C"
        boderColor=""
        fixImg="#FFE5EF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍓</span>}
        product="Salada de Frutas"
        type="Frescas todo dia"
        />
        <Card
        fix="#00C8B0"
        boderColor=""
        fixImg="#E0FAF7"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍦</span>}
        product="Sorvetes"
        type="Vários sabores"
        />
        <Card
        fix="#FF7A3C"
        boderColor=""
        fixImg="#FFE8DC"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍔</span>}
        product="Hambúrguer"
        type="Artesanais"
        />
        <Card
        fix="#A855F7"
        boderColor=""
        fixImg="#F3E8FF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🫔</span>}
        product="Cuscuz Recheado"
        type="Feito na hora"
        />
        <Card
        fix="#3B82F6"
        boderColor=""
        fixImg="#EFF6FF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🫓</span>}
        product="Tapioca"
        type="Doce ou salgada"
        />
        <Card
        fix="#EC4899"
        boderColor=""
        fixImg="#FDF2F8"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍭</span>}
        product="Sobremesa"
        type="Para adoçar o dia"
        />
        <Card
        fix="#10B981"
        boderColor=""
        fixImg="#ECFDF5"
        img={<span className="text-4xl mx-auto my-3 block text-center">🥤</span>}
        product="Bebidas"
        type="Geladas e saborosas"
        />
      </section>

      <section className="w-full fixed bottom-0 left-0 z-10 bg-white py-2.5 px-2.5 shadow-[0_-4px_10px_rgba(0,0,0,0.07)]">
        <menu>
          <ul className="flex text-[8px] font-extralight justify-between uppercase max-w-[1024px] mx-auto">
            <li><Link to="/" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🏠</span>início</Link></li>
            <li><Link to="/Snack" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🍽️</span>Cardápio</Link></li>
            <li><Link to="/Acaí" className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🫐</span>montar</Link></li>
            <li className="flex flex-col items-center gap-0.5 cursor-pointer"><span className="text-xl">🛒</span>carrinho</li>
          </ul>
        </menu>
      </section>

      </main>
      <Footer/>
      </>
    )
}

export default Snack