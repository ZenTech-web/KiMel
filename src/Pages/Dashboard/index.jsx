import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { resetScheduleCache } from "../../hooks/useStoreStatus"

const API = "https://back-endkimel.onrender.com"
const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

const toStr  = ([h, m]) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
const fromStr = (s)     => s.split(":").map(Number)

const apiToForm = (schedule) =>
  Array.from({ length: 7 }, (_, i) => {
    const d = schedule[i] ?? schedule[String(i)]
    return d
      ? { aberto: true,  open: toStr(d.open),  close: toStr(d.close) }
      : { aberto: false, open: "08:00", close: "22:00" }
  })

const formToApi = (dias) => {
  const schedule = {}
  dias.forEach((dia, i) => {
    schedule[i] = dia.aberto
      ? { open: fromStr(dia.open), close: fromStr(dia.close) }
      : null
  })
  return schedule
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [dias, setDias]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [feedback, setFeedback] = useState(null) // { ok: bool, msg: string }

  useEffect(() => {
    fetch(`${API}/horarios`)
      .then(r => r.json())
      .then(data => { setDias(apiToForm(data.schedule)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleToggle = (i) => {
    setDias(prev => prev.map((d, idx) => idx === i ? { ...d, aberto: !d.aberto } : d))
  }

  const handleTime = (i, campo, valor) => {
    setDias(prev => prev.map((d, idx) => idx === i ? { ...d, [campo]: valor } : d))
  }

  const handleSalvar = async () => {
    setSalvando(true)
    setFeedback(null)
    try {
      const token = sessionStorage.getItem("token_de_acesso")
      const res = await fetch(`${API}/horarios`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json", "token_de_acesso": token },
        body:    JSON.stringify({ schedule: formToApi(dias) }),
      })
      const data = await res.json()
      if (data.sucesso) {
        resetScheduleCache()
        setFeedback({ ok: true, msg: data.mensagem || "Horários salvos com sucesso!" })
      } else {
        setFeedback({ ok: false, msg: data.mensagem || "Erro ao salvar." })
      }
    } catch {
      setFeedback({ ok: false, msg: "Erro ao conectar com o servidor." })
    } finally {
      setSalvando(false)
    }
  }

  const handleSair = () => {
    sessionStorage.removeItem("token_de_acesso")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-dark font-nunito px-5 py-8">
      <div className="max-w-sm mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-fredoka text-3xl">
              <span className="text-pink">Ki</span>{" "}
              <span className="text-white">Mel</span>
            </h1>
            <p className="text-white/40 text-[11px] uppercase tracking-widest font-bold">Administrador</p>
          </div>
          <button
            onClick={handleSair}
            className="px-4 py-2 bg-white/10 text-white/70 text-[12px] font-bold rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>

        {/* Formulário de horários */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col gap-1">
          <p className="text-white font-bold text-[15px] mb-3">Horários de funcionamento</p>

          {loading && <p className="text-white/40 text-[13px] text-center py-4">Carregando...</p>}

          {!loading && dias && dias.map((dia, i) => (
            <div key={i} className={`flex flex-col gap-2 py-3 ${i < 6 ? "border-b border-white/10" : ""}`}>
              <div className="flex justify-between items-center">
                <span className={`text-[13px] font-bold ${dia.aberto ? "text-white" : "text-white/40"}`}>
                  {DIAS[i]}
                </span>
                <button
                  onClick={() => handleToggle(i)}
                  className={`w-11 h-6 rounded-full transition-all duration-200 relative cursor-pointer ${dia.aberto ? "bg-orange" : "bg-white/20"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${dia.aberto ? "left-6" : "left-1"}`} />
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <p className={`text-[10px] font-bold mb-1 ${dia.aberto ? "text-white/40" : "text-white/20"}`}>Abre</p>
                  <input
                    type="time"
                    value={dia.open}
                    disabled={!dia.aberto}
                    onChange={e => handleTime(i, "open", e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-[13px] border transition-colors ${dia.aberto ? "bg-white/10 text-white border-white/10 focus:outline-none focus:border-orange" : "bg-white/5 text-white/20 border-white/5 cursor-not-allowed"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className={`text-[10px] font-bold mb-1 ${dia.aberto ? "text-white/40" : "text-white/20"}`}>Fecha</p>
                  <input
                    type="time"
                    value={dia.close}
                    disabled={!dia.aberto}
                    onChange={e => handleTime(i, "close", e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-[13px] border transition-colors ${dia.aberto ? "bg-white/10 text-white border-white/10 focus:outline-none focus:border-orange" : "bg-white/5 text-white/20 border-white/5 cursor-not-allowed"}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview da planilha */}
        {!loading && dias && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <p className="text-white font-bold text-[15px] mb-3">Como vai ficar</p>
            <div className="flex flex-col gap-0">
              {/* cabeçalho */}
              <div className="grid grid-cols-3 text-white/40 text-[10px] font-bold uppercase tracking-wide pb-2 border-b border-white/10">
                <span>Dia</span>
                <span className="text-center">Abre</span>
                <span className="text-right">Fecha</span>
              </div>
              {dias.map((dia, i) => (
                <div key={i} className={`grid grid-cols-3 py-2 text-[12px] items-center ${i < 6 ? "border-b border-white/5" : ""}`}>
                  <span className={`font-bold truncate ${dia.aberto ? "text-white" : "text-white/30"}`}>
                    {DIAS[i].split("-")[0]}
                  </span>
                  {dia.aberto ? (
                    <>
                      <span className="text-center text-orange font-bold">{dia.open}</span>
                      <span className="text-right text-orange font-bold">{dia.close}</span>
                    </>
                  ) : (
                    <span className="col-span-2 text-center text-red-400 font-bold">Fechado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <p className={`text-[12px] font-bold text-center rounded-xl px-3 py-2.5 ${feedback.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {feedback.msg}
          </p>
        )}

        {/* Salvar */}
        {!loading && dias && (
          <button
            onClick={handleSalvar}
            disabled={salvando}
            className={`w-full py-3.5 rounded-2xl font-black text-[15px] transition-all duration-200 ${salvando ? "bg-white/20 text-white/40 cursor-not-allowed" : "bg-orange text-white hover:opacity-90 active:scale-95 cursor-pointer"}`}
          >
            {salvando ? "Salvando..." : "Salvar horários"}
          </button>
        )}

      </div>
    </div>
  )
}

export default Dashboard
