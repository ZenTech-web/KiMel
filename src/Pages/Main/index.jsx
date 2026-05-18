import { Link } from "react-router-dom"

const Main = ({ onNavigate }) => {
    return (
     <>
     <main className="bgAcai h-screen">
        <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{
        background: "radial-gradient(ellipse at top, #FFD6E7 0%, #FFF0F8 50%, #FFF8E8 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div className="flex flex-col items-center mb-2">
        <span className="animate-float inline-block" style={{ fontSize: 64 }}>🍦</span>

        <h1
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 48,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          <span style={{ color: "#FF4E8C" }}>Ki</span>{" "}
          <span style={{ color: "#2D1B4E" }}>Mel</span>
        </h1>

        <p
          style={{
            color: "#FF85B3",
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
            background: "linear-gradient(90deg, #FF4E8C, #FFD600)",
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
          onClick={() => onNavigate?.("acai")}
          className="flex items-center gap-4 w-84 px-6 py-5 rounded-2xl text-left transition-transform active:scale-95 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #FF4E8C 0%, #C23277 100%)",
            boxShadow: "0 8px 32px rgba(255,78,140,0.35)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 40 }}>🍨</span>
          <div className="flex-1">
            <div
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: 22,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
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
          onClick={() => onNavigate?.("lanches")}
          className="flex items-center gap-4 w-84 py-5 px-6 rounded-2xl text-left transition-transform active:scale-95 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #FF7A3C 0%, #C94500 100%)",
            boxShadow: "0 8px 32px rgba(255,122,60,0.35)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 40 }}>🍔</span>
          <div className="flex-1">
            <div
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: 22,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
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
      
    </div>
     </main>
     </>
    )
}

export default Main