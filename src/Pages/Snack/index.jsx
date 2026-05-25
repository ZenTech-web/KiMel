import { useState } from "react"
import Card from "../../Components/Card"
import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import BottomNav from "../../Components/BottomNav"
import ProductCard from "../../Components/ProductCard"
import Data from "../../Data/Data"

const categories = Data[0].containerCategory
const products = Data[1].products

const Snack = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleAddToCart = (item) => {
        setCartItems(prev => [...prev, item])
    }

    const selectedProducts = selectedCategory ? products[selectedCategory] : []

    return (
      <>
      <Header onCartClick={() => setCartOpen(true)} cartCount={cartItems.length} />

      <main className="bg-cream pb-12">

      <section className="max-w-[1024px] mx-auto py-5 bg-gradient-banner">
        <h1 className="text-center text-white text-2xl font-black">Ki <span className="text-yellow-dark">Mel</span> Sorveteria</h1>
        <p className="text-center text-white text-[12px]">Escolha sua categoria favorita &#x1F924;</p>
      </section>

      <section className="max-w-5xl mx-auto py-5 px-5 grid grid-cols-2 gap-4 justify-items-center">
        {categories.map(cat => (
          <div key={cat.id} onClick={() => setSelectedCategory(cat.key)} className="w-full">
            <Card
              fix={cat.fix}
              fixImg={cat.fixImg}
              img={<span className="text-4xl mx-auto my-3 block text-center">{cat.icon}</span>}
              product={cat.name}
              type={cat.type}
            />
          </div>
        ))}
      </section>

      {selectedCategory && (
        <section className="max-w-5xl mx-auto px-5 pb-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black font-nunito">
              {categories.find(c => c.key === selectedCategory)?.name}
            </h2>
            <button onClick={() => setSelectedCategory(null)} className="text-sm text-gray-400 cursor-pointer">
              Fechar ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {selectedProducts.map(product => (
              <ProductCard
                key={product.id}
                icon={product.icon}
                img={product.img}
                name={product.name}
                obs={product.obs}
                price={product.price}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </section>
      )}

      <BottomNav onCartClick={() => setCartOpen(true)} />

      {cartOpen && (
        <div className="fixed inset-0 z-20 flex justify-end">
          <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white w-4/5 max-w-sm h-full p-5 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black font-nunito">Carrinho 🛒</h2>
              <button onClick={() => setCartOpen(false)} className="text-xl font-bold text-gray-400 cursor-pointer">✕</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-2 text-gray-400 flex-1 justify-center">
                <span className="text-5xl">🛒</span>
                <p className="text-sm">Seu carrinho está vazio</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {cartItems.map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm">{item.icon} {item.name}{item.obs ? ` - ${item.obs}` : ""}</span>
                    <span className="font-bold text-orange text-sm">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      </main>
      <Footer/>
      </>
    )
}

export default Snack
