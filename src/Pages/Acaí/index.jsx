import { useState } from "react"
import Header from "../../Components/Header"
import Data from "../../Data/Data"
import SectionTitle from "../../Components/SectionTitle"
import Footer from "../../Components/Footer"
import BottomNav from "../../Components/BottomNav"
import CartModal from "../../Components/CartModal"
import CheckoutModal from "../../Components/CheckoutModal"
import StoreBanner from "../../Components/StoreBanner"
import { useCart } from "../../Context/CartContext"
import { useStoreStatus } from "../../hooks/useStoreStatus"

const Acaí = () => {

  const sizesAcair = Data.find(d => d.sizes).sizes
  const frutasAcair = Data.find(d => d.frutas).frutas
  const adicionaisAcair = Data.find(d => d.adicionais).adicionais
  const { cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, cartItems, cartTotal, addItem, updateQty, removeItem } = useCart()
  const { isOpen, message, type } = useStoreStatus()
  const [selected, setSelected] = useState(null)
  const [selectedSabores, setSelectedSabores] = useState([])
  const [observacao, setObservacao] = useState("")
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
       
     <main className="bg-acai-pale pb-7">
     {!isOpen && <StoreBanner message={message} type={type} />}

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
         <div key={index} className={`w-20 shadow rounded-2xl flex flex-col items-center bg-white text-[14px] py-2 gap-0.5 hover:cursor-pointer hover:border border-acai transition-all duration-200 md:w-44 lg:py-4 ${selected === index && 'border border-acai'}`} onClick={() => { setSelected(index); const max = sizesAcair[index].ml === "700ml" ? 3 : 2; setSelectedFrutas(prev => prev.slice(0, max)) }}>
            <div className="bg-acai text-white w-9 h-9 flex justify-center items-center rounded-full">
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
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${selectedSabores.includes(index) ? 'border-acai bg-acai/10 text-acai' : 'border-gray-300 bg-white text-gray-700'}`}
          >
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedSabores.includes(index) ? 'border-acai' : 'border-gray-300'}`}>
              {selectedSabores.includes(index) && <span className="w-2 h-2 rounded-full bg-acai block" />}
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
            onClick={() => {
              const maxFrutas = selected !== null && sizesAcair[selected].ml === "700ml" ? 3 : 2
              setSelectedFrutas(prev => {
                if (prev.includes(index)) return prev.filter(i => i !== index)
                if (prev.length >= maxFrutas) return prev
                return [...prev, index]
              })
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${selectedFrutas.includes(index) ? 'border-acai bg-acai/10 text-acai' : 'border-gray-300 bg-white text-gray-700'}`}
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
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[14px] font-nunito font-medium transition-all duration-200 hover:cursor-pointer ${especial ? 'border-amber-400' : ''} ${selectedAdicionais.includes(index) ? 'border-acai bg-acai/10 text-acai' : !especial ? 'border-gray-300 bg-white text-gray-700' : 'bg-amber-50 text-amber-700'}`}
          >
            {emoji} {nome} · <span className="text-[12px] font-normal">{preco}</span>
          </button>
        ))}
      </section>

       </section>

      <div className="flex flex-col items-center gap-3 px-5 mt-6 w-full max-w-sm mx-auto">
        <div className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm text-[13px] text-gray-600 font-nunito">
          <p className="font-bold text-gray-700 mb-1">🧾 O que o açaí já vem:</p>
          <p>Granola · Leite condensado · Leite em pó · Farinha de amendoim</p>
        </div>
        <textarea
          value={observacao}
          onChange={e => setObservacao(e.target.value)}
          placeholder="Quer retirar algo? Ex: sem granola, sem leite em pó..."
          rows={2}
          className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm text-[13px] font-nunito text-gray-700 placeholder:text-gray-400 border border-gray-200 resize-none focus:outline-none focus:border-acai transition-colors duration-200"
        />
      </div>

      <div className="flex justify-center px-5 mt-3">
        <button
          disabled={selected === null || selectedSabores.length === 0}
          onClick={() => {
            const tamanho = sizesAcair[selected]
            const sabor = selectedSabores.map(i => sabores[i].nome).join(" + ")
            const frutas = selectedFrutas.map(i => frutasAcair[i].nome).join(", ")
            const adicionaisNomes = selectedAdicionais.map(i => adicionaisAcair[i].nome).join(", ")
            const adicionaisPreco = selectedAdicionais.reduce((sum, i) => sum + adicionaisAcair[i].price, 0)
            const obs = [tamanho.ml, sabor, frutas, adicionaisNomes, observacao ? `obs: ${observacao}` : ""].filter(Boolean).join(" · ")
            addItem({ name: "Açaí", obs, price: tamanho.price + adicionaisPreco, icon: "🫐" })
            setCartOpen(true)
          }}
          className={`w-full max-w-sm font-nunito font-bold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 ${selected !== null && selectedSabores.length > 0 ? 'bg-linear-to-r from-acai to-acai-light text-white hover:opacity-90 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>

      </main>
      <BottomNav onCartClick={() => setCartOpen(true)} />
      <Footer bg="var(--background-image-gradient-header-acair)"/>

      {checkoutOpen && (
        <CheckoutModal
          onClose={() => setCheckoutOpen(false)}
          onConfirm={() => setCheckoutOpen(false)}
        />
      )}

      {cartOpen && (
        <CartModal
          cartItems={cartItems}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
        />
      )}
      </>
    )
}

export default Acaí