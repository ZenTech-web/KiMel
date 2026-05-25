import Card from "../../Components/Card"
import Header from "../../Components/Header"

const Snack = () => {
    return (
      <>
      <Header/>

      <main className="bg-cream ">

      <section className="max-w-[1024px] mx-auto py-5 bg-gradient-banner">

         <h1 className="text-center text-white text-2xl font-black">Ki <span className="text-yellow-dark">Mel</span> Sorveteria</h1>
         <p className="text-center text-white text-[12px]">Escolha sua categoria favorita &#x1F924;</p> 
      </section>

      <section className="max-w-5xl mx-auto py-5 px-5 grid grid-cols-2 gap-4 justify-items-center">
        <Card
        fix="#FFB500"
        fixImg="#FFF8F0"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍟</span>}
        product="Batatinhas"
        type="Crocantes e deliciosas"
        />
        <Card
        fix="#FF4E8C"
        fixImg="#FFE5EF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍓</span>}
        product="Salada de Frutas"
        type="Frescas todo dia"
        />
        <Card
        fix="#00C8B0"
        fixImg="#E0FAF7"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍦</span>}
        product="Sorvetes"
        type="Vários sabores"
        />
        <Card
        fix="#FF7A3C"
        fixImg="#FFE8DC"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍔</span>}
        product="Hambúrguer"
        type="Artesanais"
        />
        <Card
        fix="#A855F7"
        fixImg="#F3E8FF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🫔</span>}
        product="Cuscuz Recheado"
        type="Feito na hora"
        />
        <Card
        fix="#3B82F6"
        fixImg="#EFF6FF"
        img={<span className="text-4xl mx-auto my-3 block text-center">🫓</span>}
        product="Tapioca"
        type="Doce ou salgada"
        />
        <Card
        fix="#EC4899"
        fixImg="#FDF2F8"
        img={<span className="text-4xl mx-auto my-3 block text-center">🍭</span>}
        product="Sobremesa"
        type="Para adoçar o dia"
        />
        <Card
        fix="#10B981"
        fixImg="#ECFDF5"
        img={<span className="text-4xl mx-auto my-3 block text-center">🥤</span>}
        product="Bebidas"
        type="Geladas e saborosas"
        />
      </section>

      </main>
      </>
    )
}

export default Snack