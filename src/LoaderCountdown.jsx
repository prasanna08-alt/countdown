import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Install:  npm install framer-motion
  Use:      import LoaderCountdown from "./LoaderCountdown";
            <LoaderCountdown />
*/

const START = 10;
const C = 2 * Math.PI * 104; // circumference of the progress ring (r = 104)

const css = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600&display=swap');

.loader-page{
  min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
  background:radial-gradient(circle at 30% 20%, #0f1d3a 0%, #070b18 60%, #04060e 100%);
  font-family:'Rajdhani',sans-serif; padding:24px;
}
.loader-title{
  font-family:'Orbitron',sans-serif; font-weight:700; font-size:30px; letter-spacing:.32em;
  margin:0; background:linear-gradient(90deg,#00f8ff,#3b82f6 50%,#a855f7);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter:drop-shadow(0 0 10px rgba(0,248,255,.45));
}
.loader-sub{
  font-size:11px; letter-spacing:.3em; color:rgba(160,190,230,.6); margin:8px 0 26px;
}
.loader-card{
  position:relative; width:320px; padding:28px 20px 26px; border-radius:22px;
  display:flex; flex-direction:column; align-items:center; overflow:hidden;
  background:linear-gradient(145deg, rgba(12,30,55,.85), rgba(20,14,45,.85));
  backdrop-filter:blur(8px);
  box-shadow:0 0 30px rgba(0,180,255,.15), inset 0 0 30px rgba(120,60,255,.08);
}
.loader-card::before{
  content:""; position:absolute; inset:0; border-radius:22px; padding:1px; pointer-events:none;
  background:linear-gradient(135deg,#00c8ff,rgba(0,200,255,.15) 45%,#a855f7);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
}
.loader-stage{
  position:relative; width:288px; height:288px; display:flex; align-items:center;
  justify-content:center; margin-bottom:28px;
}
.loader-svg{ position:absolute; inset:0; filter:drop-shadow(0 0 8px rgba(0,180,255,.55)); }
.orbit-track{ fill:none; stroke-width:1; }
.track-outer{ stroke:rgba(0,248,255,0.05); }
.track-middle{ stroke:rgba(168,85,247,0.04); }
.loader-core{
  position:relative; width:112px; height:112px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  background:radial-gradient(circle,#0a1830 0%,#050a16 80%);
  box-shadow:0 0 25px rgba(0,180,255,.35), inset 0 0 20px rgba(0,0,0,.8);
}
.loader-number{
  font-family:'Orbitron',sans-serif; font-weight:900; font-size:52px; color:#eaffff;
  text-shadow:0 0 8px #00f8ff,0 0 20px #00b4ff,0 0 40px #0070ff;
}
.loader-actions{ display:flex; gap:14px; }
.neon-btn{
  font-family:'Orbitron',sans-serif; font-size:12px; letter-spacing:.18em; font-weight:700;
  padding:9px 22px; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:8px;
  background:rgba(10,30,60,.6); color:#00d8ff; border:1px solid rgba(0,200,255,.55);
  box-shadow:0 0 10px rgba(0,200,255,.25), inset 0 0 10px rgba(0,200,255,.08);
  text-shadow:0 0 6px rgba(0,220,255,.7);
}
.neon-btn.purple{
  color:#c084fc; border-color:rgba(168,85,247,.55); background:rgba(40,15,70,.5);
  box-shadow:0 0 10px rgba(168,85,247,.25), inset 0 0 10px rgba(168,85,247,.08);
  text-shadow:0 0 6px rgba(192,132,252,.7);
}
.neon-btn:disabled{ opacity:.35; cursor:not-allowed; }
.coming-soon{
  position:absolute; inset:0; z-index:5; display:flex; flex-direction:column;
  align-items:center; justify-content:center; text-align:center; gap:10px;
  background:rgba(4,8,20,.88); backdrop-filter:blur(6px); border-radius:22px;
}
.coming-soon h2{
  font-family:'Orbitron',sans-serif; font-size:26px; letter-spacing:.2em; margin:0; color:#eaffff;
  text-shadow:0 0 8px #00f8ff,0 0 22px #a855f7,0 0 40px #a855f7;
}
.coming-soon p{ margin:0; font-size:13px; letter-spacing:.25em; color:rgba(180,200,240,.7); }
`;

export default function LoaderCountdown() {
  const [count, setCount] = useState(START);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState(false);

  // Countdown: one timeout per number, so pausing keeps the current number
  useEffect(() => {
    if (!running || done) return;
    const t = setTimeout(() => {
      if (count <= 1) setDone(true);
      else setCount((c) => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [count, running, done]);

  const reset = () => {
    setCount(START);
    setDone(false);
    setRunning(true);
  };

  const progress = (count - 1) / (START - 1); // 1 -> 0

  return (
    <div className="loader-page">
      <style>{css}</style>

      <motion.h1
        className="loader-title"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        LOADER COUNTDOWN
      </motion.h1>
      <div className="loader-sub">NEURAL TIMER SUBSYSTEM</div>

      <div className="loader-card">
        <div className="loader-stage">
          <svg className="loader-svg" viewBox="0 0 288 288">
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00c8ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* faint tracks */}
            <circle className="orbit-track track-outer" cx="144" cy="144" r="138" />
            <circle className="orbit-track track-middle" cx="144" cy="144" r="122" />

            {/* thin cyan arc, slow spin */}
            <motion.circle
              cx="144" cy="144" r="132" fill="none" stroke="#00d8ff" strokeWidth="1.5"
              strokeDasharray="90 740" strokeLinecap="round" opacity="0.8"
              style={{ originX: "144px", originY: "144px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />

            {/* purple arc, reverse spin */}
            <motion.circle
              cx="144" cy="144" r="120" fill="none" stroke="#a855f7" strokeWidth="2"
              strokeDasharray="60 700" strokeLinecap="round" opacity="0.8"
              style={{ originX: "144px", originY: "144px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* progress ring track */}
            <circle cx="144" cy="144" r="104" fill="none" stroke="rgba(0,180,255,.12)" strokeWidth="9" />
            {/* progress ring (shrinks as the count goes down) */}
            <motion.circle
              cx="144" cy="144" r="104" fill="none" stroke="url(#ringGrad)" strokeWidth="9"
              strokeLinecap="round" strokeDasharray={C}
              style={{ rotate: -90, originX: "144px", originY: "144px" }}
              animate={{ strokeDashoffset: C * (1 - (done ? 0 : progress)) }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />

            {/* inner blue ring */}
            <circle cx="144" cy="144" r="84" fill="none" stroke="#0a84ff" strokeWidth="5"
              opacity="0.9" />

            {/* orbiting dots */}
            <motion.g
              style={{ originX: "144px", originY: "144px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="144" cy="40" r="5" fill="#00b4ff" />
              <circle cx="226" cy="196" r="4" fill="#a855f7" />
            </motion.g>
            <motion.g
              style={{ originX: "144px", originY: "144px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="60" cy="72" r="3.5" fill="#c084fc" />
              <circle cx="198" cy="150" r="3.5" fill="#00d8ff" />
            </motion.g>
          </svg>

          <div className="loader-core">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                className="loader-number"
                initial={{ scale: 0.6, opacity: 0, filter: "blur(6px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.3, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.25 }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="loader-actions">
          <motion.button
            className="neon-btn"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            disabled={done}
            onClick={() => setRunning((r) => !r)}
          >
            <span>{running ? "❚❚" : "▶"}</span>
            {running ? "PAUSE" : "RESUME"}
          </motion.button>

          <motion.button
            className="neon-btn purple"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={reset}
          >
            <span>↻</span> RESET
          </motion.button>
        </div>

        {/* Coming soon popup */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="coming-soon"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                COMING SOON
              </motion.h2>
              <p>SYSTEM INITIALIZING</p>
              <motion.button
                className="neon-btn purple"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={reset}
                style={{ marginTop: 12 }}
              >
                <span>↻</span> RESET
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
