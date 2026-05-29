const StoreBanner = ({ message, type }) => {
  const isClosedToday = type === "closed-today"

  return (
    <div className={`w-full px-4 py-3 flex items-center justify-center gap-2 text-white text-[13px] font-nunito font-bold text-center ${isClosedToday ? "bg-red-600" : "bg-orange"}`}>
      <span>{isClosedToday ? "🔴" : "🟠"}</span>
      {message}
    </div>
  )
}

export default StoreBanner
