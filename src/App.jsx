import { useState, useEffect, useRef } from "react";
import { ChevronDown, Link, GitBranch, ArrowUp, Code, Brain, BarChart2 } from "lucide-react";

const C = {
  bg: "#06090f",
  bgCard: "rgba(255,255,255,0.04)",
  bgCardHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.07)",
  borderBlue: "rgba(96,165,250,0.3)",
  blue: "#60a5fa",
  purple: "#a78bfa",
  green: "#34d399",
  amber: "#fbbf24",
  text: "#f1f5f9",
  muted: "#94a3b8",
  dim: "#475569",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Fade({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ color: C.blue, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>{children}</div>;
}

function SectionTitle({ children }) {
  return <h2 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 800, letterSpacing: "-0.025em", margin: 0 }}>{children}</h2>;
}

function Card({ children, accentColor, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        border: `1px solid ${hovered && accentColor ? `${accentColor}40` : C.border}`,
        background: hovered ? C.bgCardHover : C.bgCard,
        backdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.35)" : "none",
        transition: "all 0.3s ease",
        ...style,
      }}
    >{children}</div>
  );
}

function ProgressBar({ pct }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{ height: 4, borderRadius: 100, width: inView ? `${pct}%` : "0%", background: `linear-gradient(90deg, ${C.blue}, ${C.purple})`, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
  );
}

function FlipCard({ fact, isFlipped, onFlip }) {
  return (
    <div onClick={onFlip} style={{ cursor: "pointer", height: 180, perspective: 1000 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, border: `1px solid ${C.border}`, background: C.bgCard, backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 20 }}>
          <span style={{ fontSize: 34 }}>{fact.front}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text, textAlign: "center" }}>{fact.label}</span>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 20, border: `1px solid ${C.borderBlue}`, background: `linear-gradient(135deg, rgba(96,165,250,0.07),rgba(167,139,250,0.05))`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <p style={{ fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.65, margin: 0 }}>{fact.back}</p>
        </div>
      </div>
    </div>
  );
}

function F1CarSVG({ glow = false }) {
  return (
    <svg viewBox="0 0 96 40" width="88" height="36" style={{ display: "block", filter: glow ? "drop-shadow(0 0 10px #60a5fa) drop-shadow(0 0 20px rgba(96,165,250,0.4))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.6))", transition: "filter 0.3s" }}>
      <rect x="1" y="5" width="7" height="30" rx="3" fill="#93c5fd" opacity="0.85"/>
      <rect x="2" y="6" width="5" height="28" rx="2" fill="#bfdbfe" opacity="0.5"/>
      <rect x="11" y="1" width="15" height="10" rx="5" fill="#1e293b"/>
      <rect x="11" y="29" width="15" height="10" rx="5" fill="#1e293b"/>
      <ellipse cx="18" cy="6" rx="5" ry="4" fill="#334155"/>
      <ellipse cx="18" cy="34" rx="5" ry="4" fill="#334155"/>
      <ellipse cx="18" cy="6" rx="2.5" ry="2" fill="#475569"/>
      <ellipse cx="18" cy="34" rx="2.5" ry="2" fill="#475569"/>
      <path d="M24 12 L27 10 Q48 5 68 7 Q84 8 90 17 Q94 20 90 23 Q84 32 68 33 Q48 35 27 30 L24 28 Z" fill="#1d4ed8"/>
      <path d="M26 13 L29 11 Q50 7 70 9 Q83 11 88 20 Q83 29 70 31 Q50 33 29 29 L26 27 Z" fill="#2563eb"/>
      <path d="M30 12 Q55 8 72 11" stroke="#93c5fd" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
      <ellipse cx="53" cy="20" rx="17" ry="9" fill="#1d4ed8"/>
      <ellipse cx="53" cy="20" rx="14" ry="7" fill="#172554"/>
      <ellipse cx="53" cy="20" rx="10" ry="5" fill="#0a0f1e"/>
      <ellipse cx="54" cy="19" rx="6" ry="3" fill="#0f1a2e" opacity="0.8"/>
      <path d="M45 17 Q53 14.5 61 17" stroke="#60a5fa" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9"/>
      <path d="M86 16 Q93 18 95 20 Q93 22 86 24 Z" fill="#3b82f6"/>
      <path d="M87 17.5 Q92 19 92 20.5" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.5"/>
      <rect x="70" y="1" width="15" height="10" rx="5" fill="#1e293b"/>
      <rect x="70" y="29" width="15" height="10" rx="5" fill="#1e293b"/>
      <ellipse cx="77" cy="6" rx="5" ry="4" fill="#334155"/>
      <ellipse cx="77" cy="34" rx="5" ry="4" fill="#334155"/>
      <ellipse cx="77" cy="6" rx="2.5" ry="2" fill="#475569"/>
      <ellipse cx="77" cy="34" rx="2.5" ry="2" fill="#475569"/>
      <rect x="88" y="5" width="7" height="30" rx="3" fill="#60a5fa" opacity="0.9"/>
      <rect x="89" y="6" width="5" height="28" rx="2" fill="#93c5fd" opacity="0.5"/>
      <ellipse cx="8" cy="20" rx="3" ry="4" fill="#fbbf24" opacity="0.15"/>
    </svg>
  );
}

function RacingTimeline({ timeline }) {
  const [active, setActive] = useState(3);
  const [prevActive, setPrevActive] = useState(3);
  const [moving, setMoving] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const positions = timeline.map((_, i) => 6 + (i / (timeline.length - 1)) * 88);

  const handleSelect = (i) => {
    if (i === active) return;
    setPrevActive(active);
    setMoving(true);
    setActive(i);
    setTimeout(() => setMoving(false), 1000);
    setAnimKey(k => k + 1);
  };

  const movingRight = active > prevActive;

  return (
    <div>
      {/* Labels above road */}
      <div style={{ position: "relative", height: 72, marginBottom: 0 }}>
        {timeline.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            style={{ position: "absolute", left: `${positions[i]}%`, transform: "translateX(-50%)", bottom: 0, textAlign: "center", cursor: "pointer", width: 110 }}
          >
            <div style={{ fontSize: 11, color: active === i ? C.blue : C.dim, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 2, transition: "color 0.4s", whiteSpace: "nowrap" }}>{item.year}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: active === i ? C.text : C.muted, transition: "color 0.4s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
            <div style={{ width: 1, height: 14, background: active === i ? C.blue : "rgba(255,255,255,0.12)", margin: "5px auto 0", transition: "background 0.4s" }} />
          </div>
        ))}
      </div>

      {/* Road */}
      <div style={{ position: "relative", height: 90, borderRadius: 10, overflow: "visible", background: "linear-gradient(180deg, #0d1526 0%, #0f1a30 50%, #0d1526 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 4px 16px rgba(0,0,0,0.7), inset 0 -4px 16px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: "repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.008) 40px,rgba(255,255,255,0.008) 41px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 7, background: "repeating-linear-gradient(90deg,#dc2626 0px,#dc2626 16px,#f1f5f9 16px,#f1f5f9 32px)", borderRadius: "10px 10px 0 0", opacity: 0.85 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 7, background: "repeating-linear-gradient(90deg,#dc2626 0px,#dc2626 16px,#f1f5f9 16px,#f1f5f9 32px)", borderRadius: "0 0 10px 10px", opacity: 0.85 }} />
        <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg,transparent,#fbbf24 4%,#fbbf24 96%,transparent)", opacity: 0.8 }} />
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg,transparent,#fbbf24 4%,#fbbf24 96%,transparent)", opacity: 0.8 }} />
        <div style={{ position: "absolute", top: "50%", left: "2%", right: "2%", height: 0, transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 14 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.18)", borderRadius: 1 }} />
          ))}
        </div>

        {/* Milestone dots */}
        {timeline.map((item, i) => (
          <div key={i} onClick={() => handleSelect(i)} style={{ position: "absolute", left: `${positions[i]}%`, top: "50%", transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: 5 }}>
            {active === i && (
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: "rgba(96,165,250,0.12)", border: `1px solid rgba(96,165,250,0.3)`, animation: "pulseRing 2s ease infinite" }} />
            )}
            <div style={{ width: active === i ? 16 : 11, height: active === i ? 16 : 11, borderRadius: "50%", background: active === i ? C.blue : "rgba(148,163,184,0.25)", border: `2px solid ${active === i ? C.blue : "rgba(148,163,184,0.4)"}`, boxShadow: active === i ? `0 0 18px ${C.blue}, 0 0 36px rgba(96,165,250,0.25)` : "none", transition: "all 0.4s ease" }} />
          </div>
        ))}

        {/* F1 Car */}
        <div style={{ position: "absolute", left: `${positions[active]}%`, top: "50%", transform: "translate(-50%,-50%)", transition: "left 0.95s cubic-bezier(0.25,0.46,0.45,0.94)", zIndex: 10 }}>
          {moving && (
            <div style={{ position: "absolute", [movingRight ? "right" : "left"]: "90%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: movingRight ? "row-reverse" : "row", gap: 4, alignItems: "center", pointerEvents: "none" }}>
              {[52, 36, 22, 12].map((w, i) => (
                <div key={i} style={{ width: w, height: i < 2 ? 2 : 1.5, background: `rgba(96,165,250,${0.55 - i * 0.12})`, borderRadius: 1 }} />
              ))}
            </div>
          )}
          <F1CarSVG glow={moving} />
        </div>
      </div>

      {/* Icons below road */}
      <div style={{ position: "relative", height: 52, marginBottom: 28 }}>
        {timeline.map((item, i) => (
          <div key={i} onClick={() => handleSelect(i)} style={{ position: "absolute", left: `${positions[i]}%`, transform: "translateX(-50%)", top: 0, textAlign: "center", cursor: "pointer" }}>
            <div style={{ width: 1, height: 14, background: active === i ? C.blue : "rgba(255,255,255,0.1)", margin: "0 auto 4px", transition: "background 0.4s" }} />
            <span style={{ fontSize: 20, display: "block", transform: active === i ? "scale(1.25)" : "scale(1)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}>{item.icon}</span>
          </div>
        ))}
      </div>

      {/* Details panel */}
      <div key={animKey} style={{ padding: "28px 32px", borderRadius: 20, border: `1px solid ${C.borderBlue}`, background: "linear-gradient(135deg,rgba(59,130,246,0.06),rgba(167,139,250,0.03))", backdropFilter: "blur(12px)", animation: "detailReveal 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <span style={{ fontSize: 30 }}>{timeline[active].icon}</span>
          <div>
            <div style={{ fontSize: 11, color: C.blue, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 2 }}>{timeline[active].year}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 2px", letterSpacing: "-0.02em" }}>{timeline[active].title}</h3>
            <div style={{ fontSize: 13, color: C.purple }}>{timeline[active].sub}</div>
          </div>
        </div>
        <p style={{ color: C.muted, lineHeight: 1.75, margin: 0, fontSize: 14 }}>{timeline[active].detail}</p>
      </div>
    </div>
  );
}

function HoverBtn({ children, onClick, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "13px 36px", borderRadius: 100, border: `1px solid rgba(96,165,250,0.35)`,
        background: hovered ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)",
        color: C.blue, fontSize: 15, fontWeight: 600, cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 30px rgba(59,130,246,0.18)" : "none",
        transition: "all 0.3s ease", letterSpacing: "0.02em", ...style,
      }}
    >{children}</button>
  );
}

function ContactBtn({ icon, label, color, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 9, padding: "12px 26px",
        borderRadius: 100, border: `1px solid ${hovered ? `${color}55` : `${color}25`}`,
        background: hovered ? `${color}18` : `${color}0d`,
        color, fontSize: 14, fontWeight: 600, textDecoration: "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px ${color}18` : "none",
        transition: "all 0.3s ease",
      }}
    >{icon}{label}</a>
  );
}

export default function App() {
  const [scroll, setScroll] = useState(0);
  const [keys, setKeys] = useState("");
  const [egg, setEgg] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [flipped, setFlipped] = useState(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScroll((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setShowTop(el.scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const updated = (keys + e.key).slice(-7);
      setKeys(updated);
      if (updated === "nextlap") {
        setEgg(true);
        setTimeout(() => { setEgg(false); setKeys(""); }, 4500);
      }
    };
    window.addEventListener("keypress", onKey);
    return () => window.removeEventListener("keypress", onKey);
  }, [keys]);

  const timeline = [
    { year: "2006–2019", title: "School Years", sub: "Where curiosity was born", detail: "Science, mathematics, and a growing fascination with how things work laid the foundation for everything that followed. The classroom was just the starting line.", icon: "📚" },
    { year: "2019–2023", title: "Engineering", sub: "Building technical foundations", detail: "Four years of problem-solving, late-night debugging, and learning to think systematically. Graduated with a deep love for technology and a hunger to apply it meaningfully.", icon: "⚙️" },
    { year: "2022–2023", title: "Research", sub: "First academic milestone", detail: "Contributed original research and got it published — discovering the thrill of adding something new to human knowledge. Taught me patience, rigor, and creative thinking.", icon: "📄" },
    { year: "2023", title: "AI Projects", sub: "Building real things", detail: "Built MindVarta — an AI-powered mental health assistant for students — and a multi-model sentiment analysis system. Technology meeting human impact.", icon: "🤖" },
    { year: "2025", title: "MBA @ XIM", sub: "The next lap begins", detail: "Transitioning from building technology to leading with it. Joining XIM University to learn business strategy, leadership, and how to drive impact at scale.", icon: "🎓" },
  ];

  const projects = [
    { title: "MindVarta", tag: "Mental Health AI", color: C.purple, icon: "🧠", desc: "An AI-powered assistant designed to support student well-being through empathetic conversations and intelligent guidance.", problem: "Students lack accessible mental health support", outcome: "An AI companion that listens and guides", learning: "Technology is most powerful when it's most human" },
    { title: "Sentiment Analysis System", tag: "Machine Learning", color: C.blue, icon: "📊", desc: "A machine learning pipeline that classifies and understands sentiment in text using multiple models and NLP techniques.", problem: "Extracting meaning from unstructured text", outcome: "Accurate multi-model sentiment classification", learning: "Data tells stories — the right model reveals them" },
    { title: "Research Publication", tag: "Academic Research", color: C.green, icon: "📝", desc: "An original research contribution, peer-reviewed and published — a first step into the world of academic inquiry.", problem: "Identifying a gap in existing literature", outcome: "Published peer-reviewed research paper", learning: "Rigor and curiosity together create lasting knowledge" },
  ];

  const skills = [
    { category: "Technical", icon: <Code size={18} />, color: C.blue, items: ["Python", "Machine Learning", "Deep Learning", "NLP", "Data Analysis"] },
    { category: "AI & Research", icon: <Brain size={18} />, color: C.purple, items: ["Sentiment Analysis", "AI Assistants", "Research Methods", "Model Building"] },
    { category: "Business & Strategy", icon: <BarChart2 size={18} />, color: C.green, items: ["Strategic Thinking", "Analytics", "Problem Solving", "Communication"] },
  ];

  const hobbies = [
    { icon: "🏎️", title: "Formula 1", color: C.amber, desc: "A passion since childhood. There's something magnetic about watching human ingenuity and raw courage combine at 300 km/h.", tags: ["Strategy nerd", "Race weekends", "Data & telemetry"], quote: "Every race is a chess match played at full throttle." },
    { icon: "💻", title: "Technology", color: C.blue, desc: "I genuinely enjoy exploring new frameworks, reading about AI breakthroughs, and building small experiments just to understand how things work.", tags: ["AI & ML", "Building things", "Side projects"], quote: "The best way to understand tech is to break it first." },
    { icon: "📚", title: "Reading", color: C.purple, desc: "Business books, research papers, biographies of founders — I'm always mid-way through something. Ideas compound just like interest.", tags: ["Business books", "Research papers", "Biographies"], quote: "A book a month is a career in a decade." },
    { icon: "🧩", title: "Problem Solving", color: C.green, desc: "Whether it's an algorithmic puzzle, a strategic challenge, or figuring out why a model won't converge — I find deep satisfaction in cracking hard problems.", tags: ["Algorithms", "Strategy puzzles", "Debugging"], quote: "Hard problems are just good problems in disguise." },
  ];

  const values = [
    { title: "Curiosity", desc: "Every problem hides a lesson. I seek them out.", icon: "🔍" },
    { title: "Continuous Learning", desc: "The day I stop learning is the day I stop growing.", icon: "📈" },
    { title: "Adaptability", desc: "From engineering to management — change is a feature, not a bug.", icon: "🔄" },
    { title: "Impact", desc: "Technology only matters if it makes a difference to people.", icon: "💡" },
  ];

  const mbaGoals = [
    { goal: "Bridge AI and business", pct: 95 },
    { goal: "Learn business strategy", pct: 90 },
    { goal: "Build leadership skills", pct: 85 },
    { goal: "Understand markets & finance", pct: 80 },
    { goal: "Expand professional network", pct: 75 },
  ];

  const funFacts = [
    { front: "🏎️", label: "F1 Fanatic", back: "Formula 1 taught me that strategy, split-second decisions, and teamwork win championships — not just raw speed." },
    { front: "📄", label: "Published Researcher", back: "Turned months of reading, hypothesizing, and writing into a peer-reviewed research paper." },
    { front: "🤖", label: "AI Builder", back: "Built multiple AI projects independently — not for grades, but because solving real problems is genuinely exciting." },
    { front: "🎯", label: "Problem Solver", back: "Give me a complex problem and I'll stay up late figuring it out. That's a promise, not a warning." },
    { front: "🚀", label: "Embracing Change", back: "Leaping from technical comfort into business leadership — because growth lives outside the comfort zone." },
  ];

  const faqs = [
    { q: "Why MBA?", a: "I realized that great technology alone doesn't create impact — smart leadership and strategy do. An MBA is how I bridge what I've built with how to scale it meaningfully." },
    { q: "Why technology?", a: "Technology is the most powerful problem-solving tool we've invented. Working with AI showed me how it can genuinely improve lives — and that fascination hasn't faded." },
    { q: "What's your favorite project?", a: "MindVarta, without question. Building something that could genuinely help a student in distress — that felt like technology fulfilling its deepest promise." },
    { q: "What's your biggest challenge ahead?", a: "Transitioning from a technical mindset to a leadership one. Shifting from 'how does this work?' to 'why does this matter and how do we create value with it?'" },
    { q: "Where do you see yourself in 10 years?", a: "Leading at the intersection of AI, strategy, and business — helping organizations make smarter, more human decisions through technology and data." },
  ];

  const sec = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Scroll progress */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 100, background: "rgba(255,255,255,0.04)" }}>
        <div style={{ height: "100%", width: `${scroll}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.purple})`, transition: "width 0.1s" }} />
      </div>

      {/* Easter egg */}
      {egg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6,9,15,0.96)", backdropFilter: "blur(24px)", animation: "fadeInEgg 0.4s ease" }}>
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🏎️</div>
            <div style={{ fontSize: 12, letterSpacing: "0.15em", color: C.blue, fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}>You found it</div>
            <div style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Easter Egg Unlocked</div>
            <div style={{ fontSize: 18, color: C.muted, fontStyle: "italic" }}>"Every expert was once a beginner."</div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <Fade delay={0.1}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 100, border: `1px solid ${C.border}`, background: C.bgCard, color: C.muted, fontSize: 12, marginBottom: 36, letterSpacing: "0.1em", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
            SATYAKI MUKHOPADHYAY · KOLKATA, INDIA
          </div>
        </Fade>

        <Fade delay={0.2}>
          <h1 style={{ fontSize: "clamp(54px,13vw,120px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", margin: "0 0 28px" }}>
            <span style={{ background: "linear-gradient(160deg,#f1f5f9 30%,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>The </span>
            <span style={{ background: `linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Next Lap</span>
          </h1>
        </Fade>

        <Fade delay={0.35}>
          <p style={{ fontSize: "clamp(15px,2.5vw,20px)", color: C.muted, maxWidth: 520, lineHeight: 1.7, margin: "0 0 48px" }}>
            From Engineering to Management.<br />
            From Building Models to Building Impact.
          </p>
        </Fade>

        <Fade delay={0.5}>
          <HoverBtn onClick={() => sec("snapshot")}>Begin the Journey ↓</HoverBtn>
        </Fade>
      </section>

      {/* SNAPSHOT */}
      <section id="snapshot" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Fade><div style={{ textAlign: "center", marginBottom: 56 }}><SectionLabel>Quick Snapshot</SectionLabel><SectionTitle>At a Glance</SectionTitle></div></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 18 }}>
            {[
              { label: "Current Role", value: "Engineering Graduate", icon: "⚙️" },
              { label: "Next Destination", value: "MBA @ XIM University", icon: "🎓" },
              { label: "Interests", value: "AI · Business · Formula 1", icon: "🎯" },
              { label: "Current Mission", value: "Where tech meets strategy", icon: "🚀" },
            ].map((item, i) => (
              <Fade key={item.label} delay={i * 0.1}>
                <Card accentColor={C.blue} style={{ padding: "28px 24px" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ color: C.dim, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{item.value}</div>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* RACING TIMELINE */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <SectionLabel>The Story</SectionLabel>
              <SectionTitle>The Journey So Far</SectionTitle>
              <p style={{ color: C.dim, marginTop: 12, fontSize: 13 }}>Click any milestone — watch the car race there</p>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <RacingTimeline timeline={timeline} />
          </Fade>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Fade><div style={{ textAlign: "center", marginBottom: 56 }}><SectionLabel>What I've Built</SectionLabel><SectionTitle>Projects</SectionTitle></div></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: 22 }}>
            {projects.map((p, i) => (
              <Fade key={p.title} delay={i * 0.12}>
                <Card accentColor={p.color} style={{ padding: 30, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <span style={{ fontSize: 34 }}>{p.icon}</span>
                    <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>{p.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{p.title}</h3>
                  <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 22px" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[{ l: "Problem", v: p.problem }, { l: "Outcome", v: p.outcome }, { l: "Learning", v: p.learning }].map(item => (
                      <div key={item.l} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: "0.08em", minWidth: 68, paddingTop: 1 }}>{item.l}</span>
                        <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{item.v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Fade><div style={{ textAlign: "center", marginBottom: 56 }}><SectionLabel>Toolkit</SectionLabel><SectionTitle>Skills & Strengths</SectionTitle></div></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px,1fr))", gap: 20 }}>
            {skills.map((s, i) => (
              <Fade key={s.category} delay={i * 0.1}>
                <Card accentColor={s.color} style={{ padding: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                    <div style={{ padding: 10, borderRadius: 12, background: `${s.color}12`, color: s.color }}>{s.icon}</div>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{s.category}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {s.items.map(item => (
                      <span key={item} style={{ padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>{item}</span>
                    ))}
                  </div>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* HOBBIES */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <SectionLabel>When I'm Not Studying</SectionLabel>
              <SectionTitle>Hobbies</SectionTitle>
            </div>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: 20 }}>
            {hobbies.map((h, i) => (
              <Fade key={h.title} delay={i * 0.1}>
                <Card accentColor={h.color} style={{ padding: 28 }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{h.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{h.title}</h3>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 18px" }}>{h.desc}</p>
                  <div style={{ padding: "10px 14px", borderRadius: 10, background: `${h.color}08`, border: `1px solid ${h.color}18`, marginBottom: 16 }}>
                    <p style={{ color: h.color, fontSize: 12, fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>"{h.quote}"</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {h.tags.map(tag => (
                      <span key={tag} style={{ padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${h.color}10`, color: h.color, border: `1px solid ${h.color}20` }}>{tag}</span>
                    ))}
                  </div>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Fade><div style={{ textAlign: "center", marginBottom: 56 }}><SectionLabel>What I Stand For</SectionLabel><SectionTitle>My Values</SectionTitle></div></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 18 }}>
            {values.map((v, i) => (
              <Fade key={v.title} delay={i * 0.1}>
                <Card accentColor={C.blue} style={{ padding: "28px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{v.title}</h3>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MBA */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <SectionLabel>The Decision</SectionLabel>
              <SectionTitle>Why MBA?</SectionTitle>
              <p style={{ color: C.muted, marginTop: 16, fontSize: 16, lineHeight: 1.7 }}>I've built systems that work. Now I want to build organizations that thrive.</p>
            </div>
          </Fade>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mbaGoals.map((item, i) => (
              <Fade key={item.goal} delay={i * 0.09}>
                <div style={{ padding: "18px 22px", borderRadius: 16, border: `1px solid ${C.border}`, background: C.bgCard }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.goal}</span>
                    <span style={{ fontSize: 13, color: C.blue, fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 100, background: "rgba(255,255,255,0.05)" }}>
                    <ProgressBar pct={item.pct} />
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <SectionLabel>Looking Ahead</SectionLabel>
            <SectionTitle>Where I Want To Go</SectionTitle>
          </Fade>
          <Fade delay={0.15}>
            <div style={{ marginTop: 32, padding: "44px 40px", borderRadius: 24, border: `1px solid rgba(96,165,250,0.18)`, background: "linear-gradient(135deg,rgba(59,130,246,0.05),rgba(167,139,250,0.03))", textAlign: "left" }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>🌐</div>
              <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: C.text, lineHeight: 1.8, margin: "0 0 32px", fontStyle: "italic", fontWeight: 300 }}>
                "I aim to work at the intersection of technology, analytics, and business strategy — helping organizations make smarter decisions through innovation and data-driven thinking."
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {["AI & Business Strategy", "Data-Driven Leadership", "Innovation Management", "Organizational Impact"].map(tag => (
                  <span key={tag} style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.14)", color: C.blue, fontSize: 13, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* FUN FACTS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <SectionLabel>Get to Know Me</SectionLabel>
              <SectionTitle>Fun Facts</SectionTitle>
              <p style={{ color: C.dim, marginTop: 10, fontSize: 13 }}>Click a card to flip it</p>
            </div>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px,1fr))", gap: 18 }}>
            {funFacts.map((f, i) => (
              <Fade key={i} delay={i * 0.08}>
                <FlipCard fact={f} isFlipped={flipped === i} onFlip={() => setFlipped(flipped === i ? null : i)} />
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Fade><div style={{ textAlign: "center", marginBottom: 56 }}><SectionLabel>Ask Me Anything</SectionLabel><SectionTitle>Common Questions</SectionTitle></div></Fade>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{ borderRadius: 16, border: `1px solid ${expandedFAQ === i ? C.borderBlue : C.border}`, background: expandedFAQ === i ? "rgba(59,130,246,0.04)" : C.bgCard, overflow: "hidden", transition: "all 0.3s" }}>
                  <button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)} style={{ width: "100%", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: 15, fontWeight: 600, textAlign: "left", gap: 12 }}>
                    {faq.q}
                    <ChevronDown size={16} style={{ color: C.dim, transform: expandedFAQ === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }} />
                  </button>
                  {expandedFAQ === i && (
                    <div style={{ padding: "0 22px 18px", color: C.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
                  )}
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: "100px 24px 140px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <SectionLabel>Let's Connect</SectionLabel>
            <SectionTitle>Get In Touch</SectionTitle>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, margin: "20px 0 48px" }}>
              Whether it's about technology, business ideas, or just a good conversation — I'd love to hear from you.
            </p>
          </Fade>
          <Fade delay={0.15}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <ContactBtn icon={<Link size={18} />} label="LinkedIn" color="#38bdf8" href="https://www.linkedin.com/in/satyaki-mukhopadhyay-6b6197246/" />
              <ContactBtn icon={<GitBranch size={18} />} label="GitHub" color={C.purple} href="https://github.com/Satskii" />
            </div>
          </Fade>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", textAlign: "center", color: C.dim, fontSize: 12, letterSpacing: "0.05em" }}>
        Designed & crafted by Satyaki Mukhopadhyay · The Next Lap © 2025
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 32, right: 32, width: 46, height: 46, borderRadius: "50%", border: `1px solid ${C.border}`, background: "rgba(6,9,15,0.85)", backdropFilter: "blur(12px)", color: C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderBlue; e.currentTarget.style.color = C.blue; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
        >
          <ArrowUp size={17} />
        </button>
      )}

      <style>{`
        @keyframes fadeInEgg { from { opacity:0 } to { opacity:1 } }
        @keyframes pulseRing { 0%,100% { transform:scale(1); opacity:0.6 } 50% { transform:scale(1.15); opacity:0.3 } }
        @keyframes detailReveal { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { margin:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#06090f; }
        ::-webkit-scrollbar-thumb { background:#1e3a5f; border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:#2563eb; }
      `}</style>
    </div>
  );
}
