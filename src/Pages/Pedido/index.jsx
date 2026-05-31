import { useSearchParams } from "react-router-dom"

const receberLabel = { retirada: "Retirada", entrega: "Entrega", local: "Comer no local" }

const fmt = (ts) => {
  const d = new Date(ts)
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

const Pedido = () => {
  const [params] = useSearchParams()

  let order = null
  try {
    const d = params.get("d")
    if (d) {
      const b64 = d.replace(/-/g, "+").replace(/_/g, "/")
      order = JSON.parse(decodeURIComponent(escape(atob(b64))))
    }
  } catch {}

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center font-nunito text-gray-400">
      Pedido não encontrado.
    </div>
  )

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0.6cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="bg-white font-nunito">
        <div className="max-w-sm mx-auto px-5 py-6 print:px-0 print:py-0">

          <button
            onClick={() => window.print()}
            className="print:hidden w-full mb-5 py-3 bg-dark text-white rounded-2xl font-bold text-[15px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            🖨️ Imprimir pedido
          </button>

          {/* Cabeçalho */}
          <div className="text-center pb-3 mb-3 border-b-2 border-dashed border-gray-200">
            <div className="print:hidden">
              <h1 className="font-fredoka text-3xl">
                <span className="text-pink">Ki</span>{" "}
                <span className="text-dark">Mel</span>
              </h1>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Sorveteria</p>
            </div>
            <p className="text-gray-400 text-[11px] mt-0.5">{fmt(order.ts)}</p>
          </div>

          {/* Dados do cliente */}
          <div className="mb-3 space-y-1 text-[12px]">
            <p className="font-bold text-dark text-[13px] mb-1.5">Dados do pedido</p>
            <div className="flex gap-1">
              <span className="text-gray-400 shrink-0">Cliente:</span>
              <span className="font-bold">{order.nome}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-400 shrink-0">Como receber:</span>
              <span className="font-bold">{receberLabel[order.receber]}</span>
            </div>
            {order.receber === "entrega" && order.endereco && (
              <div className="flex gap-1">
                <span className="text-gray-400 shrink-0">Endereço:</span>
                <span className="font-bold">{order.endereco}</span>
              </div>
            )}
            <div className="flex gap-1">
              <span className="text-gray-400 shrink-0">Pagamento:</span>
              <span className="font-bold">
                {order.pagamento}{order.tipoCartao ? ` — ${order.tipoCartao}` : ""}
              </span>
            </div>
            {order.pagamento === "Dinheiro" && order.troco && order.valorTroco && (
              <div className="flex gap-1">
                <span className="text-gray-400 shrink-0">Troco para:</span>
                <span className="font-bold">{order.valorTroco}</span>
              </div>
            )}
          </div>

          {/* Itens */}
          <div className="border-t-2 border-dashed border-gray-200 pt-3 mb-3">
            <p className="font-bold text-dark text-[13px] mb-2">Itens do pedido</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <div className="flex-1 text-[12px]">
                    <p className="font-bold">{item.icon} {item.name} <span className="font-normal text-gray-400">x{item.quantity}</span></p>
                    {item.obs && <p className="text-gray-400 text-[10px] leading-snug mt-0.5">{item.obs}</p>}
                  </div>
                  <p className="font-bold text-[12px] shrink-0">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-dashed border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-black text-dark text-[16px]">Total</span>
              <span className="font-black text-dark text-[18px]">
                R$ {order.total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <p className="print:hidden text-center text-gray-300 text-[10px] mt-5">
            Ki Mel Sorveteria · (81) 99603-8222
          </p>

        </div>
      </div>
    </>
  )
}

export default Pedido
