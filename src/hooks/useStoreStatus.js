import { useState, useEffect } from "react"

const API = "https://back-endkimel.onrender.com"

const FALLBACK = {
  0: { open: [14, 0],  close: [22, 30] },
  1: { open: [8,  30], close: [22, 30] },
  2: null,
  3: { open: [8,  30], close: [22, 30] },
  4: { open: [8,  30], close: [22, 30] },
  5: null,
  6: { open: [9,   0], close: [22, 30] },
}

let _cache = null
let _promise = null

const fetchSchedule = () => {
  if (_cache) return Promise.resolve(_cache)
  if (!_promise) {
    _promise = fetch(`${API}/horarios`)
      .then(r => r.json())
      .then(data => { _cache = data.schedule; _promise = null; return _cache })
      .catch(() => { _cache = FALLBACK; _promise = null; return _cache })
  }
  return _promise
}

export const resetScheduleCache = () => { _cache = null }

export const useStoreStatus = () => {
  const [schedule, setSchedule] = useState(_cache)

  useEffect(() => {
    if (_cache) { setSchedule(_cache); return }
    fetchSchedule().then(setSchedule)
  }, [])

  if (!schedule) return { isOpen: false, type: "loading", message: null }

  const now     = new Date()
  const day     = now.getDay()
  const current = now.getHours() * 60 + now.getMinutes()
  const slot    = schedule[day] ?? schedule[String(day)]

  if (!slot) {
    return { isOpen: false, type: "closed-today", message: "Fechados hoje. Até amanhã! 👋" }
  }

  const { open, close } = slot
  const openMin  = open[0]  * 60 + open[1]
  const closeMin = close[0] * 60 + close[1]
  const fmt = ([h, m]) => `${String(h).padStart(2, "0")}h${m ? String(m).padStart(2, "0") : ""}`

  if (current < openMin)  return { isOpen: false, type: "before-hours", message: `Ainda não abrimos. Hoje abrimos às ${fmt(open)}. ⏰` }
  if (current >= closeMin) return { isOpen: false, type: "after-hours",  message: `Encerramos por hoje às ${fmt(close)}. Até amanhã! 👋` }

  return { isOpen: true, type: "open", message: null }
}
