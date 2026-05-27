const SectionTitle = ({ emoji, title }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-[18px] font-bold font-nunito">{emoji} {title}</p>
      <div className="bg-gradient-section-line h-0.5 w-50"></div>
    </div>
  )
}

export default SectionTitle
