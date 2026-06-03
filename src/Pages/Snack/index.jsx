import { useState, useRef } from "react"
import { TbChefHatFilled } from "react-icons/tb"
import Card from "../../Components/Card"
import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import BottomNav from "../../Components/BottomNav"
import ProductCard from "../../Components/ProductCard"
import ProductModal from "../../Components/ProductModal"
import CartModal from "../../Components/CartModal"
import CheckoutModal from "../../Components/CheckoutModal"
import Data from "../../Data/Data"
import { useCart } from "../../Context/CartContext"
import StoreBanner from "../../Components/StoreBanner"
import { useStoreStatus } from "../../hooks/useStoreStatus"

const categories = Data[0].containerCategory
const products = Data[1].products

const Snack = () => {
    const { cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, cartItems, cartTotal, addItem, updateQty, removeItem } = useCart()
    const { isOpen, message, type } = useStoreStatus()
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
      <Header bg="var(--background-image-gradient-header)" onCartClick={() => setCartOpen(true)} cartCount={cartItems.length} title="Cardápio" icon={<TbChefHatFilled className="text-4xl text-yellow" />}/>

      <main className="bg-cream pb-12">
      {!isOpen && message && <StoreBanner message={message} type={type} />}

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

      {cartItems.length > 0 && (
        <div className="flex justify-center px-5 mb-5 max-w-5xl mx-auto">
          <button
            onClick={() => setCheckoutOpen(true)}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-nunito font-black text-[17px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
          >
            ✅ Finalizar Compra — R$ {cartTotal.toFixed(2).replace(".", ",")}
          </button>
        </div>
      )}

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
                zapFlavor={product.zapFlavor}
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
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
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

      {checkoutOpen && (
        <CheckoutModal
          onClose={() => setCheckoutOpen(false)}
          onConfirm={() => setCheckoutOpen(false)}
        />
      )}
      </>
    )
}

export default Snack
