import { useState } from "react"

const Chip = ({ label, selected, disabled, onClick, accent }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors cursor-pointer
            ${selected
                ? accent
                    ? "bg-orange text-white border-orange"
                    : "bg-dark text-white border-dark"
                : disabled
                    ? "bg-white text-gray-300 border-gray-200 cursor-not-allowed"
                    : accent
                        ? "bg-white text-orange border-orange hover:bg-orange/10"
                        : "bg-white text-dark border-gray-300 hover:border-dark"
            }`}
    >
        {label}
    </button>
)

const ProductModal = ({ product, onClose, onAdd }) => {
    const [quantity, setQuantity] = useState(1)
    const [notes, setNotes] = useState("")
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedSabores, setSelectedSabores] = useState([])
    const [selectedAdicionais, setSelectedAdicionais] = useState([])

    const hasSabores = product.saboresSalgados || product.saboresDoces || product.sabores

    const handleSaborToggle = (sabor) => {
        if (selectedSabores.includes(sabor)) {
            setSelectedSabores(prev => prev.filter(s => s !== sabor))
        } else if (selectedSabores.length < product.maxSabores) {
            setSelectedSabores(prev => [...prev, sabor])
        }
    }

    const handleAdicionalToggle = (nome) => {
        setSelectedAdicionais(prev =>
            prev.includes(nome) ? prev.filter(a => a !== nome) : [...prev, nome]
        )
    }

    const especialSelecionado = product.saboresEspeciais?.find(e => selectedSabores.includes(e.nome))
    const basePrice = especialSelecionado
        ? Math.max(product.price, especialSelecionado.preco)
        : product.price
    const adicionaisTotal = selectedAdicionais.reduce((sum, nome) => {
        return sum + (product.adicionais?.find(a => a.nome === nome)?.preco ?? 0)
    }, 0)
    const effectivePrice = basePrice + adicionaisTotal
    const total = (effectivePrice * quantity).toFixed(2).replace(".", ",")

    const spotsLeft = hasSabores ? product.maxSabores - selectedSabores.length : 0

    const canAdd =
        (!product.opcoes || selectedOption) &&
        (!hasSabores || selectedSabores.length > 0)

    const handleAdd = () => {
        if (!canAdd) return
        let name = product.name
        if (product.opcoes && selectedOption) name = `${product.name} - ${selectedOption}`
        if (hasSabores && selectedSabores.length > 0) name = `${product.name} (${selectedSabores.join(", ")})`
        const extras = selectedAdicionais.length > 0 ? ` + ${selectedAdicionais.join(", ")}` : ""
        onAdd({ ...product, name: name + extras, price: effectivePrice, quantity, notes })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
            <div onClick={onClose} className="absolute inset-0 bg-black/50" />

            <div className="relative bg-white w-full md:max-w-md md:mx-4 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">

                {/* header */}
                <div className="bg-gradient-banner px-5 py-4 flex justify-between items-center shrink-0">
                    <h2 className="text-white font-black font-nunito text-[16px] pr-4">
                        {product.name}{product.obs ? ` - ${product.obs}` : ""}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white text-xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center bg-white/20 rounded-full shrink-0"
                    >
                        ✕
                    </button>
                </div>

                {/* body */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1">

                    {/* produto info */}
                    <div className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                            {product.img
                                ? <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                                : <span className="text-4xl">{product.icon}</span>
                            }
                        </div>
                        <div className="flex flex-col gap-0.5 pt-1">
                            <p className="font-bold font-nunito text-dark text-[15px] leading-tight">{product.name}</p>
                            {product.obs && <p className="text-gray-400 text-[13px]">{product.obs}</p>}
                            <p className="text-teal font-bold text-[16px] mt-1">
                                R$ {effectivePrice.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    </div>

                    {/* descrição */}
                    {product.descricao && (
                        <p className="text-gray-500 text-[13px] leading-relaxed">{product.descricao}</p>
                    )}

                    {/* opções simples (sobremesas) */}
                    {product.opcoes && (
                        <div>
                            <p className="font-bold font-nunito text-dark text-[14px] mb-2">Escolha uma opção</p>
                            <div className="flex flex-wrap gap-2">
                                {product.opcoes.map(op => (
                                    <Chip
                                        key={op}
                                        label={op}
                                        selected={selectedOption === op}
                                        onClick={() => setSelectedOption(op)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* sabores tapioca (salgados + doces) */}
                    {(product.saboresSalgados || product.saboresDoces) && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <p className="font-bold font-nunito text-dark text-[14px]">Sabores</p>
                                <span className="text-[11px] text-gray-400 font-semibold">
                                    {selectedSabores.length}/{product.maxSabores}{spotsLeft > 0 ? ` — falta${spotsLeft > 1 ? "m" : ""} ${spotsLeft}` : ""}
                                </span>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mb-1.5">Salgados</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.saboresSalgados?.map(s => (
                                        <Chip key={s} label={s} selected={selectedSabores.includes(s)} disabled={!selectedSabores.includes(s) && spotsLeft === 0} onClick={() => handleSaborToggle(s)} />
                                    ))}
                                    {product.saboresEspeciais?.map(e => (
                                        <Chip key={e.nome} label={`${e.nome} · R$ ${e.preco.toFixed(2).replace(".", ",")}`} accent selected={selectedSabores.includes(e.nome)} disabled={!selectedSabores.includes(e.nome) && spotsLeft === 0} onClick={() => handleSaborToggle(e.nome)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mb-1.5">Doces</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.saboresDoces?.map(s => (
                                        <Chip key={s} label={s} selected={selectedSabores.includes(s)} disabled={!selectedSabores.includes(s) && spotsLeft === 0} onClick={() => handleSaborToggle(s)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* sabores cuscuz (grupo único) */}
                    {product.sabores && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <p className="font-bold font-nunito text-dark text-[14px]">Sabores</p>
                                <span className="text-[11px] text-gray-400 font-semibold">
                                    {selectedSabores.length}/{product.maxSabores}{spotsLeft > 0 ? ` — falta${spotsLeft > 1 ? "m" : ""} ${spotsLeft}` : ""}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.sabores.map(s => (
                                    <Chip key={s} label={s} selected={selectedSabores.includes(s)} disabled={!selectedSabores.includes(s) && spotsLeft === 0} onClick={() => handleSaborToggle(s)} />
                                ))}
                                {product.saboresEspeciais?.map(e => (
                                    <Chip key={e.nome} label={`${e.nome} · R$ ${e.preco.toFixed(2).replace(".", ",")}`} accent selected={selectedSabores.includes(e.nome)} disabled={!selectedSabores.includes(e.nome) && spotsLeft === 0} onClick={() => handleSaborToggle(e.nome)} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* adicionais */}
                    {product.adicionais?.length > 0 && (
                        <div>
                            <p className="font-bold font-nunito text-dark text-[14px] mb-2">Adicionais</p>
                            <div className="flex flex-wrap gap-2">
                                {product.adicionais.map(a => (
                                    <Chip
                                        key={a.nome}
                                        label={`${a.nome} +R$ ${a.preco.toFixed(2).replace(".", ",")}`}
                                        selected={selectedAdicionais.includes(a.nome)}
                                        onClick={() => handleAdicionalToggle(a.nome)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* observações */}
                    <div>
                        <p className="font-bold font-nunito text-dark text-[14px] mb-2">Observações</p>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Ex: Algo que você queria tirar do lanche..."
                            className="w-full rounded-xl bg-cream p-3 text-[13px] resize-none h-20 outline-none text-dark placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* footer */}
                <div className="px-5 pb-6 pt-3 flex items-center gap-3 shrink-0 border-t border-gray-100">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-dark font-bold text-lg w-5 flex justify-center cursor-pointer select-none">−</button>
                        <span className="font-bold text-dark text-[14px] w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="text-dark font-bold text-lg w-5 flex justify-center cursor-pointer select-none">+</button>
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={!canAdd}
                        className="flex-1 bg-gradient-banner text-white font-bold text-[13px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Adicionar · R$ {total}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductModal
