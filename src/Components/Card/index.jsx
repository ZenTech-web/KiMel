const Card = ({fix, img, product, type, fixImg}) => {
    return (
     <section style={{'--c': fix}} className="w-full h-45 bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-(--c) hover:shadow-lg cursor-pointer">
        <div className="h-1.5 rounded-t-3xl" style={{background: fix}}>

        </div>
      
      <section className="flex flex-col items-center h-full justify-center">
        <div style={{background: fixImg}} className="h-16 w-16 rounded-2xl mb-2">
          {img}
        </div>
        <h3 className="text-[16px] font-fredoka font-bold lg:text-[20px]">
           {product}
        </h3>
        <p className="text-[10px] font-extralight lg:text-[14px]">
          {type}
        </p>
        </section>

     </section>
    )
}

export default Card