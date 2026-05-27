import { useState } from "react"
import Header from "../../Components/Header"
import Data from "../../Data/Data"
import SectionTitle from "../../Components/SectionTitle"
import Footer from "../../Components/Footer"
import BottomNav from "../../Components/BottomNav"
import CartModal from "../../Components/CartModal"
import { useCart } from "../../Context/CartContext"

const Acaí = () => {

  const sizesAcair = Data.find(d => d.sizes).sizes
  const frutasAcair = Data.find(d => d.frutas).frutas
  const adicionaisAcair = Data.find(d => d.adicionais).adicionais
  const { cartOpen, setCartOpen, cartItems, cartTotal, addItem, updateQty, removeItem } = useCart()
  const [selected, setSelected] = useState(null)
  const [selectedSabores, setSelectedSabores] = useState([])
  const [selectedFrutas, setSelectedFrutas] = useState([])
  const [selectedAdicionais, setSelectedAdicionais] = useState([])

  const sabores = [
    { emoji: "🫐", nome: "Açaí" },
    { emoji: "🍨", nome: "Cupuaçu" },
  ]

  const toggleSabor = (index) => {
    setSelectedSabores(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
  }

  
    return (
      <>

     <Header bg="var(--background-image-gradient-header-acair)" title="Monte seu Açaí" icon={<span className="text-4xl">🫐</span>} onCartClick={() => setCartOpen(true)} cartCount={cartItems.length}/>
       
     <main className="bg-[#F5F3FF] pb-7">

     <section className="bg-gradient-banner-acair flex flex-col items-center py-5 max-w-5xl mx-auto">
          <div className="uppercase text-white text-[12px] border border-white py-1 px-2 rounded-2xl bg-white/20 font-nunito font-bold">
             🌿 fresquinho todo dia
          </div>
          <h1 className="font-nunito font-black text-white text-2xl text-center mt-1.5 lg:text-3xl">
            Monte seu <span className="text-yellow">Açaí</span> <br /> do jeito que você ama!
          </h1>
          <p className="text-center text-white text-[10px] lg:text-[12px]">Escolha o tamanho, o creme, as frutas e as coberturas</p>
          <p className="mt-1.5 lg:text-[24px]">
            🫐 🍓 🍌 🥜
          </p>
     </section>
 
      <section className="flex flex-col items-center my-5">

      <SectionTitle emoji="🥤" title="Tamanho" />

      <section className="flex my-5 gap-2.5">

       {sizesAcair.map(({size, preco, ml}, index) => (
         <div key={index} className={`w-20 shadow rounded-2xl flex flex-col items-center bg-white text-[14px] py-2 gap-0.5 hover:cursor-pointer hover:border border-[#652CC1] transition-all duration-200 md:w-44 lg:py-4 ${selected === index && 'border border-[#652CC1]'}`} onClick={() => setSelected(index)}>
            <div className="bg-[#652CC1] text-white w-9 h-9 flex justify-center items-center rounded-full">
              {size}
            </div>
            <div className="text-[12px] font-bold">
              {ml}
            </div>
            <div className="text-[12px] font-medium">
              {preco}
            </div>
         </div>
       ))}

      </section>

      <SectionTitle emoji="🫐" title="Sabor" />

      <div className="flex gap-3 py-5">
        {sabores.map(({ emoji, nome }, index) => (
          <button
            key={index}
            onClick={() => toggleSabor(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${selectedSabores.includes(index) ? 'border-[#652CC1] bg-[#652CC1]/10 text-[#652CC1]' : 'border-gray-300 bg-white text-gray-700'}`}
          >
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedSabores.includes(index) ? 'border-[#652CC1]' : 'border-gray-300'}`}>
              {selectedSabores.includes(index) && <span className="w-2 h-2 rounded-full bg-[#652CC1] block" />}
            </span>
            {emoji} {nome}
          </button>
        ))}
      </div>

      <SectionTitle emoji="🍓 " title="Frutas"/>

      <section className="flex flex-wrap justify-center gap-2 my-5">
        {frutasAcair.map(({ emoji, nome }, index) => (
          <button
            key={index}
            onClick={() => setSelectedFrutas(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${selectedFrutas.includes(index) ? 'border-[#652CC1] bg-[#652CC1]/10 text-[#652CC1]' : 'border-gray-300 bg-white text-gray-700'}`}
          >
            {emoji} {nome}
          </button>
        ))}
      </section>

      <SectionTitle emoji="🍬" title="Adicionais" />

      <section className="flex flex-wrap justify-center gap-2 mt-5">
        {adicionaisAcair.map(({ emoji, nome, preco, especial }, index) => (
          <button
            key={index}
            onClick={() => setSelectedAdicionais(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${especial ? 'border-amber-400' : ''} ${selectedAdicionais.includes(index) ? 'border-[#652CC1] bg-[#652CC1]/10 text-[#652CC1]' : !especial ? 'border-gray-300 bg-white text-gray-700' : 'bg-amber-50 text-amber-700'}`}
          >
            {emoji} {nome} · <span className="text-[12px] font-normal">{preco}</span>
          </button>
        ))}
      </section>

       </section>

      <div className="flex justify-center px-5 mt-6">
        <button
          onClick={() => {
            if (selected === null) return
            const tamanho = sizesAcair[selected]
            const sabor = selectedSabores.map(i => sabores[i].nome).join(" + ")
            const frutas = selectedFrutas.map(i => frutasAcair[i].nome).join(", ")
            const adicionaisNomes = selectedAdicionais.map(i => adicionaisAcair[i].nome).join(", ")
            const adicionaisPreco = selectedAdicionais.reduce((sum, i) => sum + adicionaisAcair[i].price, 0)
            const obs = [tamanho.ml, sabor, frutas, adicionaisNomes].filter(Boolean).join(" · ")
            addItem({ name: "Açaí", obs, price: tamanho.price + adicionaisPreco, icon: "🫐" })
            setCartOpen(true)
          }}
          className="w-full max-w-sm bg-linear-to-r from-[#652CC1] to-[#9B5EF5] text-white font-nunito font-bold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 hover:cursor-pointer"
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>

      </main>
      <BottomNav onCartClick={() => setCartOpen(true)} />
      <Footer bg="var(--background-image-gradient-header-acair)"/>

      {cartOpen && (
        <CartModal
          cartItems={cartItems}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
      </>
    )
}

export default Acaí