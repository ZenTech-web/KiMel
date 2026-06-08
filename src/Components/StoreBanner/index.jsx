const StoreBanner = ({ message, type }) => {
  if (type === "open") {
    return (
      <div className="w-full px-4 py-2.5 flex items-center justify-center gap-2 bg-green-600 text-white text-[13px] font-nunito font-bold text-center">
        <span>🟢</span> Abertos agora · {message}
      </div>
    )
  }

  const isClosedToday = type === "closed-today"
  return (
    <div className={`w-full px-4 py-3 flex items-center justify-center gap-2 text-white text-[13px] font-nunito font-bold text-center ${isClosedToday ? "bg-red-600" : "bg-orange"}`}>
      <span>{isClosedToday ? "🔴" : "🟠"}</span>
      {message}
    </div>
  )
}

export default StoreBanner
