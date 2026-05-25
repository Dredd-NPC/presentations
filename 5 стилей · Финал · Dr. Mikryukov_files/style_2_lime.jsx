// style_2_lime.jsx — «Mono Lime» (ref: lottie.files)
// Один монохромный фон #C9E81F, чёрный текст, минимализм, без декора.
// Pill-счётчик. Ручка снизу-справа. Маленькая монограмма снизу-слева.

const S2 = {
  bg: "#C9E81F",
  ink: "#0A0A0A",
  counterBg: "#4A5A12",
  counterFg: "#FFFFFF",
};

const S2_HANDLE = "@ВАШ_НИК";
const s2font = '"Inter", "Manrope", system-ui, sans-serif';

const S2Slide = ({ n, total, children, hideCounter = false }) => (
  <div style={{
    position:"relative", width:1080, height:1350,
    background: S2.bg, fontFamily: s2font, overflow:"hidden",
    display:"flex", alignItems:"center", justifyContent:"center",
  }}>
    {/* counter pill top-right */}
    {!hideCounter && (
      <div style={{
        position:"absolute", top:48, right:48,
        background: S2.counterBg, color: S2.counterFg,
        padding:"10px 22px", borderRadius:999,
        fontFamily: s2font, fontWeight:600, fontSize:22,
      }}>{n}/{total}</div>
    )}

    {children}

    {/* monogram bottom-left */}
    <div style={{
      position:"absolute", left:48, bottom:48,
      width:60, height:60, borderRadius:12, background: S2.ink,
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <path d="M2 14 Q 8 2, 16 10 T 30 6" stroke={S2.bg} strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>
    </div>

    {/* handle bottom-right */}
    <div style={{
      position:"absolute", right:48, bottom:60,
      fontFamily: s2font, fontWeight:600, fontSize:28, color: S2.ink,
    }}>{S2_HANDLE}</div>
  </div>
);

// Huge type cover: ~mixed sizes, 2 lines
const S2Cover = ({ n=1, total=6, small, bigLines }) => (
  <S2Slide n={n} total={total}>
    <div style={{textAlign:"center", padding:"0 80px"}}>
      {small && (
        <div style={{
          fontFamily: s2font, fontWeight: 500,
          fontSize: 64, color: S2.ink, lineHeight: 1.0,
          marginBottom: 12,
        }}>{small}</div>
      )}
      {bigLines.map((l, i) => (
        <div key={i} style={{
          fontFamily: s2font, fontWeight: 800,
          fontSize: 150, color: S2.ink, lineHeight: 1.0,
          letterSpacing: "-0.03em", textTransform:"uppercase",
          marginTop: i === 0 ? 0 : 8,
        }}>{l}</div>
      ))}
    </div>
  </S2Slide>
);

// Content — big bold, left-aligned, generous margin
const S2Content = ({ n, total, kicker, big, body }) => (
  <S2Slide n={n} total={total}>
    <div style={{padding:"0 96px", width:"100%"}}>
      {kicker && (
        <div style={{
          fontFamily: s2font, fontWeight: 700, fontSize: 28,
          color: S2.ink, letterSpacing: "0.14em", textTransform:"uppercase",
          marginBottom: 32, opacity: 0.7,
        }}>{kicker}</div>
      )}
      <div style={{
        fontFamily: s2font, fontWeight: 800,
        fontSize: 120, lineHeight: 0.95,
        letterSpacing: "-0.03em", color: S2.ink,
        textTransform:"uppercase",
        marginBottom: 40, textWrap:"balance",
      }}>{big}</div>
      {body && (
        <div style={{
          fontFamily: s2font, fontWeight: 500,
          fontSize: 40, lineHeight: 1.3, color: S2.ink,
          maxWidth: 760,
        }}>{body}</div>
      )}
    </div>
  </S2Slide>
);

// Quote slide — centered medium, for callout-like
const S2Quote = ({ n, total, quote }) => (
  <S2Slide n={n} total={total}>
    <div style={{textAlign:"center", padding:"0 140px"}}>
      <div style={{
        fontFamily: s2font, fontWeight: 700,
        fontSize: 80, lineHeight: 1.05,
        letterSpacing: "-0.02em", color: S2.ink,
        textWrap:"balance",
      }}>&ldquo;{quote}&rdquo;</div>
    </div>
  </S2Slide>
);

// "Save this for later!" style — icon + mid text, centered
const S2Save = ({ n, total, icon = "bookmark", text }) => (
  <S2Slide n={n} total={total}>
    <div style={{display:"flex", alignItems:"center", gap:28}}>
      {icon === "bookmark" && (
        <svg width="72" height="86" viewBox="0 0 72 86" fill="none">
          <path d="M6 4 H 66 V 82 L 36 62 L 6 82 Z" stroke={S2.ink} strokeWidth="8" strokeLinejoin="round" fill="none"/>
        </svg>
      )}
      {icon === "heart" && (
        <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
          <path d="M40 66 L 10 38 A 16 16 0 0 1 40 16 A 16 16 0 0 1 70 38 Z" stroke={S2.ink} strokeWidth="8" strokeLinejoin="round" fill="none"/>
        </svg>
      )}
      <div style={{
        fontFamily: s2font, fontWeight: 700,
        fontSize: 72, letterSpacing:"-0.02em", color: S2.ink,
      }}>{text}</div>
    </div>
  </S2Slide>
);

// CTA slide — big centered text + button-like element
const S2Cta = ({ n, total, big, body, button }) => (
  <S2Slide n={n} total={total}>
    <div style={{textAlign:"center", padding:"0 100px"}}>
      <div style={{
        fontFamily: s2font, fontWeight: 800,
        fontSize: 110, lineHeight: 0.98, color: S2.ink,
        letterSpacing:"-0.03em", marginBottom: 40,
        textTransform:"uppercase", textWrap:"balance",
      }}>{big}</div>
      {body && <div style={{
        fontFamily: s2font, fontWeight: 500, fontSize: 36,
        color: S2.ink, opacity:0.75, maxWidth: 720, margin:"0 auto 48px",
        lineHeight: 1.35,
      }}>{body}</div>}
      <div style={{
        display:"inline-block",
        background: S2.ink, color: S2.bg,
        fontFamily: s2font, fontWeight: 700, fontSize: 36,
        padding:"28px 56px", borderRadius: 999,
      }}>{button}</div>
    </div>
  </S2Slide>
);

Object.assign(window, { S2Cover, S2Content, S2Quote, S2Save, S2Cta });
