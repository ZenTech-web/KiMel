const Footer = () => {
    return (
      <footer className="bg-gradient-banner py-2.5">
        <h3 className="text-white text-center font-nunito">Ki <span className="text-yellow-dark">Mel</span></h3>
        <ul className="text-center text-white text-[11px]">
          <li>(81) 99609-9373</li>
          <li>Segunda, 9:00h às 22:30h</li>
          <li>Quarta a sexta, 9:00h às 22:30h</li>
          <li>Sábado, 9:00h às 18:00h</li>
          <li>Domingo, 14:00h às 22:45h</li>
          <li>© 2026 <a className="inline-block font-nunito font-bold cursor-pointer after:content-[''] after:block after:h-0.5 after:bg-yellow-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full" href="https://zentechbr.com.br/">ZEN<span className="font-black">TECH</span></a></li>
        </ul>
      </footer>
    )
}

export default Footer