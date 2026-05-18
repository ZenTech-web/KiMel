import { Link } from "react-router-dom"

const NotFound = () => {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-8"
        style={{
          background: "radial-gradient(ellipse at top, #FFD6E7 0%, #FFF0F8 50%, #FFF8E8 100%)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <span className="animate-float inline-block" style={{ fontSize: 72 }}>🍦</span>

        <h1
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 96,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          <span style={{ color: "#FF4E8C" }}>4</span>
          <span style={{ color: "#2D1B4E" }}>0</span>
          <span style={{ color: "#FF4E8C" }}>4</span>
        </h1>

        <p
          style={{
            color: "#FF85B3",
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
            background: "linear-gradient(90deg, #FF4E8C, #FFD600)",
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
              background: "linear-gradient(135deg, #FF4E8C 0%, #C23277 100%)",
              boxShadow: "0 8px 32px rgba(255,78,140,0.35)",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Fredoka One', cursive",
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