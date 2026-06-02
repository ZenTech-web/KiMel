import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  const handleSair = () => {
    sessionStorage.removeItem("token_de_acesso")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 font-nunito gap-6">
      <div className="text-center">
        <h1 className="font-fredoka text-5xl">
          <span className="text-pink">Ki</span>{" "}
          <span className="text-white">Mel</span>
        </h1>
        <p className="text-white/50 text-[12px] uppercase tracking-widest font-bold mt-1">
          Área administrativa
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-center">
        <p className="text-white text-[18px] font-bold">Bem-vindo, Administrador! 👋</p>
      </div>

      <button
        onClick={handleSair}
        className="px-8 py-3 bg-orange text-white font-black text-[15px] rounded-2xl hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        Sair
      </button>
    </div>
  )
}

export default Dashboard
