import { useState, useRef } from "react"
import { TbChefHatFilled } from "react-icons/tb"
import Card from "../../Components/Card"
import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import BottomNav from "../../Components/BottomNav"
import ProductCard from "../../Components/ProductCard"
import ProductModal from "../../Components/ProductModal"
import CartModal from "../../Components/CartModal"
import Data from "../../Data/Data"
import { useCart } from "../../Context/CartContext"

const categories = Data[0].containerCategory
const products = Data[1].products

const Snack = () => {
    const { cartOpen, setCartOpen, cartItems, cartTotal, addItem, updateQty, removeItem } = useCart()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const productsRef = useRef(null)

    const handleSelectCategory = (key) => {
        setSelectedCategory(key)
        setTimeout(() => {
            productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 50)
    }

    const selectedProducts = selectedCategory ? products[selectedCategory] : []
    const catInfo = categories.find(c => c.key === selectedCategory)

    return (
      <>
      <Header bg="var(--background-image-gradient-header)" onCartClick={() => setCartOpen(true)} cartCount={cartItems.length} title="Cardápio" icon={<TbChefHatFilled className="text-4xl" style={{ color: '#FFD600' }} />}/>

      <main className="bg-cream pb-12">

      <section className="max-w-5xl mx-auto py-5 bg-gradient-banner">
        <h1 className="text-center text-white text-2xl font-black">Ki <span className="text-yellow-dark">Mel</span> Sorveteria</h1>
        <p className="text-center text-white text-[12px]">Escolha sua categoria favorita &#x1F924;</p>
      </section>

      <section className="max-w-5xl mx-auto py-5 px-5 grid grid-cols-2 gap-4 justify-items-center">
        {categories.map(cat => (
          <div key={cat.id} onClick={() => handleSelectCategory(cat.key)} className="w-full">
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
        <section ref={productsRef} className="max-w-5xl mx-auto px-5 pb-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black font-nunito">{catInfo?.name}</h2>
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
                onAdd={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>
      )}

      <BottomNav onCartClick={() => setCartOpen(true)} />

      {cartOpen && (
        <CartModal
          cartItems={cartItems}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addItem}
        />
      )}

      </main>
      <Footer bg="var(--background-image-gradient-header)"/>
      </>
    )
}

export default Snack
