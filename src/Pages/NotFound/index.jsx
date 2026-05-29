import { Link } from "react-router-dom"

const NotFound = () => {
    return (
      <div className="bgAcai min-h-screen flex flex-col items-center justify-center px-8 font-nunito">
        <span className="animate-float inline-block" style={{ fontSize: 72 }}>🍦</span>

        <h1 style={{ fontFamily: "var(--font-fredoka)", fontSize: 96, lineHeight: 1, marginTop: 8 }}>
          <span style={{ color: "var(--color-pink)" }}>4</span>
          <span style={{ color: "var(--color-dark)" }}>0</span>
          <span style={{ color: "var(--color-pink)" }}>4</span>
        </h1>

        <p
          style={{
            color: "var(--color-pink-light)",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Página não encontrada
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

        <p style={{ color: "#AAA", fontSize: 15, fontWeight: 600, marginBottom: 32 }}>
          Ops! Esse sabor não existe no cardápio 😅
        </p>

        <Link to="/">
          <button
            className="flex items-center gap-3 px-8 py-4 rounded-2xl transition-transform active:scale-95 hover:-translate-y-1"
            style={{
              background: "var(--background-image-gradient-btn-acai)",
              boxShadow: "0 8px 32px rgba(255,78,140,0.35)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-fredoka)",
              fontSize: 20,
              color: "#fff",
            }}
          >
            <span style={{ fontSize: 24 }}>🏠</span>
            Voltar ao início
          </button>
        </Link>
      </div>
    )
}

export default NotFound
