// style_3_yellow_bold.jsx — «Yellow Bold» (ref: godswill)
// Жёлтый #FFD60A + чёрный #0A0A0A. Bold sans (Manrope 800). Strikethrough.
// Footer @handle + год. Лого-монограмма верхний-левый, стрелка верхний-правый.

const S3 = {
  yellow: "#FFD60A",
  black: "#0A0A0A",
  inkOnYellow: "#0A0A0A",
  inkOnBlack: "#FFFFFF",
  accentOnBlack: "#FFD60A",
  subMuted: "#6E6E6E",
};

const S3_HANDLE = "@ВАШ_НИК";
const S3_YEAR = "2026";
const s3font = '"Manrope", "Inter", system-ui, sans-serif';

const S3Slide = ({ bg = "yellow", children, showArrow = true, handleTop = false, hideFooter=false }) => {
  const bgColor = bg === "yellow" ? S3.yellow : S3.black;
  const fg = bg === "yellow" ? S3.inkOnYellow : S3.inkOnBlack;
  const muted = bg === "yellow" ? "rgba(10,10,10,0.6)" : "rgba(255,255,255,0.35)";
  return (
    <div style={{
      position:"relative", width:1080, height:1350,
      background: bgColor, fontFamily: s3font, overflow:"hidden",
    }}>
      {/* top-left logo monogram */}
      <div style={{position:"absolute", top:48, left:48}}>
        {handleTop ? (
          <div style={{display:"flex", alignItems:"center", gap:14}}>
            <div style={{width:48, height:48, background: bg==="yellow"?S3.black:S3.yellow, color: bg==="yellow"?S3.yellow:S3.black, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:s3font, fontWeight:900, fontSize:28, borderRadius:4}}>М</div>
            <div style={{fontFamily: s3font, fontWeight:800, fontSize:20, color: fg, lineHeight:1.05}}>
              MIKRYUKOV<br/>DESIGN
            </div>
          </div>
        ) : (
          <div style={{width:56, height:56, background: bg==="yellow"?S3.black:S3.yellow, color: bg==="yellow"?S3.yellow:S3.black, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:s3font, fontWeight:900, fontSize:32, borderRadius:4}}>М</div>
        )}
      </div>

      {/* top-right arrow / meta */}
      <div style={{position:"absolute", top:56, right:56, textAlign:"right"}}>
        {handleTop ? (
          <div style={{fontFamily: s3font, fontWeight:600, fontSize:18, color: muted, lineHeight:1.5, letterSpacing:"0.04em"}}>
            <div>{S3_YEAR}</div>
            <div>{S3_HANDLE}</div>
          </div>
        ) : showArrow && (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20 H 30 M 22 12 L 30 20 L 22 28" stroke={fg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {children}

      {/* footer line */}
      {!hideFooter && (
        <div style={{position:"absolute", left:0, right:0, bottom:0, borderTop:`1px solid ${muted}`, padding:"28px 56px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontFamily: s3font, fontWeight:700, fontSize:18, color: muted, letterSpacing:"0.08em"}}>{S3_HANDLE.toUpperCase()}</div>
          <div style={{fontFamily: s3font, fontWeight:700, fontSize:18, color: muted, letterSpacing:"0.08em"}}>{S3_YEAR}</div>
        </div>
      )}
    </div>
  );
};

// Cover — huge bold headline with strikethrough on part
const S3Cover = ({ headline, strikeWords = [] }) => (
  <S3Slide bg="yellow">
    <div style={{position:"absolute", left:56, right:56, top:"50%", transform:"translateY(-50%)"}}>
      <div style={{
        fontFamily: s3font, fontWeight: 800, fontSize: 124,
        lineHeight: 1.02, color: S3.black, letterSpacing:"-0.025em",
        textWrap:"balance",
      }}>
        {headline.split(" ").map((w, i) => {
          const struck = strikeWords.includes(w.replace(/[.,!?—]/g, ""));
          return (
            <span key={i} style={{textDecoration: struck ? "line-through" : "none", textDecorationThickness: struck ? "6px" : undefined}}>{w}{i<headline.split(" ").length-1?" ":""}</span>
          );
        })}
      </div>
    </div>
  </S3Slide>
);

// Black-bg content: white text + yellow accent tail
const S3Dark = ({ body, accent }) => (
  <S3Slide bg="black">
    <div style={{position:"absolute", left:56, right:80, top:"50%", transform:"translateY(-50%)"}}>
      <div style={{
        fontFamily: s3font, fontWeight: 600, fontSize: 54,
        lineHeight: 1.25, color: S3.inkOnBlack, letterSpacing:"-0.01em",
        marginBottom: 48, textWrap:"balance",
      }}>{body}</div>
      {accent && (
        <div style={{
          fontFamily: s3font, fontWeight: 800, fontSize: 56,
          lineHeight: 1.15, color: S3.accentOnBlack, letterSpacing:"-0.01em",
          textWrap:"balance",
        }}>{accent}</div>
      )}
    </div>
  </S3Slide>
);

// Yellow content — bold headline + body with optional photo slot (placeholder silhouette)
const S3Content = ({ headline, body, photo = false }) => (
  <S3Slide bg="yellow" handleTop={photo}>
    <div style={{position:"absolute", left:56, right: photo ? 500 : 80, top: 200}}>
      <div style={{
        fontFamily: s3font, fontWeight: 800, fontSize: 66,
        lineHeight: 1.1, color: S3.black, letterSpacing:"-0.02em",
        marginBottom: 40, textWrap:"balance",
      }}>{headline}</div>
      {body && (
        <div style={{
          fontFamily: s3font, fontWeight: 700, fontSize: 42,
          lineHeight: 1.25, color: S3.black, letterSpacing:"-0.01em",
          textWrap:"balance",
        }}>{body}</div>
      )}
    </div>

    {/* real doctor photo */}
    {photo && (
      <div style={{position:"absolute", right:-20, bottom:40, width:560, height:740, overflow:"hidden"}}>
        <img src="./assets/doctor_mikrukov.png" alt="Vitaliy Mikrukov"
          style={{width:"100%", height:"100%", objectFit:"contain", objectPosition:"bottom right", filter:"drop-shadow(0 10px 24px rgba(0,0,0,0.18))"}}/>

        {/* social icons bottom-left */}
        <div style={{position:"absolute", left:-460, bottom:20, display:"flex", flexDirection:"column", gap:14}}>
          {[["♡","LIKE"],["◯","COMMENT"],["▽","SHARE"],["⎘","SAVE"]].map(([icn, lbl],i)=>(
            <div key={i} style={{display:"flex", alignItems:"center", gap:14, fontFamily:s3font, fontWeight:700, fontSize:22, color:S3.black, letterSpacing:"0.1em"}}>
              <span style={{fontSize:28}}>{icn}</span>{lbl}
            </div>
          ))}
        </div>
      </div>
    )}
  </S3Slide>
);

// Stat slide — just huge numeric + label
const S3Stat = ({ number, label, bg = "yellow" }) => (
  <S3Slide bg={bg}>
    <div style={{position:"absolute", left:56, right:56, top:"50%", transform:"translateY(-50%)"}}>
      <div style={{
        fontFamily: s3font, fontWeight: 900, fontSize: 360,
        lineHeight: 0.85, color: bg==="yellow"?S3.black:S3.inkOnBlack,
        letterSpacing:"-0.05em",
      }}>{number}</div>
      <div style={{
        marginTop: 20,
        fontFamily: s3font, fontWeight: 800, fontSize: 54,
        lineHeight: 1.1, color: bg==="yellow"?S3.black:S3.inkOnBlack,
        letterSpacing:"-0.02em", textTransform:"uppercase",
        textWrap:"balance",
      }}>{label}</div>
    </div>
  </S3Slide>
);

// CTA slide — dark with yellow button
const S3Cta = ({ headline, body, button }) => (
  <S3Slide bg="black">
    <div style={{position:"absolute", left:56, right:56, top:"46%", transform:"translateY(-50%)"}}>
      <div style={{
        fontFamily: s3font, fontWeight: 800, fontSize: 88,
        lineHeight: 1.02, color: S3.inkOnBlack, letterSpacing:"-0.025em",
        marginBottom: 32, textWrap:"balance",
      }}>{headline}</div>
      {body && (
        <div style={{
          fontFamily: s3font, fontWeight: 500, fontSize: 36,
          lineHeight: 1.3, color: "rgba(255,255,255,0.7)",
          marginBottom: 56, maxWidth: 760,
        }}>{body}</div>
      )}
      <div style={{
        display:"inline-block",
        background: S3.yellow, color: S3.black,
        fontFamily: s3font, fontWeight: 800, fontSize: 34,
        padding:"28px 56px", borderRadius: 12,
        letterSpacing:"-0.01em",
      }}>{button}</div>
    </div>
  </S3Slide>
);

Object.assign(window, { S3Cover, S3Dark, S3Content, S3Stat, S3Cta });
