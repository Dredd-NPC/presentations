/* global React */
// Style 4 — VIOLET HAZARD
// Палитра: navy #0A0E1A + violet #6B2EFF + acid lime #C9F230
// Референс: бокс "Лазер База" (hazard-tape, violet+acid, product shot)
// Подпись стиля: hazard-ленты, лазерные лучи с glow, warning-бейджи,
//                monospace-технические лейблы, product photo

const {useMemo: s4uMemo} = React;

// ════════════════════════════════════════════
// ПАЛИТРА
// ════════════════════════════════════════════
const S4 = {
  navy:    "#0A0E1A",
  navy2:   "#0F1424",
  violet:  "#6B2EFF",
  violetD: "#4A1BB8",
  violetL: "#8A55FF",
  acid:    "#C9F230",
  white:   "#FFFFFF",
  ink:     "#0A0E1A",
  muted:   "rgba(255,255,255,0.55)",
  mutedOnLight: "rgba(10,14,26,0.6)",
  line:    "rgba(255,255,255,0.14)",
};

// ════════════════════════════════════════════
// ПРИМИТИВЫ / ДЕКОР
// ════════════════════════════════════════════

// Hazard-tape — диагональные полосы (чёрный + acid) под углом
function HazardTape({ pos="top", height=56, colors=[S4.ink, S4.acid] }) {
  const style = { position:"absolute", left:0, right:0, height, overflow:"hidden", zIndex:3 };
  if (pos === "top") style.top = 0;
  if (pos === "bottom") style.bottom = 0;
  const bg = `repeating-linear-gradient(-45deg, ${colors[0]} 0 24px, ${colors[1]} 24px 48px)`;
  return <div style={{...style, background:bg}} />;
}

// Warning triangle (SVG) — лазер-знак
function WarningTriangle({ size=120, fill=S4.acid, stroke=S4.ink, beamColor=S4.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{display:"block"}}>
      <path d="M50 8 L92 88 L8 88 Z" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round"/>
      <circle cx="50" cy="62" r="6" fill={beamColor}/>
      {Array.from({length:14}).map((_,i) => {
        const a = (i / 14) * Math.PI * 2;
        const r1 = 10, r2 = 18 + (i%3)*4;
        const x1 = 50 + Math.cos(a)*r1, y1 = 62 + Math.sin(a)*r1;
        const x2 = 50 + Math.cos(a)*r2, y2 = 62 + Math.sin(a)*r2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={beamColor} strokeWidth="3" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

// Лазерный луч — яркая линия с glow
function LaserBeam({ x1, y1, x2, y2, color=S4.acid, width=4, glow=true }) {
  const id = s4uMemo(() => "g_" + Math.random().toString(36).slice(2,8), []);
  return (
    <svg style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}} viewBox="0 0 1080 1350">
      <defs>
        {glow && (
          <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        )}
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width*2} opacity="0.25" filter={glow?`url(#${id})`:undefined}/>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round"/>
      <circle cx={x2} cy={y2} r={width*2} fill={color}/>
      <circle cx={x2} cy={y2} r={width*4} fill={color} opacity="0.3"/>
    </svg>
  );
}

// Scan-line grid — тонкая техническая сетка
function ScanGrid({ opacity=0.08, color=S4.white }) {
  const bg = `
    repeating-linear-gradient(0deg, ${color}${Math.round(opacity*255).toString(16).padStart(2,'0')} 0 1px, transparent 1px 60px),
    repeating-linear-gradient(90deg, ${color}${Math.round(opacity*255).toString(16).padStart(2,'0')} 0 1px, transparent 1px 60px)
  `;
  return <div style={{position:"absolute", inset:0, background:bg, pointerEvents:"none", zIndex:1}}/>;
}

// Corner ticks — угловые засечки типа viewfinder
function CornerTicks({ color=S4.acid, size=32, stroke=3, inset=24 }) {
  const arm = (pos) => {
    const style = { position:"absolute", width:size, height:size };
    if (pos.includes("t")) style.top = inset;
    if (pos.includes("b")) style.bottom = inset;
    if (pos.includes("l")) style.left = inset;
    if (pos.includes("r")) style.right = inset;
    const h = { position:"absolute", height:stroke, background:color, width:size };
    const v = { position:"absolute", width:stroke, background:color, height:size };
    if (pos.includes("t")) { h.top=0; v.top=0; }
    if (pos.includes("b")) { h.bottom=0; v.bottom=0; }
    if (pos.includes("l")) { h.left=0; v.left=0; }
    if (pos.includes("r")) { h.right=0; v.right=0; }
    return <div key={pos} style={style}><div style={h}/><div style={v}/></div>;
  };
  return <>{["tl","tr","bl","br"].map(arm)}</>;
}

// Monospace-лейбл техно-стиля
function TechLabel({ children, color=S4.acid, size=18, style={} }) {
  return (
    <div style={{
      fontFamily:"'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
      fontWeight:600, fontSize:size, letterSpacing:"0.18em", textTransform:"uppercase",
      color, ...style,
    }}>{children}</div>
  );
}

// ════════════════════════════════════════════
// SHELL
// ════════════════════════════════════════════
function S4Slide({ n, total, children, bg="navy", showHazardTop=false, showHazardBottom=false, showCorners=false, showGrid=false }) {
  const BG = {
    navy:   S4.navy,
    navy2:  S4.navy2,
    violet: S4.violet,
    violetD:S4.violetD,
    acid:   S4.acid,
  }[bg] || S4.navy;
  const inkColor = bg === "acid" ? S4.ink : S4.white;
  const counterBg = bg === "violet" || bg === "violetD" ? S4.acid : S4.violet;
  const counterFg = bg === "violet" || bg === "violetD" ? S4.ink : S4.white;

  return (
    <div style={{
      width:1080, height:1350, background:BG, color:inkColor, position:"relative",
      fontFamily:"'Manrope', system-ui, sans-serif", overflow:"hidden",
    }}>
      {showGrid && <ScanGrid/>}
      {showHazardTop && <HazardTape pos="top"/>}
      {showHazardBottom && <HazardTape pos="bottom"/>}
      {showCorners && <CornerTicks/>}
      {children}

      {/* brand footer — @handle + class 3B laser */}
      <div style={{
        position:"absolute", left:48, bottom: showHazardBottom ? 80 : 48,
        fontFamily:"'JetBrains Mono', monospace", fontSize:16, fontWeight:600,
        letterSpacing:"0.18em", textTransform:"uppercase",
        color: bg === "acid" ? S4.ink : S4.muted, zIndex:5,
      }}>
        @DOCTORMIKRUKOV · CLASS 3B LASER
      </div>

      {/* counter */}
      {typeof n !== "undefined" && (
        <div style={{
          position:"absolute", right:48, top: showHazardTop ? 80 : 48,
          background:counterBg, color:counterFg,
          padding:"10px 20px", borderRadius:999, fontWeight:700,
          fontSize:22, letterSpacing:"0.04em", zIndex:5,
          fontFamily:"'JetBrains Mono', monospace",
        }}>
          {String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// COVER 1 — Hazard-tape + product + big text (как референс-бокс)
// ════════════════════════════════════════════
function S4CoverBox({ n=1, total=6, small, big, kicker="ЛАЗЕРНОЕ УДАЛЕНИЕ" }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showHazardTop showHazardBottom>
      {/* central violet "box" */}
      <div style={{
        position:"absolute", left:96, right:96, top:130, bottom:110,
        background:S4.violet, border:`3px solid ${S4.acid}`,
        display:"flex", flexDirection:"column",
      }}>
        {/* inner hazard band top */}
        <div style={{
          height:72, background:`repeating-linear-gradient(-45deg, ${S4.ink} 0 22px, ${S4.acid} 22px 44px)`,
        }}/>

        {/* headline block (dark with acid text) */}
        <div style={{
          background:S4.ink, color:S4.acid, padding:"70px 60px",
          fontWeight:900, fontSize:168, lineHeight:0.92, letterSpacing:"-0.03em",
          textTransform:"uppercase", textAlign:"center",
        }}>
          {big || <>Лазер<br/>База</>}
        </div>

        {/* product area (violet + acid circle behind) */}
        <div style={{flex:1, position:"relative", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div style={{
            width:520, height:520, borderRadius:"50%", background:S4.acid,
            position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          }}/>
          <img src="./assets/laser_handle.png" alt=""
            style={{position:"relative", maxWidth:"72%", maxHeight:"78%", zIndex:2, filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))"}}/>
        </div>

        {/* inner hazard band bottom */}
        <div style={{
          height:72, background:`repeating-linear-gradient(-45deg, ${S4.ink} 0 22px, ${S4.acid} 22px 44px)`,
          position:"relative",
        }}>
          <div style={{
            position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
            background:S4.ink, color:S4.violet, fontWeight:800, padding:"12px 24px",
            fontSize:26, letterSpacing:"0.16em", textTransform:"uppercase",
            fontFamily:"'Manrope', sans-serif",
          }}>
            DOCTORMIKRUKOV
          </div>
        </div>
      </div>

      {/* side vertical label */}
      <div style={{
        position:"absolute", left:36, top:"50%", transform:"rotate(-90deg) translateX(50%)",
        transformOrigin:"left center",
        fontFamily:"'JetBrains Mono', monospace", fontSize:18, fontWeight:600,
        letterSpacing:"0.3em", color:S4.acid, textTransform:"uppercase",
        whiteSpace:"nowrap",
      }}>
        {kicker} · 2026
      </div>

      {/* side sticker */}
      {small && (
        <div style={{
          position:"absolute", right:36, top:"50%", transform:"rotate(90deg) translateX(-50%)",
          transformOrigin:"right center",
          fontFamily:"'JetBrains Mono', monospace", fontSize:18, fontWeight:600,
          letterSpacing:"0.3em", color:S4.muted, textTransform:"uppercase", whiteSpace:"nowrap",
        }}>
          {small}
        </div>
      )}
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// COVER 2 — Big violet headline + laser beam
// ════════════════════════════════════════════
function S4CoverBeam({ n=1, total=6, kicker="ЛАЗЕРНОЕ УДАЛЕНИЕ", big, sub, decor="beam" }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showCorners showGrid>
      {decor === "beam" && <LaserBeam x1={-40} y1={180} x2={820} y2={780} color={S4.acid}/>}
      {decor === "triangle" && (
        <div style={{position:"absolute", top:140, right:96, zIndex:4}}>
          <WarningTriangle size={160}/>
        </div>
      )}
      <div style={{position:"absolute", top:180, left:96}}>
        <TechLabel size={22}>{kicker}</TechLabel>
      </div>
      <div style={{
        position:"absolute", left:96, right:96, top:260, zIndex:4,
        fontWeight:900, fontSize:160, lineHeight:0.92, letterSpacing:"-0.035em",
        textTransform:"uppercase", color:S4.white,
      }}>
        {big || <>Это<br/>очень<br/><span style={{color:S4.acid}}>больно?</span></>}
      </div>
      {sub && (
        <div style={{
          position:"absolute", left:96, bottom:180, right:96,
          fontWeight:500, fontSize:32, lineHeight:1.3, color:S4.muted, maxWidth:820,
        }}>
          {sub}
        </div>
      )}
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// COVER 3 — Violet fill + hazard strips + centered
// ════════════════════════════════════════════
function S4CoverViolet({ n=1, total=6, kicker="ЛАЗЕРНОЕ УДАЛЕНИЕ", big, badge }) {
  return (
    <S4Slide n={n} total={total} bg="violet" showHazardTop showHazardBottom>
      <div style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column",
        justifyContent:"center", alignItems:"center", padding:"120px 80px",
      }}>
        <div style={{marginBottom:40}}>
          <TechLabel color={S4.acid} size={22}>{kicker}</TechLabel>
        </div>
        <div style={{
          fontWeight:900, fontSize:156, lineHeight:0.9, letterSpacing:"-0.035em",
          textTransform:"uppercase", color:S4.white, textAlign:"center",
        }}>
          {big || <>Это<br/>больно?</>}
        </div>
        {badge && (
          <div style={{
            marginTop:50, padding:"14px 30px", background:S4.ink, color:S4.acid,
            fontWeight:800, fontSize:28, letterSpacing:"0.08em", textTransform:"uppercase",
          }}>
            {badge}
          </div>
        )}
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// CONTENT 1 — Headline + body + tech label
// ════════════════════════════════════════════
function S4Content({ n, total, kicker, headline, body, bg="navy", decor="none" }) {
  return (
    <S4Slide n={n} total={total} bg={bg} showCorners={bg==="navy"}>
      {decor === "triangle-tr" && (
        <div style={{position:"absolute", top:130, right:96, zIndex:4, opacity:0.95}}>
          <WarningTriangle size={120}/>
        </div>
      )}
      {decor === "beam" && <LaserBeam x1={1100} y1={250} x2={340} y2={820} color={S4.acid}/>}
      {decor === "violet-block" && (
        <div style={{position:"absolute", top:0, left:0, width:60, height:"100%", background:S4.violet}}/>
      )}

      <div style={{position:"absolute", top:190, left: decor==="violet-block" ? 140 : 80, right:80}}>
        <TechLabel color={bg==="violet" ? S4.acid : S4.acid} size={20} style={{marginBottom:28}}>
          {kicker}
        </TechLabel>
        <div style={{
          fontWeight:900, fontSize:96, lineHeight:0.96, letterSpacing:"-0.03em",
          textTransform:"uppercase", color: bg==="acid" ? S4.ink : S4.white,
          textWrap:"balance", maxWidth:880,
        }}>
          {headline}
        </div>
        <div style={{
          marginTop:60, fontWeight:500, fontSize:36, lineHeight:1.35,
          color: bg==="acid" ? "rgba(10,14,26,0.75)" : "rgba(255,255,255,0.78)",
          maxWidth:860,
        }}>
          {body}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// SPLIT — violet/navy half-half с фото прибора
// ════════════════════════════════════════════
function S4Split({ n, total, kicker, headline, body, photo=true, flip=false }) {
  const left = (
    <div style={{
      width:"50%", background: flip ? S4.navy : S4.violet,
      position:"relative", padding:"180px 56px 200px",
      color: S4.white, display:"flex", flexDirection:"column",
    }}>
      <TechLabel color={S4.acid} size={20} style={{marginBottom:28}}>{kicker}</TechLabel>
      <div style={{
        fontWeight:900, fontSize:76, lineHeight:0.98, letterSpacing:"-0.03em",
        textTransform:"uppercase", textWrap:"balance",
      }}>
        {headline}
      </div>
      <div style={{marginTop:40, fontWeight:500, fontSize:28, lineHeight:1.4, color:"rgba(255,255,255,0.8)"}}>
        {body}
      </div>
    </div>
  );
  const right = (
    <div style={{
      width:"50%", background: flip ? S4.violet : S4.navy,
      position:"relative", display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      {photo && (
        <>
          <div style={{
            width:420, height:420, borderRadius:"50%", background:S4.acid,
            position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          }}/>
          <img src="./assets/laser_handle.png" alt=""
            style={{maxWidth:"65%", maxHeight:"65%", zIndex:2, position:"relative",
              filter:"drop-shadow(0 16px 32px rgba(0,0,0,0.6))"}}/>
        </>
      )}
    </div>
  );
  return (
    <S4Slide n={n} total={total} bg="navy" showHazardTop showHazardBottom>
      <div style={{position:"absolute", top:56, left:0, right:0, bottom:56, display:"flex"}}>
        {left}
        {right}
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// STAT — Huge violet number + acid accent
// ════════════════════════════════════════════
function S4Stat({ n, total, number, suffix, label, bg="navy" }) {
  return (
    <S4Slide n={n} total={total} bg={bg} showCorners={bg==="navy"} showGrid={bg==="navy"}>
      <div style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column",
        justifyContent:"center", alignItems:"center", padding:"140px 80px",
      }}>
        <div style={{
          display:"flex", alignItems:"flex-start",
          fontWeight:900, letterSpacing:"-0.05em", lineHeight:0.85, position:"relative",
        }}>
          <span style={{fontSize:440, color:S4.violetL,
            textShadow:`8px 8px 0 ${S4.acid}`,
          }}>{number}</span>
          {suffix && (
            <span style={{fontSize:200, color:S4.acid, marginTop:30}}>{suffix}</span>
          )}
        </div>
        <div style={{
          marginTop:40, fontWeight:700, fontSize:42, lineHeight:1.2,
          textAlign:"center", maxWidth:780, color:S4.white, letterSpacing:"-0.01em",
        }}>
          {label}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// QUOTE — Big pull quote + violet bar
// ════════════════════════════════════════════
function S4Quote({ n, total, quote, attribution }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showCorners>
      <div style={{position:"absolute", left:96, top:280, width:12, height:680, background:S4.violet}}/>
      <div style={{
        position:"absolute", top:160, left:160,
        fontWeight:900, fontSize:280, color:S4.violet, lineHeight:0.6,
        fontFamily:"Georgia, serif",
      }}>
        "
      </div>
      <div style={{
        position:"absolute", left:160, top:380, right:96,
        fontWeight:700, fontSize:64, lineHeight:1.15, letterSpacing:"-0.02em",
        color:S4.white, textWrap:"balance", maxWidth:820,
      }}>
        {quote}
      </div>
      <div style={{
        position:"absolute", left:160, bottom:200,
      }}>
        <TechLabel color={S4.acid} size={22}>— {attribution}</TechLabel>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// CHECKLIST — UL с laser-dots
// ════════════════════════════════════════════
function S4Checklist({ n, total, kicker, headline, items }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showCorners>
      <div style={{position:"absolute", top:190, left:80, right:80}}>
        <TechLabel color={S4.acid} size={20} style={{marginBottom:28}}>{kicker}</TechLabel>
        <div style={{
          fontWeight:900, fontSize:76, lineHeight:0.98, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.white, marginBottom:60, maxWidth:880,
        }}>
          {headline}
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:22}}>
          {items.map((item, i) => (
            <div key={i} style={{display:"flex", gap:28, alignItems:"flex-start"}}>
              <div style={{
                minWidth:44, width:44, height:44, borderRadius:"50%",
                background:S4.violet, position:"relative", marginTop:4,
                boxShadow:`0 0 0 6px rgba(107,46,255,0.25), 0 0 20px rgba(107,46,255,0.6)`,
              }}>
                <div style={{
                  position:"absolute", inset:0, display:"flex",
                  alignItems:"center", justifyContent:"center",
                  fontFamily:"'JetBrains Mono', monospace", fontWeight:700,
                  fontSize:16, color:S4.acid,
                }}>
                  {String(i+1).padStart(2,'0')}
                </div>
              </div>
              <div style={{
                fontWeight:600, fontSize:32, lineHeight:1.35, color:S4.white, paddingTop:4,
              }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// PARAMS — Технические параметры (имитация прибора)
// ════════════════════════════════════════════
function S4Params({ n, total, headline, params }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showCorners showGrid>
      <div style={{position:"absolute", top:190, left:80, right:80}}>
        <TechLabel color={S4.acid} size={20} style={{marginBottom:28}}>ПАРАМЕТРЫ</TechLabel>
        <div style={{
          fontWeight:900, fontSize:72, lineHeight:0.98, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.white, marginBottom:60, maxWidth:880,
        }}>
          {headline}
        </div>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px",
          background:S4.line, border:`1px solid ${S4.line}`,
        }}>
          {params.map((p, i) => (
            <div key={i} style={{
              background:S4.navy2, padding:"32px 32px", position:"relative",
            }}>
              <TechLabel color={S4.acid} size={16} style={{marginBottom:14}}>
                {p.label}
              </TechLabel>
              <div style={{
                fontWeight:900, fontSize:52, color:S4.white, letterSpacing:"-0.02em",
                fontFamily:"'JetBrains Mono', monospace", lineHeight:1,
              }}>
                {p.value}
              </div>
              {p.unit && (
                <div style={{
                  marginTop:10, fontWeight:500, fontSize:22, color:S4.muted,
                }}>
                  {p.unit}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// BEAM — Лазерный луч попадает в точку на коже
// ════════════════════════════════════════════
function S4BeamShot({ n, total, kicker, headline, body }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showHazardBottom>
      {/* big violet circle with beam target */}
      <div style={{
        position:"absolute", right:-120, top:-120, width:780, height:780,
        borderRadius:"50%", background:S4.violet, opacity:0.9,
      }}/>
      <div style={{
        position:"absolute", right:60, top:60, width:540, height:540,
        borderRadius:"50%", border:`3px solid ${S4.acid}`,
      }}/>

      {/* beam hitting center of circle */}
      <LaserBeam x1={0} y1={1050} x2={780} y2={380} color={S4.acid} width={5}/>

      {/* target dot */}
      <div style={{
        position:"absolute", left:780-14, top:380-14, width:28, height:28,
        borderRadius:"50%", background:S4.white,
        boxShadow:`0 0 40px ${S4.acid}, 0 0 0 8px rgba(201,242,48,0.3)`, zIndex:5,
      }}/>

      <div style={{position:"absolute", left:80, bottom:220, right:80}}>
        <TechLabel color={S4.acid} size={20} style={{marginBottom:20}}>{kicker}</TechLabel>
        <div style={{
          fontWeight:900, fontSize:80, lineHeight:0.98, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.white, marginBottom:24, maxWidth:820,
        }}>
          {headline}
        </div>
        <div style={{fontWeight:500, fontSize:30, lineHeight:1.35, color:S4.muted, maxWidth:820}}>
          {body}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// TIMELINE — Этапы с лазер-точками
// ════════════════════════════════════════════
function S4Timeline({ n, total, headline, steps }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showCorners>
      <div style={{position:"absolute", top:180, left:80, right:80}}>
        <TechLabel color={S4.acid} size={20} style={{marginBottom:28}}>ПРОЦЕСС</TechLabel>
        <div style={{
          fontWeight:900, fontSize:72, lineHeight:0.98, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.white, marginBottom:70, maxWidth:880,
        }}>
          {headline}
        </div>
      </div>
      <div style={{
        position:"absolute", left:120, right:120, bottom:200, height:260,
      }}>
        {/* horizontal beam line */}
        <div style={{
          position:"absolute", left:0, right:0, top:"50%",
          height:3, background:S4.acid, transform:"translateY(-50%)",
          boxShadow:`0 0 24px ${S4.acid}`,
        }}/>
        <div style={{
          display:"grid", gridTemplateColumns:`repeat(${steps.length}, 1fr)`, gap:0,
          position:"relative", height:"100%",
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", position:"relative",
            }}>
              <div style={{
                position:"absolute", top:"50%", transform:"translateY(-50%)",
                width:36, height:36, borderRadius:"50%", background:S4.violet,
                border:`4px solid ${S4.navy}`, boxShadow:`0 0 0 3px ${S4.acid}, 0 0 30px rgba(107,46,255,0.8)`,
                zIndex:2,
              }}/>
              <div style={{
                position:"absolute", top: i%2===0 ? 0 : "auto", bottom: i%2===0 ? "auto" : 0,
                textAlign:"center", maxWidth:220, padding:"0 10px",
              }}>
                <TechLabel color={S4.acid} size={15} style={{marginBottom:8}}>
                  ШАГ {String(i+1).padStart(2,'0')}
                </TechLabel>
                <div style={{
                  fontWeight:700, fontSize:22, lineHeight:1.25, color:S4.white,
                }}>
                  {s}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// WARNING — Большой warning-триангл + текст
// ════════════════════════════════════════════
function S4Warning({ n, total, headline, body }) {
  return (
    <S4Slide n={n} total={total} bg="navy" showHazardTop showHazardBottom>
      <div style={{
        position:"absolute", top:180, left:"50%", transform:"translateX(-50%)",
      }}>
        <WarningTriangle size={280}/>
      </div>
      <div style={{
        position:"absolute", top:540, left:80, right:80, textAlign:"center",
      }}>
        <div style={{
          fontWeight:900, fontSize:84, lineHeight:0.98, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.acid, marginBottom:40, textWrap:"balance",
        }}>
          {headline}
        </div>
        <div style={{
          fontWeight:500, fontSize:34, lineHeight:1.35, color:S4.white,
          maxWidth:860, margin:"0 auto",
        }}>
          {body}
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// CTA — Большой call to action с hazard и кнопкой
// ════════════════════════════════════════════
function S4Cta({ n, total, kicker="ЗАПИСЬ", headline, body, button="Написать в Direct" }) {
  return (
    <S4Slide n={n} total={total} bg="violet" showHazardTop showHazardBottom>
      <div style={{
        position:"absolute", inset:0, padding:"150px 80px 200px",
        display:"flex", flexDirection:"column", justifyContent:"center",
      }}>
        <TechLabel color={S4.acid} size={24} style={{marginBottom:32}}>{kicker}</TechLabel>
        <div style={{
          fontWeight:900, fontSize:116, lineHeight:0.94, letterSpacing:"-0.03em",
          textTransform:"uppercase", color:S4.white, marginBottom:40, maxWidth:900,
        }}>
          {headline}
        </div>
        {body && (
          <div style={{
            fontWeight:500, fontSize:34, lineHeight:1.35,
            color:"rgba(255,255,255,0.8)", maxWidth:800, marginBottom:50,
          }}>
            {body}
          </div>
        )}
        <div style={{display:"inline-flex", alignItems:"center", gap:20}}>
          <div style={{
            background:S4.acid, color:S4.ink, padding:"22px 40px",
            fontWeight:800, fontSize:32, letterSpacing:"-0.01em",
            textTransform:"uppercase", display:"inline-block",
          }}>
            {button}
          </div>
          <div style={{
            width:64, height:64, background:S4.ink, color:S4.acid,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:36, fontWeight:900,
          }}>
            →
          </div>
        </div>
      </div>
    </S4Slide>
  );
}

// ════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════
Object.assign(window, {
  S4, S4Slide,
  HazardTape, WarningTriangle, LaserBeam, ScanGrid, CornerTicks, TechLabel,
  S4CoverBox, S4CoverBeam, S4CoverViolet,
  S4Content, S4Split, S4Stat, S4Quote, S4Checklist,
  S4Params, S4BeamShot, S4Timeline, S4Warning, S4Cta,
});
