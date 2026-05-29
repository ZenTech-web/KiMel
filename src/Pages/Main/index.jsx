import { Link } from "react-router-dom"
import StoreBanner from "../../Components/StoreBanner"
import { useStoreStatus } from "../../hooks/useStoreStatus"

const Main = () => {
  const { isOpen, message, type } = useStoreStatus()

    return (
     <>
     <main className="bgAcai min-h-screen flex flex-col items-center justify-center px-8 font-nunito">
      {!isOpen && <StoreBanner message={message} type={type} />}

      <div className="flex flex-col items-center mb-2">
        <span className="animate-float inline-block" style={{ fontSize: 64 }}>🍦</span>

        <h1
          style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: 48,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          <span style={{ color: "var(--color-pink)" }}>Ki</span>{" "}
          <span style={{ color: "var(--color-dark)" }}>Mel</span>
        </h1>

        <p
          style={{
            color: "var(--color-pink-light)",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Sorveteria
        </p>

        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 99,
            background: "var(--background-image-gradient-divider)",
            margin: "14px 0 10px",
          }}
        />

        <p style={{ color: "#AAA", fontSize: 15, fontWeight: 600 }}>
          O que você vai querer hoje? 😊
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full mt-8 items-center" style={{ maxWidth: 360 }}>

        <Link to="/Acaí">
        <button
          className="flex items-center gap-4 w-84 px-6 py-5 rounded-2xl text-left transition-transform active:scale-95 hover:-translate-y-1"
          style={{
            background: "var(--background-image-gradient-btn-acai)",
            boxShadow: "0 8px 32px rgba(255,78,140,0.35)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 40 }}>🍨</span>
          <div className="flex-1">
            <div style={{ fontFamily: "var(--font-fredoka)", fontSize: 22, color: "#fff", lineHeight: 1.1 }}>
              Monte seu Açaí
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginTop: 2 }}>
              Do tamanho ao sabor — do seu jeito!
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 22 }}>›</span>
        </button>
        </Link>

        <Link to="/Snack">
        <button
          className="flex items-center gap-4 w-84 py-5 px-6 rounded-2xl text-left transition-transform active:scale-95 hover:-translate-y-1"
          style={{
            background: "var(--background-image-gradient-btn-snack)",
            boxShadow: "0 8px 32px rgba(255,122,60,0.35)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 40 }}>🍔</span>
          <div className="flex-1">
            <div style={{ fontFamily: "var(--font-fredoka)", fontSize: 22, color: "#fff", lineHeight: 1.1 }}>
              Lanches
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginTop: 2 }}>
              Salgados, doces e muito mais!
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 22 }}>›</span>
        </button>
        </Link>
      </div>

    </main>
     </>
    )
}

export default Main
