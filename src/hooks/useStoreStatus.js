// [h, m] = hora e minuto
const SCHEDULE = {
  0: { open: [14, 0],  close: [22, 45] }, // Domingo
  1: { open: [8,  30], close: [22, 30] }, // Segunda
  2: null,                                 // Terça — FECHADO
  3: { open: [8,  30], close: [22, 30] }, // Quarta
  4: { open: [8,  30], close: [22, 30] }, // Quinta
  5: { open: [8,  30], close: [22, 30] }, // Sexta
  6: { open: [8,  30], close: [18,  0] }, // Sábado
}

export const useStoreStatus = () => {
  const now     = new Date()
  const day     = now.getDay()
  const current = now.getHours() * 60 + now.getMinutes()

  if (!SCHEDULE[day]) {
    return {
      isOpen: false,
      type: "closed-today",
      message: "Fechamos às terças-feiras. Nos vemos na quarta! 👋",
    }
  }

  const { open, close } = SCHEDULE[day]
  const openMin  = open[0]  * 60 + open[1]
  const closeMin = close[0] * 60 + close[1]
  const fmt = ([h, m]) => `${String(h).padStart(2,"0")}h${m ? String(m).padStart(2,"0") : ""}`

  if (current < openMin) {
    return {
      isOpen: false,
      type: "before-hours",
      message: `Ainda não abrimos. Hoje abrimos às ${fmt(open)}. ⏰`,
    }
  }

  if (current >= closeMin) {
    return {
      isOpen: false,
      type: "after-hours",
      message: `Encerramos por hoje às ${fmt(close)}. Até amanhã! 👋`,
    }
  }

  return { isOpen: true, type: "open", message: null }
}
