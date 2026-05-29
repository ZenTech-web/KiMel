import { FiTrash2 } from "react-icons/fi"

const CartModal = ({ cartItems, cartTotal, onClose, onUpdateQty, onRemove, onCheckout }) => {
  return (
    <div className="fixed inset-0 z-20 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white w-4/5 max-w-sm h-full p-5 overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black font-nunito">Carrinho 🛒</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-400 cursor-pointer">✕</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-2 text-gray-400 flex-1 justify-center">
            <span className="text-5xl">🛒</span>
            <p className="text-sm">Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3 flex-1">
              {cartItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-100 rounded-2xl p-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden">
                    {item.img
                      ? <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1" />
                      : <span className="text-2xl">{item.icon}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-dark leading-tight truncate">
                      {item.name}{[item.obs, item.notes].filter(Boolean).join(" · ") ? ` - ${[item.obs, item.notes].filter(Boolean).join(" · ")}` : ""}
                    </p>
                    <p className="font-bold text-orange text-[13px] mt-0.5">
                      R$ {(item.price * (item.quantity || 1)).toFixed(2).replace(".", ",")}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button onClick={() => onUpdateQty(i, -1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-dark font-bold text-sm cursor-pointer hover:bg-gray-200">−</button>
                      <span className="text-[13px] font-bold text-dark w-4 text-center">{item.quantity || 1}</span>
                      <button onClick={() => onUpdateQty(i, +1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-dark font-bold text-sm cursor-pointer hover:bg-gray-200">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(i)} className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer shrink-0">
                    <FiTrash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 mt-3 flex justify-between items-center">
              <span className="font-black font-nunito text-dark">Total</span>
              <span className="font-black text-orange">R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-nunito font-black text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              ✅ Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CartModal
