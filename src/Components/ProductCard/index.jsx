const ProductCard = ({ icon, img, name, obs, price, onAdd }) => {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
        <div className="w-full h-36 flex items-center justify-center p-3 bg-gray-100">
          {img
            ? <img src={img} alt={name} className="h-full w-full object-contain" />
            : <span className="text-7xl">{icon}</span>
          }
        </div>
        <div className="bg-white px-3 pt-3 pb-4 flex flex-col gap-2 flex-1">
          <div>
            <p className="font-bold font-nunito text-dark text-[14px] leading-tight">
              {name}{obs ? ` - ${obs}` : ""}
            </p>
            <p className="text-orange font-bold text-[13px] mt-0.5">
              R$ {price.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <button
            onClick={() => onAdd({ name, obs, price, icon, img })}
            className="w-full bg-dark text-white text-[11px] font-bold py-2.5 rounded-xl cursor-pointer hover:opacity-80 transition-opacity mt-auto"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    )
}

export default ProductCard
