import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha]     = useState("")
  const [erro, setErro]       = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setLoading(true)

    try {
      const res  = await fetch("https://back-endkimel.onrender.com/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ usuario, senha }),
      })

      const data = await res.json()

      if (data.autenticado) {
        sessionStorage.setItem("token_de_acesso", data.token_de_acesso)
        navigate("/dashboard")
      } else {
        setErro(data.mensagem || "Usuário ou senha incorretos.")
      }
    } catch {
      setErro("Erro ao conectar com o servidor. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 font-nunito">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-fredoka text-5xl">
            <span className="text-pink">Ki</span>{" "}
            <span className="text-white">Mel</span>
          </h1>
          <p className="text-white/50 text-[12px] uppercase tracking-widest font-bold mt-1">
            Área administrativa
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4"
        >
          <div>
            <label className="text-white/70 text-[12px] font-bold block mb-1.5">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
              className="w-full bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-[13px] border border-white/10 focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          <div>
            <label className="text-white/70 text-[12px] font-bold block mb-1.5">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              className="w-full bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-[13px] border border-white/10 focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          {erro && (
            <p className="text-red-400 text-[12px] font-medium text-center bg-red-400/10 rounded-xl px-3 py-2">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl font-black text-[15px] transition-all duration-200 mt-1 ${
              loading
                ? "bg-white/20 text-white/40 cursor-not-allowed"
                : "bg-orange text-white hover:opacity-90 active:scale-95 cursor-pointer"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login
