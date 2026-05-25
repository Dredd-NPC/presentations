/* global React */
// Style 5 — INSTAGRAM GRADIENT
// Палитра: white #FFFFFF + black #0A0A0A + violet #6928E8 + fuchsia #ED008C + soft pink #FCE4F0
// Вайб: чистый, "инстаграмный", gradient violet→fuchsia, круговые кольца,
//       editorial-типографика, много воздуха

const IG = {
  white:   "#FFFFFF",
  black:   "#0A0A0A",
  violet:  "#6928E8",
  violetD: "#4A1BB8",
  fuchsia: "#ED008C",
  fuchsiaD:"#C2007A",
  pink:    "#FCE4F0",
  pink2:   "#F8D0E5",
  ink:     "#0A0A0A",
  muted:   "rgba(10,10,10,0.55)",
  mutedOnDark: "rgba(255,255,255,0.6)",
  line:    "rgba(10,10,10,0.08)",
};

// gradient string helper
const IG_GRAD = `linear-gradient(135deg, ${IG.violet} 0%, ${IG.fuchsia} 100%)`;
const IG_GRAD_SOFT = `linear-gradient(135deg, ${IG.violet} 0%, ${IG.fuchsia} 100%)`;

// ════════════════════════════════════════════
// SHELL
// ════════════════════════════════════════════
function S5Slide({ n, total, children, bg="white" }) {
  const BG = {
    white:   IG.white,
    black:   IG.black,
    pink:    IG.pink,
    violet:  IG.violet,
    fuchsia: IG.fuchsia,
    grad:    IG_GRAD,
  }[bg] || IG.white;
  const inkColor = (bg === "black" || bg === "violet" || bg === "fuchsia" || bg === "grad") ? IG.white : IG.ink;
  const counterFg = (bg === "black" || bg === "violet" || bg === "fuchsia" || bg === "grad") ? IG.black : IG.white;
  const counterBg = (bg === "black" || bg === "violet" || bg === "fuchsia" || bg === "grad") ? IG.white : IG.black;
  const footerColor = (bg === "black" || bg === "violet" || bg === "fuchsia" || bg === "grad") ? IG.mutedOnDark : IG.muted;

  return (
    <div style={{
      width:1080, height:1350, background:BG, color:inkColor, position:"relative",
      fontFamily:"'Manrope', system-ui, sans-serif", overflow:"hidden",
    }}>
      {children}

      {/* brand footer */}
      <div style={{
        position:"absolute", left:60, bottom:56,
        fontSize:18, fontWeight:600, letterSpacing:"0.14em",
        textTransform:"uppercase", color: footerColor, zIndex:5,
      }}>
        @DOCTORMIKRUKOV
      </div>

      {/* counter pill — round */}
      {typeof n !== "undefined" && (
        <div style={{
          position:"absolute", right:60, top:56,
          background:counterBg, color:counterFg,
          padding:"10px 20px", borderRadius:999, fontWeight:700,
          fontSize:22, letterSpacing:"0.02em", zIndex:5,
        }}>
          {String(n).padStart(2,'0')} · {String(total).padStart(2,'0')}
        </div>
      )}
    </div>
  );
}

// Gradient ring (instagram-style)
function GradRing({ size=600, stroke=40, progress=1, rotate=-90, style={} }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = "g_" + Math.random().toString(36).slice(2,8);
  return (
    <svg width={size} height={size} style={{transform:`rotate(${rotate}deg)`, ...style}}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={IG.violet}/>
          <stop offset="100%" stopColor={IG.fuchsia}/>
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} stroke={`url(#${id})`}
        strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={`${c*progress} ${c}`}/>
    </svg>
  );
}

// Blob (organic fuchsia/violet shape)
function IgBlob({ size=420, color=IG.fuchsia, style={} }) {
  return (
    <div style={{
      width:size, height:size, background:color,
      borderRadius:"63% 37% 54% 46% / 55% 48% 52% 45%",
      ...style,
    }}/>
  );
}

// Gradient text helper
function GradText({ children, style={} }) {
  return (
    <span style={{
      background:IG_GRAD, WebkitBackgroundClip:"text",
      WebkitTextFillColor:"transparent", backgroundClip:"text",
      ...style,
    }}>{children}</span>
  );
}

// Kicker (uppercase tracking label)
function IgKicker({ children, color=IG.fuchsia, size=20, style={} }) {
  return (
    <div style={{
      fontWeight:700, fontSize:size, letterSpacing:"0.14em",
      textTransform:"uppercase", color, ...style,
    }}>{children}</div>
  );
}

// ════════════════════════════════════════════
// COVER 1 — Big headline + gradient ring
// ════════════════════════════════════════════
function S5CoverRing({ n=1, total=6, kicker="ЛАЗЕРНОЕ УДАЛЕНИЕ", big, sub }) {
  return (
    <S5Slide n={n} total={total} bg="white">
      {/* large ring br */}
      <div style={{position:"absolute", right:-140, bottom:-180, opacity:0.95, zIndex:0}}>
        <GradRing size={820} stroke={44} progress={0.72}/>
      </div>

      <div style={{position:"absolute", top:180, left:72, right:72, zIndex:2}}>
        <IgKicker style={{marginBottom:32}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:150, lineHeight:0.94, letterSpacing:"-0.035em",
          color:IG.ink, textWrap:"balance", maxWidth:900,
        }}>
          {big || <>Это<br/>очень <GradText>больно?</GradText></>}
        </div>
        {sub && (
          <div style={{
            marginTop:40, fontWeight:500, fontSize:32, lineHeight:1.35,
            color:IG.muted, maxWidth:700,
          }}>
            {sub}
          </div>
        )}
      </div>
    </S5Slide>
  );
}

// COVER 2 — Pink bg + big text + small violet blob
function S5CoverPink({ n=1, total=6, kicker="ЛАЗЕРНОЕ УДАЛЕНИЕ", big, sub }) {
  return (
    <S5Slide n={n} total={total} bg="pink">
      <div style={{position:"absolute", top:-80, right:-80, zIndex:0}}>
        <IgBlob size={460} color={IG.violet}/>
      </div>
      <div style={{position:"absolute", bottom:-100, left:-80, zIndex:0}}>
        <IgBlob size={360} color={IG.fuchsia}/>
      </div>
      <div style={{position:"absolute", top:200, left:72, right:72, zIndex:2}}>
        <IgKicker color={IG.violet} style={{marginBottom:28}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:152, lineHeight:0.94, letterSpacing:"-0.035em",
          color:IG.ink, textWrap:"balance",
        }}>
          {big}
        </div>
        {sub && <div style={{marginTop:40, fontWeight:500, fontSize:30, lineHeight:1.35, color:IG.muted}}>{sub}</div>}
      </div>
    </S5Slide>
  );
}

// COVER 3 — Black bg + gradient text
function S5CoverBlack({ n=1, total=6, kicker, big, sub }) {
  return (
    <S5Slide n={n} total={total} bg="black">
      <div style={{position:"absolute", top:180, left:72, right:72, zIndex:2}}>
        <IgKicker color={IG.fuchsia} style={{marginBottom:32}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:148, lineHeight:0.96, letterSpacing:"-0.03em",
          textWrap:"balance",
        }}>
          {big}
        </div>
        {sub && (
          <div style={{marginTop:40, fontWeight:500, fontSize:32, lineHeight:1.35, color:IG.mutedOnDark, maxWidth:780}}>
            {sub}
          </div>
        )}
      </div>
      <div style={{position:"absolute", right:-200, bottom:-200, opacity:0.9}}>
        <GradRing size={700} stroke={36} progress={0.82}/>
      </div>
    </S5Slide>
  );
}

// COVER 4 — Full-bleed gradient
function S5CoverGrad({ n=1, total=6, big, kicker, sub }) {
  return (
    <S5Slide n={n} total={total} bg="grad">
      <div style={{position:"absolute", top:200, left:72, right:72}}>
        <IgKicker color={IG.white} style={{marginBottom:32, opacity:0.9}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:156, lineHeight:0.94, letterSpacing:"-0.035em",
          color:IG.white, textWrap:"balance",
        }}>
          {big}
        </div>
        {sub && <div style={{marginTop:40, fontWeight:500, fontSize:30, lineHeight:1.35, color:"rgba(255,255,255,0.85)", maxWidth:780}}>{sub}</div>}
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// CONTENT — white bg, kicker + big + body
// ════════════════════════════════════════════
function S5Content({ n, total, kicker, headline, body, bg="white", decor="none" }) {
  const inkMain = (bg==="black"||bg==="violet"||bg==="fuchsia"||bg==="grad") ? IG.white : IG.ink;
  const bodyColor = (bg==="black"||bg==="violet"||bg==="fuchsia"||bg==="grad") ? IG.mutedOnDark : IG.muted;
  const kickerColor = (bg==="pink"||bg==="white") ? IG.fuchsia : IG.white;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      {decor === "ring-tr" && (
        <div style={{position:"absolute", top:-160, right:-160, opacity:0.9}}>
          <GradRing size={540} stroke={32} progress={0.64}/>
        </div>
      )}
      {decor === "blob-br" && (
        <div style={{position:"absolute", right:-100, bottom:-80, zIndex:0}}>
          <IgBlob size={360} color={IG.pink2}/>
        </div>
      )}
      {decor === "ring-bl" && (
        <div style={{position:"absolute", bottom:-180, left:-180, opacity:0.85}}>
          <GradRing size={560} stroke={32} progress={0.55} rotate={45}/>
        </div>
      )}

      <div style={{position:"absolute", top:200, left:72, right:72, zIndex:2}}>
        <IgKicker color={kickerColor} style={{marginBottom:32}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:92, lineHeight:0.98, letterSpacing:"-0.03em",
          color:inkMain, textWrap:"balance", maxWidth:900,
        }}>
          {headline}
        </div>
        <div style={{
          marginTop:48, fontWeight:500, fontSize:34, lineHeight:1.38,
          color:bodyColor, maxWidth:840,
        }}>
          {body}
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// STAT RING — большое число внутри кольца (как Instagram analytics)
// ════════════════════════════════════════════
function S5StatRing({ n, total, kicker, number, suffix, label, body, progress=0.72, bg="white" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const numColor = isDark ? IG.white : IG.ink;
  const bodyColor = isDark ? IG.mutedOnDark : IG.muted;
  const kickColor = isDark ? IG.white : IG.fuchsia;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{position:"absolute", top:150, left:0, right:0, textAlign:"center"}}>
        <IgKicker color={kickColor} style={{marginBottom:18}}>{kicker}</IgKicker>
      </div>
      <div style={{
        position:"absolute", top:230, left:"50%", transform:"translateX(-50%)",
      }}>
        <div style={{position:"relative", width:720, height:720}}>
          <GradRing size={720} stroke={46} progress={progress}/>
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{
              fontWeight:900, fontSize:240, letterSpacing:"-0.05em", lineHeight:1,
              color:numColor, display:"flex", alignItems:"baseline",
            }}>
              {number}
              {suffix && <span style={{fontSize:120, marginLeft:8, color: isDark ? IG.fuchsia : undefined}}>{isDark ? suffix : <GradText>{suffix}</GradText>}</span>}
            </div>
            {label && (
              <div style={{
                marginTop:18, fontWeight:600, fontSize:30, color:bodyColor,
                maxWidth:520, textAlign:"center", lineHeight:1.25,
              }}>
                {label}
              </div>
            )}
          </div>
        </div>
      </div>
      {body && (
        <div style={{
          position:"absolute", left:72, right:72, bottom:140, textAlign:"center",
          fontWeight:500, fontSize:28, color:bodyColor, lineHeight:1.35,
        }}>
          {body}
        </div>
      )}
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// STAT LEGEND — ring + legend snippet (mimics the reference)
// ════════════════════════════════════════════
function S5StatLegend({ n, total, kicker, number, numberSub, legend=[] }) {
  return (
    <S5Slide n={n} total={total} bg="white">
      <div style={{position:"absolute", top:150, left:72}}>
        <IgKicker style={{marginBottom:12}}>{kicker}</IgKicker>
      </div>
      <div style={{position:"absolute", top:230, left:"50%", transform:"translateX(-50%)"}}>
        <div style={{position:"relative", width:640, height:640}}>
          <GradRing size={640} stroke={36} progress={0.78}/>
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{fontWeight:600, fontSize:26, color:IG.muted, marginBottom:14}}>Всего</div>
            <div style={{fontWeight:900, fontSize:140, letterSpacing:"-0.04em", lineHeight:1, color:IG.ink}}>
              {number}
            </div>
            {numberSub && (
              <div style={{marginTop:16, fontWeight:500, fontSize:26, color:IG.muted}}>{numberSub}</div>
            )}
          </div>
        </div>
      </div>
      <div style={{
        position:"absolute", left:72, right:72, bottom:140,
        display:"flex", flexDirection:"column", gap:22,
      }}>
        {legend.map((item, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:18,
            borderBottom: i < legend.length-1 ? `1px solid ${IG.line}` : "none",
            paddingBottom:22,
          }}>
            <div style={{
              width:16, height:16, borderRadius:"50%", background:item.color || IG.violet,
            }}/>
            <div style={{flex:1, fontWeight:600, fontSize:32, color:IG.ink}}>{item.label}</div>
            <div style={{fontWeight:800, fontSize:32, color:IG.ink, letterSpacing:"-0.01em"}}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// QUOTE — Big pull quote with gradient mark
// ════════════════════════════════════════════
function S5Quote({ n, total, quote, attribution, bg="pink" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const inkC = isDark ? IG.white : IG.ink;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{
        position:"absolute", top:140, left:72,
        fontSize:320, lineHeight:0.5, fontFamily:"Georgia, serif",
        fontWeight:900,
      }}>
        <GradText>"</GradText>
      </div>
      <div style={{
        position:"absolute", top:340, left:72, right:72,
        fontWeight:700, fontSize:64, lineHeight:1.15, letterSpacing:"-0.02em",
        color:inkC, textWrap:"balance", maxWidth:880,
      }}>
        {quote}
      </div>
      <div style={{position:"absolute", bottom:180, left:72}}>
        <IgKicker color={isDark ? IG.fuchsia : IG.violet}>— {attribution}</IgKicker>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// CHECKLIST — with gradient bullet
// ════════════════════════════════════════════
function S5Checklist({ n, total, kicker, headline, items, bg="white" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const inkC = isDark ? IG.white : IG.ink;
  const kickC = isDark ? IG.white : IG.fuchsia;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{position:"absolute", top:190, left:72, right:72}}>
        <IgKicker color={kickC} style={{marginBottom:28}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:76, lineHeight:0.98, letterSpacing:"-0.03em",
          color:inkC, textWrap:"balance", marginBottom:56, maxWidth:900,
        }}>
          {headline}
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:24}}>
          {items.map((item, i) => (
            <div key={i} style={{display:"flex", gap:26, alignItems:"flex-start"}}>
              <div style={{
                minWidth:52, width:52, height:52, borderRadius:"50%",
                background: bg==="grad" ? IG.white : IG_GRAD,
                display:"flex", alignItems:"center", justifyContent:"center",
                color: bg==="grad" ? IG.fuchsia : IG.white, fontWeight:800, fontSize:24, marginTop:2,
              }}>
                {String(i+1).padStart(2,'0')}
              </div>
              <div style={{fontWeight:600, fontSize:32, lineHeight:1.35, color:inkC, paddingTop:6}}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// TWO COL — kicker headline + numbered split
// ════════════════════════════════════════════
function S5TwoCol({ n, total, kicker, headline, leftTitle, leftBody, rightTitle, rightBody, bg="white" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const inkC = isDark ? IG.white : IG.ink;
  const bodyC = isDark ? IG.mutedOnDark : IG.muted;
  const kickC = isDark ? IG.white : IG.fuchsia;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{position:"absolute", top:190, left:72, right:72}}>
        <IgKicker color={kickC} style={{marginBottom:28}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:80, lineHeight:0.98, letterSpacing:"-0.03em",
          color:inkC, textWrap:"balance", marginBottom:72, maxWidth:900,
        }}>
          {headline}
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:48}}>
          <div style={{borderTop:`3px solid ${isDark ? IG.white : IG.violet}`, paddingTop:28}}>
            <div style={{fontWeight:800, fontSize:42, color:isDark ? IG.white : IG.violet, marginBottom:18, letterSpacing:"-0.01em"}}>
              {leftTitle}
            </div>
            <div style={{fontWeight:500, fontSize:28, lineHeight:1.4, color:bodyC}}>
              {leftBody}
            </div>
          </div>
          <div style={{borderTop:`3px solid ${IG.fuchsia}`, paddingTop:28}}>
            <div style={{fontWeight:800, fontSize:42, color:IG.fuchsia, marginBottom:18, letterSpacing:"-0.01em"}}>
              {rightTitle}
            </div>
            <div style={{fontWeight:500, fontSize:28, lineHeight:1.4, color:bodyC}}>
              {rightBody}
            </div>
          </div>
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// TIMELINE/PROGRESS — steps with gradient rings
// ════════════════════════════════════════════
function S5Progress({ n, total, headline, steps, active=1, bg="white" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const inkC = isDark ? IG.white : IG.ink;
  const mutedC = isDark ? IG.mutedOnDark : IG.muted;
  const kickC = isDark ? IG.white : IG.fuchsia;
  const lineC = isDark ? "rgba(255,255,255,0.2)" : IG.line;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{position:"absolute", top:190, left:72, right:72}}>
        <IgKicker color={kickC} style={{marginBottom:28}}>ПРОЦЕСС</IgKicker>
        <div style={{
          fontWeight:900, fontSize:76, lineHeight:0.98, letterSpacing:"-0.03em",
          color:inkC, textWrap:"balance", marginBottom:72, maxWidth:880,
        }}>
          {headline}
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:28}}>
          {steps.map((s, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <div key={i} style={{display:"flex", alignItems:"center", gap:28}}>
                <div style={{
                  minWidth:72, width:72, height:72, borderRadius:"50%",
                  background: isPast || isActive ? (bg==="grad" ? IG.white : IG_GRAD) : (isDark ? "transparent" : IG.white),
                  border: isPast || isActive ? "none" : `3px solid ${lineC}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color: isPast || isActive ? (bg==="grad" ? IG.fuchsia : IG.white) : mutedC,
                  fontWeight:800, fontSize:28,
                }}>
                  {isPast ? "✓" : String(i+1).padStart(2,'0')}
                </div>
                <div style={{
                  fontWeight: isActive ? 800 : 600,
                  fontSize:30, lineHeight:1.3, color: isPast ? mutedC : inkC,
                }}>
                  {s}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// STORY CARD — фото-плейсхолдер с gradient overlay
// ════════════════════════════════════════════
function S5StoryCard({ n, total, kicker, headline, caption }) {
  return (
    <S5Slide n={n} total={total} bg="white">
      <div style={{position:"absolute", top:150, left:72, right:72}}>
        <IgKicker style={{marginBottom:24}}>{kicker}</IgKicker>
        <div style={{
          fontWeight:900, fontSize:80, lineHeight:0.98, letterSpacing:"-0.03em",
          color:IG.ink, textWrap:"balance", marginBottom:40, maxWidth:880,
        }}>
          {headline}
        </div>
      </div>

      {/* photo placeholder card with gradient border */}
      <div style={{
        position:"absolute", left:72, right:72, top:640, bottom:170,
        background:IG_GRAD, padding:6, borderRadius:28,
      }}>
        <div style={{
          width:"100%", height:"100%", background:IG.pink,
          borderRadius:22, display:"flex", alignItems:"center", justifyContent:"center",
          color:IG.violet, fontWeight:700, fontSize:32, letterSpacing:"0.08em",
          textTransform:"uppercase", position:"relative", overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", inset:0,
            background:`radial-gradient(circle at 30% 40%, ${IG.fuchsia}22, transparent 60%), radial-gradient(circle at 70% 70%, ${IG.violet}22, transparent 60%)`,
          }}/>
          <span style={{zIndex:2}}>{caption || "ФОТО ДО/ПОСЛЕ"}</span>
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// BEFORE/AFTER (horizontal cards)
// ════════════════════════════════════════════
function S5BeforeAfter({ n, total, headline, before, after, bg="white" }) {
  const isDark = bg!=="white" && bg!=="pink";
  const inkC = isDark ? IG.white : IG.ink;
  const kickC = isDark ? IG.white : IG.fuchsia;
  const beforeBg = isDark ? "rgba(255,255,255,0.08)" : IG.pink;
  const beforeInk = isDark ? IG.white : IG.ink;
  const beforeMuted = isDark ? IG.mutedOnDark : IG.muted;
  return (
    <S5Slide n={n} total={total} bg={bg}>
      <div style={{position:"absolute", top:190, left:72, right:72}}>
        <IgKicker color={kickC} style={{marginBottom:28}}>ДО / ПОСЛЕ</IgKicker>
        <div style={{
          fontWeight:900, fontSize:78, lineHeight:0.98, letterSpacing:"-0.03em",
          color:inkC, textWrap:"balance", marginBottom:56, maxWidth:880,
        }}>
          {headline}
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
          <div style={{background:beforeBg, padding:"32px 28px", borderRadius:20, minHeight:420}}>
            <div style={{fontWeight:800, fontSize:20, letterSpacing:"0.18em", textTransform:"uppercase", color:beforeMuted, marginBottom:20}}>
              До
            </div>
            <div style={{fontWeight:700, fontSize:32, lineHeight:1.25, color:beforeInk, letterSpacing:"-0.01em"}}>
              {before}
            </div>
          </div>
          <div style={{background:IG_GRAD, padding:"32px 28px", borderRadius:20, minHeight:420, color:IG.white}}>
            <div style={{fontWeight:800, fontSize:20, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)", marginBottom:20}}>
              После
            </div>
            <div style={{fontWeight:700, fontSize:32, lineHeight:1.25, letterSpacing:"-0.01em"}}>
              {after}
            </div>
          </div>
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// CTA — gradient bg + white text + black button
// ════════════════════════════════════════════
function S5Cta({ n, total, kicker="ЗАПИСЬ", headline, body, button="Написать в Direct" }) {
  return (
    <S5Slide n={n} total={total} bg="grad">
      <div style={{
        position:"absolute", inset:0, padding:"170px 72px 180px",
        display:"flex", flexDirection:"column", justifyContent:"center",
      }}>
        <div style={{marginBottom:32, color:IG.white, opacity:0.9}}>
          <IgKicker color={IG.white} size={22}>{kicker}</IgKicker>
        </div>
        <div style={{
          fontWeight:900, fontSize:116, lineHeight:0.94, letterSpacing:"-0.03em",
          color:IG.white, marginBottom:36, textWrap:"balance", maxWidth:900,
        }}>
          {headline}
        </div>
        {body && (
          <div style={{
            fontWeight:500, fontSize:32, lineHeight:1.38,
            color:"rgba(255,255,255,0.85)", maxWidth:820, marginBottom:48,
          }}>
            {body}
          </div>
        )}
        <div style={{display:"inline-flex", alignItems:"center", gap:14}}>
          <div style={{
            background:IG.black, color:IG.white, padding:"22px 36px",
            fontWeight:700, fontSize:30, letterSpacing:"-0.01em",
            borderRadius:999, display:"inline-block",
          }}>
            {button}
          </div>
          <div style={{
            width:64, height:64, borderRadius:"50%", background:IG.white, color:IG.black,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:32, fontWeight:800,
          }}>
            →
          </div>
        </div>
      </div>
    </S5Slide>
  );
}

// ════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════
Object.assign(window, {
  IG, IG_GRAD, S5Slide, GradRing, IgBlob, GradText, IgKicker,
  S5CoverRing, S5CoverPink, S5CoverBlack, S5CoverGrad,
  S5Content, S5StatRing, S5StatLegend, S5Quote, S5Checklist,
  S5TwoCol, S5Progress, S5StoryCard, S5BeforeAfter, S5Cta,
});
