import { useState } from "react"
import { MdStorefront, MdDeliveryDining, MdTableBar } from "react-icons/md"
import { FaWhatsapp } from "react-icons/fa"
import { useStoreStatus } from "../../hooks/useStoreStatus"
import { useCart } from "../../Context/CartContext"

const WHATSAPP_NUMBER = "5581996038222"
const DELIVERY_FEE = 2.00

const formasReceber = [
  { key: "retirada", icon: <MdStorefront size={24} />,     label: "Retirada"       },
  { key: "entrega",  icon: <MdDeliveryDining size={24} />, label: "Entrega"        },
  { key: "local",    icon: <MdTableBar size={24} />,        label: "Comer no local" },
]

const receberLabel = { retirada: "Retirada", entrega: "Entrega", local: "Comer no local" }

const inputClass = "w-full bg-white rounded-xl px-4 py-3 text-[13px] font-nunito text-dark border-2 border-gray-200 focus:outline-none focus:border-dark transition-colors placeholder:text-gray-400"
const labelClass = "text-dark font-nunito font-bold text-[13px] mb-1.5 block"

const buildMessage = ({ nome, receber, pagamento, tipoCartao, troco, valorTroco, endereco, numero, complemento }, cartItems, cartTotal) => {
  let msg = `🛒 *Novo Pedido — Ki Mel Sorveteria*\n\n`
  msg += `👤 *Cliente:* ${nome}\n`
  msg += `📦 *Como receber:* ${receberLabel[receber]}\n`

  if (receber === "entrega") {
    const end = [endereco, numero, complemento].filter(Boolean).join(", ")
    msg += `📍 *Endereço:* ${end}\n`
  }

  msg += `💳 *Pagamento:* ${pagamento}`
  if (pagamento === "Cartão" && tipoCartao) msg += ` — ${tipoCartao}`
  msg += `\n`
  if (pagamento === "Dinheiro" && troco && valorTroco) {
    msg += `💵 *Troco para:* ${valorTroco}\n`
  }

  msg += `\n🛍️ *Itens do pedido:*\n`
  cartItems.forEach(item => {
    const qty   = item.quantity || 1
    const total = (item.price * qty).toFixed(2).replace(".", ",")
    const parts = [item.obs, item.notes].filter(Boolean).join(" · ")
    const desc  = parts ? ` - ${parts}` : ""
    msg += `${item.icon || "•"} *${item.name}*${desc} x${qty} — R$ ${total}\n`
  })

  if (receber === "entrega") {
    msg += `🚚 *Taxa de entrega:* R$ 2,00\n`
  }

  const total = cartTotal + (receber === "entrega" ? DELIVERY_FEE : 0)
  msg += `\n💰 *Total: R$ ${total.toFixed(2).replace(".", ",")}*`

  return msg
}

const CheckoutModal = ({ onClose, onConfirm }) => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { isOpen, message, type } = useStoreStatus()

  
  const [nome, setNome]               = useState("")
  const [receber, setReceber]         = useState(null)
  const [pagamento, setPagamento]     = useState(null)
  const [tipoCartao, setTipoCartao]   = useState(null)
  const [troco, setTroco]             = useState(false)
  const [valorTroco, setValorTroco]   = useState("")
  const [endereco, setEndereco]       = useState("")
  const [numero, setNumero]           = useState("")
  const [complemento, setComplemento] = useState("")

  const enderecoValido  = receber !== "entrega" || (endereco.trim() && numero.trim())
  const pagamentoValido = pagamento &&
    (pagamento !== "Cartão"  || tipoCartao) &&
    (pagamento !== "Dinheiro" || !troco || valorTroco.trim())

  const canContinue = isOpen && nome.trim() && receber && pagamentoValido && enderecoValido

  const handleConfirm = () => {
    if (!canContinue) return
    const data = { nome, receber, pagamento, tipoCartao, troco, valorTroco, endereco, numero, complemento }
    const msg  = buildMessage(data, cartItems, cartTotal)

    const orderData = {
      nome,
      receber,
      pagamento,
      tipoCartao,
      troco,
      valorTroco,
      endereco: [endereco, numero, complemento].filter(Boolean).join(", "),
      items: cartItems.map(item => ({
        icon: item.icon || "•",
        name: item.name,
        obs: [item.obs, item.notes].filter(Boolean).join(" · ") || null,
        quantity: item.quantity || 1,
        price: item.price,
      })),
      total: cartTotal + (receber === "entrega" ? DELIVERY_FEE : 0),
      ts: Date.now(),
    }

    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(orderData))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    const orderUrl = `${window.location.origin}/pedido?d=${b64}`
    const fullMsg  = `${msg}\n\n🔗 *Resumo para imprimir:* ${orderUrl}`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMsg)}`, "_blank")
    clearCart()
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative bg-cream w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">

        {!isOpen && message && (
          <div className={`px-4 py-2.5 text-white text-[12px] font-nunito font-bold text-center flex items-center justify-center gap-1.5 shrink-0 ${type === "closed-today" ? "bg-red-600" : "bg-orange"}`}>
            {type === "closed-today" ? "🔴" : "🟠"} {message}
          </div>
        )}

        <div className="bg-dark px-5 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-white font-fredoka text-[22px]">Finalizar pedido</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl cursor-pointer transition-colors">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-5 overflow-y-auto">

          {/* Nome */}
          <div>
            <label className={labelClass}>Nome <span className="text-orange">*</span></label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              className={inputClass}
            />
          </div>

          {/* Como receber */}
          <div>
            <p className="text-dark font-nunito font-bold text-[14px] mb-2">
              Como deseja receber? <span className="text-orange">*</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {formasReceber.map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setReceber(key)}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-xl border-2 text-[11px] font-nunito font-bold transition-all duration-200 cursor-pointer ${receber === key ? 'border-dark bg-dark text-white' : 'border-gray-200 bg-white text-dark hover:border-gray-300'}`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Endereço — só se Entrega */}
          {receber === "entrega" && (
            <div className="flex flex-col gap-3 bg-white rounded-2xl p-4 border-2 border-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-dark font-nunito font-bold text-[13px]">Endereço de entrega</p>
                <span className="text-orange text-[11px] font-nunito font-bold">+ R$ 2,00 taxa de entrega</span>
              </div>
              <div>
                <label className={labelClass}>Endereço <span className="text-orange">*</span></label>
                <input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, Avenida..." className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Número <span className="text-orange">*</span></label>
                  <input value={numero} onChange={e => setNumero(e.target.value)} placeholder="Ex: 123" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Complemento</label>
                  <input value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Apto, bloco..." className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* Forma de pagamento */}
          <div>
            <p className="text-dark font-nunito font-bold text-[14px] mb-2">
              Forma de pagamento <span className="text-orange">*</span>
            </p>
            <div className="flex gap-2">
              {["Pix", "Cartão", "Dinheiro"].map(forma => (
                <button
                  key={forma}
                  onClick={() => { setPagamento(forma); setTipoCartao(null); setTroco(false); setValorTroco("") }}
                  className={`flex-1 py-2.5 rounded-full border-2 text-[13px] font-nunito font-bold transition-all duration-200 cursor-pointer ${pagamento === forma ? 'border-dark bg-dark text-white' : 'border-gray-200 bg-white text-dark hover:border-gray-300'}`}
                >
                  {forma}
                </button>
              ))}
            </div>
          </div>

          {/* Pix */}
          {pagamento === "Pix" && (
            <div className="flex flex-col gap-2.5 bg-green-50 border border-green-200 rounded-2xl p-3.5">
              <div className="flex items-start gap-2.5">
                <FaWhatsapp className="text-green-500 text-[20px] shrink-0 mt-0.5" />
                <p className="text-green-700 text-[12px] font-nunito leading-relaxed">
                  O pedido só será liberado após o envio do comprovante de pagamento via WhatsApp. <span className="text-red-500 font-bold">Atenção:</span> Clique em finalizar pedido.
                  <span className="text-red-500"> E digite seu nome no campo acima! </span>
                </p>
              </div>
            
            </div>
          )}

          {/* Cartão — tipo */}
          {pagamento === "Cartão" && (
            <div>
              <p className="text-dark font-nunito font-bold text-[13px] mb-2">
                Tipo de cartão <span className="text-orange">*</span>
              </p>
              <div className="flex gap-2">
                {["Crédito", "Débito"].map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => setTipoCartao(tipo)}
                    className={`flex-1 py-2 rounded-full border-2 text-[13px] font-nunito font-bold transition-all duration-200 cursor-pointer ${tipoCartao === tipo ? 'border-dark bg-dark text-white' : 'border-gray-200 bg-white text-dark hover:border-gray-300'}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
              {tipoCartao === "Crédito" && (
                <p className="mt-2 text-orange text-[12px] font-nunito font-medium">
                  Pagamentos no crédito têm acréscimo.
                </p>
              )}
            </div>
          )}

          {/* Dinheiro — troco */}
          {pagamento === "Dinheiro" && (
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setTroco(t => !t)}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${troco ? 'bg-dark border-dark' : 'bg-white border-gray-300'}`}>
                  {troco && <span className="text-white text-[11px] font-bold">✓</span>}
                </div>
                <span className="text-dark font-nunito text-[13px] font-medium">Preciso de troco</span>
              </label>
              {troco && (
                <div>
                  <label className={labelClass}>Troco para quanto? <span className="text-orange">*</span></label>
                  <input
                    type="text"
                    value={valorTroco}
                    onChange={e => setValorTroco(e.target.value)}
                    placeholder="Ex: R$ 50,00"
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center bg-white rounded-2xl px-4 py-3 border-2 border-gray-100">
            <div className="text-[12px] font-nunito text-gray-500">
              <p>Subtotal: R$ {cartTotal.toFixed(2).replace(".", ",")}</p>
              {receber === "entrega" && <p className="text-orange font-bold">+ Taxa de entrega: R$ 2,00</p>}
            </div>
            <p className="font-black text-dark text-[18px]">
              R$ {(cartTotal + (receber === "entrega" ? DELIVERY_FEE : 0)).toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* Continuar */}
          <button
            onClick={handleConfirm}
            disabled={!canContinue}
            className={`w-full py-4 rounded-2xl font-nunito font-black text-[16px] transition-all duration-200 flex items-center justify-center gap-2 ${canContinue ? 'bg-dark text-white cursor-pointer hover:opacity-90 active:scale-95 animate-chama-atencao' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <FaWhatsapp className={canContinue ? "text-green-400" : "text-gray-400"} />
            Finalizar pedido
          </button>

        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
