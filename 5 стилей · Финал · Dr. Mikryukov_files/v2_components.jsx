// ui_kits/client_carousels/v2_components.jsx
// V2 — по референсам: Manrope, pill-кнопки, чередующиеся фоны, большие окружности-декор

const V2_HANDLE = "@ВАШ_НИК";

// ───── ТОКЕНЫ ─────
const V2 = {
  bg: {
    dark:   "#0F0F0F",
    light:  "#F3F2EE",
    pink:   "#F5E9E4",
    orange: "#FF4E2B",
  },
  ink: {
    // text colors per bg
    dark:   { head: "#FFFFFF", body: "#8A8A8A", super: "#FF4E2B", counter: "#FFFFFF", counterBorder: "#3A3A3A", decor: "rgba(255,255,255,0.08)", next: "#FFFFFF", nextBorder:"#3A3A3A", rule:"#FF4E2B" },
    light:  { head: "#1A1A1A", body: "#6E6E6E", super: "#FF4E2B", counter: "#1A1A1A", counterBorder: "#D8D6D0", decor: "rgba(26,26,26,0.12)",  next: "#1A1A1A", nextBorder:"#D8D6D0", rule:"#FF4E2B" },
    pink:   { head: "#1A1A1A", body: "#6E6E6E", super: "#FF4E2B", counter: "#1A1A1A", counterBorder: "#E5D8D2", decor: "rgba(26,26,26,0.10)",  next: "#1A1A1A", nextBorder:"#E5D8D2", rule:"#FF4E2B" },
    orange: { head: "#FFFFFF", body: "#FFFFFF", super: "#1A1A1A", counter: "#FFFFFF", counterBorder: "rgba(255,255,255,0.4)", decor: "rgba(255,255,255,0.22)", next: "#FFFFFF", nextBorder:"rgba(255,255,255,0.4)", rule:null },
  },
};

const fontSans = '"Manrope", "Inter", system-ui, sans-serif';

// ───── SLIDE SHELL ─────
const V2Slide = ({ bg = "dark", n, total, children, hasRule = false, showNext = true, arrowLabel = "Дальше" }) => {
  const t = V2.ink[bg];
  const bgColor = V2.bg[bg];
  return (
    <div style={{
      position:"relative",
      width: 1080, height: 1350,
      background: bgColor,
      fontFamily: fontSans,
      overflow:"hidden",
    }}>
      {/* top hairline rule */}
      {hasRule && t.rule && (
        <div style={{position:"absolute", top:0, left:0, right:0, height:4, background:t.rule}}/>
      )}

      {/* DECOR — large outlined circles */}
      <svg style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}} viewBox="0 0 1080 1350" preserveAspectRatio="none">
        <circle cx="100" cy="200" r="220" fill="none" stroke={t.decor} strokeWidth="2"/>
        <circle cx="860" cy="180" r="130" fill="none" stroke={t.decor} strokeWidth="2"/>
        <circle cx="980" cy="1200" r="200" fill="none" stroke={t.decor} strokeWidth="2"/>
      </svg>

      {/* PAGE COUNTER (top-right pill) */}
      <div style={{
        position:"absolute", top:42, right:56,
        border:`1px solid ${t.counterBorder}`,
        color: t.counter,
        fontFamily: fontSans, fontWeight: 600, fontSize: 22,
        padding:"8px 20px", borderRadius: 999,
        letterSpacing:"0.06em",
      }}>{String(n).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>

      {/* NEXT pill (right-middle) */}
      {showNext && (
        <div style={{
          position:"absolute", right:56, top: "50%", transform:"translateY(-50%)",
          display:"flex", alignItems:"center", gap:14,
          border:`1px solid ${t.nextBorder}`,
          color: t.next,
          padding:"12px 12px 12px 22px", borderRadius: 999,
          fontFamily: fontSans, fontWeight: 700, fontSize: 18, letterSpacing:"0.16em",
          textTransform:"uppercase",
        }}>
          <span>{arrowLabel}</span>
          <span style={{
            width:36, height:36, borderRadius:999,
            border:`1px solid ${t.nextBorder}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, fontWeight:400, lineHeight:1,
          }}>›</span>
        </div>
      )}

      {/* CONTENT AREA */}
      <div style={{
        position:"absolute",
        left: 72, right: 72,
        top: 0, bottom: 0,
        display:"flex", flexDirection:"column",
        justifyContent:"center",
        paddingRight: 220, // space for right-side "next" pill
      }}>
        {children}
      </div>
    </div>
  );
};

// ───── TYPE BLOCKS ─────
const V2Super = ({ children, color = "#FF4E2B" }) => (
  <div style={{
    fontFamily: fontSans,
    fontWeight: 800, fontSize: 22,
    color, letterSpacing: "0.14em", textTransform: "uppercase",
    marginBottom: 28,
  }}>{children}</div>
);

const V2Headline = ({ children, color = "#1A1A1A", size = 84 }) => (
  <h1 style={{
    fontFamily: fontSans,
    fontWeight: 800,
    fontSize: size,
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
    color,
    margin: 0,
    textWrap: "balance",
  }}>{children}</h1>
);

const V2Body = ({ children, color = "#6E6E6E", size = 32 }) => (
  <p style={{
    fontFamily: fontSans,
    fontWeight: 500,
    fontSize: size,
    lineHeight: 1.4,
    color,
    margin: "32px 0 0",
    maxWidth: 640,
  }}>{children}</p>
);

// ───── CALLOUTS (pill style) ─────
// dark pill on light bg, orange pill on pink bg, white pill on dark bg (per references)
const V2Callout = ({ children, variant = "dark" }) => {
  // variants:
  //   dark   → #0F0F0F pill, white text (used on light bg)
  //   orange → #FF4E2B pill, white text (used on pink/light bg for emphasis)
  //   dark-inverse → white pill with dark text (if ever needed)
  const map = {
    dark:    { bg:"#0F0F0F", fg:"#FFFFFF" },
    orange:  { bg:"#FF4E2B", fg:"#FFFFFF" },
  };
  const c = map[variant] || map.dark;
  return (
    <div style={{
      display:"inline-block",
      background: c.bg, color: c.fg,
      fontFamily: fontSans, fontWeight: 700, fontSize: 24,
      lineHeight: 1.3,
      padding: "22px 36px",
      borderRadius: 999,
      marginTop: 48,
      maxWidth: 680,
    }}>{children}</div>
  );
};

// ───── CTA BUTTON ─────
const V2CtaButton = ({ children }) => (
  <div style={{
    display:"inline-block",
    background:"#FF4E2B", color:"#FFFFFF",
    fontFamily: fontSans, fontWeight: 700, fontSize: 30,
    padding:"26px 54px", borderRadius: 999,
    marginTop: 48,
    letterSpacing:"0.01em",
  }}>{children}</div>
);

// ───── DECORATIVE ROTATED SQUARE (used on pink slides per reference) ─────
const V2Square = ({ color = "#EAD9D2", x = 780, y = 110, size = 170, rot = 12 }) => (
  <div style={{
    position:"absolute", left:x, top:y,
    width:size, height:size, background:color,
    transform:`rotate(${rot}deg)`,
  }}/>
);

// ───── HANDLE (white-label) ─────
const V2Handle = ({ bg = "dark" }) => {
  const t = V2.ink[bg];
  return (
    <div style={{
      position:"absolute", left:72, bottom:56,
      fontFamily: fontSans, fontWeight: 600, fontSize: 20,
      color: t.body,
      letterSpacing:"0.04em",
      opacity: 0.7,
    }}>{V2_HANDLE}</div>
  );
};

// ───── SLIDE VARIANTS ─────

// COVER — dark bg, big headline
const V2Cover = ({ n=1, total=6, superlabel, headline, sub }) => (
  <V2Slide bg="dark" n={n} total={total} hasRule={true}>
    <V2Super>{superlabel}</V2Super>
    <V2Headline color="#FFFFFF" size={96}>{headline}</V2Headline>
    {sub && <V2Body color="#9A9A9A" size={30}>{sub}</V2Body>}
    <V2Handle bg="dark"/>
  </V2Slide>
);

// CONTENT (light) — #F3F2EE bg
const V2Content = ({ n, total, superlabel, headline, body, callout, calloutVariant = "dark", bg="light", hasRule=false, square=false }) => (
  <V2Slide bg={bg} n={n} total={total} hasRule={hasRule}>
    {square && bg === "pink" && <V2Square/>}
    <V2Super>{superlabel}</V2Super>
    <V2Headline color={V2.ink[bg].head} size={80}>{headline}</V2Headline>
    {body && <V2Body color={V2.ink[bg].body} size={30}>{body}</V2Body>}
    {callout && <V2Callout variant={calloutVariant}>{callout}</V2Callout>}
    <V2Handle bg={bg}/>
  </V2Slide>
);

// ORANGE emphasis — bg=#FF4E2B, white headline, no callout
const V2Orange = ({ n, total, superlabel, headline, body }) => (
  <V2Slide bg="orange" n={n} total={total}>
    <V2Super color="#1A1A1A">{superlabel}</V2Super>
    <V2Headline color="#FFFFFF" size={84}>{headline}</V2Headline>
    {body && <V2Body color="#FFFFFF" size={30}>{body}</V2Body>}
    <V2Handle bg="orange"/>
  </V2Slide>
);

// CTA — dark bg, orange button, no Next pill
const V2Cta = ({ n=6, total=6, superlabel = "Финал", headline, body, button = "Написать мастеру →" }) => (
  <V2Slide bg="dark" n={n} total={total} showNext={false} hasRule={true}>
    <V2Super>{superlabel}</V2Super>
    <V2Headline color="#FFFFFF" size={92}>{headline}</V2Headline>
    {body && <V2Body color="#9A9A9A" size={30}>{body}</V2Body>}
    <V2CtaButton>{button}</V2CtaButton>
    <V2Handle bg="dark"/>
    {/* decorative square bottom right */}
    <div style={{position:"absolute", right:120, bottom:110, width:160, height:160, background:"#3A1A10", transform:"rotate(8deg)"}}/>
  </V2Slide>
);

Object.assign(window, {
  V2Cover, V2Content, V2Orange, V2Cta,
  V2_HANDLE,
});
