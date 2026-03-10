import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/baseapi";

/* ─── inline SVG icons ───────────────────────────────────────────── */
const Icon = ({ d, size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d={d} />
  </svg>
);
const SendIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const SparkleIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.88 5.76a2 2 0 001.27 1.27L21 12l-5.85 1.97a2 2 0 00-1.27 1.27L12 21l-1.88-5.76a2 2 0 00-1.27-1.27L3 12l5.85-1.97a2 2 0 001.27-1.27L12 3z" />
  </svg>
);

/* ─── bg ─────────────────────────────────────────────────────────── */
const bgStyle = {
  background: `
    radial-gradient(ellipse 80% 55% at 5% 0%, rgba(99,102,241,.12) 0%, transparent 55%),
    radial-gradient(ellipse 55% 50% at 95% 100%, rgba(139,92,246,.09) 0%, transparent 50%),
    #070a12
  `,
};

const MOCK_HISTORY = [
  {
    id: 1,
    role: "user",
    text: "Create an ecommerce landing page with hero, featured products, and a sticky cart button.",
  },
  {
    id: 2,
    role: "ai",
    text: "Done! Built a full e-commerce SPA with animated hero, product grid, and a sticky cart. Responsive design applied.",
  },
];

/* ═══════════════════════════════════════════════════════════════════ */
const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [sending, setSending] = useState(false);
  const [tab, setTab] = useState("preview");
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await api.get(`/website/${id}`);
        setWebsite(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWebsite();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSend = async () => {
    if (!prompt.trim() || sending) return;
    setHistory((h) => [...h, { id: Date.now(), role: "user", text: prompt }]);
    setPrompt("");
    setSending(true);
    setTimeout(() => {
      setHistory((h) => [
        ...h,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Applying your changes to the live preview now…",
        },
      ]);
      setSending(false);
    }, 1400);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={bgStyle}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-violet-500/20 border-b-violet-400 animate-spin [animation-direction:reverse] [animation-duration:.8s]" />
          </div>
          <p className="text-sm text-slate-400 tracking-widest uppercase text-[11px]">
            Loading workspace
          </p>
        </div>
      </div>
    );
  }

  const projectName = website?.title || "AI Website Editor";

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ ...bgStyle, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── TOPBAR ──────────────────────────────────────────────────── */}
      <header
        className="shrink-0 flex items-center justify-between px-4 sm:px-5 gap-3"
        style={{
          height: 52,
          background: "rgba(7,10,18,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* left: logo + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center text-white text-[11px] font-black select-none shrink-0"
            style={{
              background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)",
              boxShadow: "0 0 18px rgba(99,102,241,.5)",
            }}
          >
            AI
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hover:text-slate-200 cursor-pointer transition-colors">
              Projects
            </span>
            <span>/</span>
            <span className="text-slate-200 font-medium truncate max-w-[180px]">
              {projectName}
            </span>
          </div>
          <span className="sm:hidden text-sm font-semibold text-slate-100 truncate max-w-[140px]">
            {projectName}
          </span>
        </div>

        {/* center: tabs */}
        <div
          className="hidden sm:flex items-center gap-0.5 rounded-xl p-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {["preview", "code"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all capitalize tracking-wide"
              style={{ color: tab === t ? "#fff" : "rgba(255,255,255,.38)" }}
            >
              {tab === t && (
                <motion.span
                  layoutId="tabhl"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(99,102,241,.3)",
                    border: "1px solid rgba(99,102,241,.38)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        {/* right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:text-white transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Icon d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" size={12} />
            Share
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 4px 18px rgba(99,102,241,.45)",
            }}
          >
            <Icon
              d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
              size={12}
            />
            Deploy
          </button>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────── */}
      <main
        className="flex-1 flex overflow-hidden p-3 gap-3"
        style={{ minHeight: 0 }}
      >
        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="hidden lg:flex shrink-0 w-72 xl:w-80 flex-col rounded-2xl overflow-hidden"
          style={{
            background: "rgba(11,14,24,0.85)",
            border: "1px solid rgba(255,255,255,0.065)",
            backdropFilter: "blur(28px)",
          }}
        >
          {/* sidebar header */}
          <div
            className="px-4 py-3 flex items-center justify-between shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(99,102,241,.18)",
                  border: "1px solid rgba(99,102,241,.28)",
                }}
              >
                <SparkleIcon size={12} />
              </div>
              <span className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase">
                Prompt History
              </span>
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: "rgba(16,185,129,.1)",
                color: "#34d399",
                border: "1px solid rgba(16,185,129,.22)",
              }}
            >
              ● Live
            </span>
          </div>

          {/* messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            style={{ scrollbarWidth: "none" }}
          >
            {history.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* avatar */}
                <div
                  className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold mt-0.5"
                  style={
                    msg.role === "ai"
                      ? {
                          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                          boxShadow: "0 0 10px rgba(99,102,241,.4)",
                          color: "#fff",
                        }
                      : {
                          background: "rgba(255,255,255,0.09)",
                          color: "rgba(255,255,255,0.55)",
                        }
                  }
                >
                  {msg.role === "ai" ? <SparkleIcon size={10} /> : "U"}
                </div>

                {/* bubble */}
                <div
                  className="max-w-[84%] px-3 py-2 text-[11px] leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "rgba(99,102,241,.15)",
                          border: "1px solid rgba(99,102,241,.22)",
                          color: "#c7d2fe",
                          borderRadius: "14px 4px 14px 14px",
                        }
                      : {
                          background: "rgba(255,255,255,.045)",
                          border: "1px solid rgba(255,255,255,.075)",
                          color: "rgba(255,255,255,.7)",
                          borderRadius: "4px 14px 14px 14px",
                        }
                  }
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* typing dots */}
            {sending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                <div
                  className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  }}
                >
                  <SparkleIcon size={10} />
                </div>
                <div
                  className="px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1"
                  style={{
                    background: "rgba(255,255,255,.045)",
                    border: "1px solid rgba(255,255,255,.075)",
                  }}
                >
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* input */}
          <div
            className="px-3 pb-3 pt-2 shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
          >
            <div
              className="rounded-2xl p-2.5 flex items-end gap-2 transition-all"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Describe what to change…"
                className="flex-1 resize-none bg-transparent text-[12px] text-slate-200 placeholder:text-slate-600 focus:outline-none leading-relaxed"
                style={{ minHeight: 38 }}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleSend}
                disabled={!prompt.trim() || sending}
                className="h-8 w-8 shrink-0 rounded-xl flex items-center justify-center text-white disabled:opacity-25 transition-all"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 0 16px rgba(99,102,241,.5)",
                }}
              >
                <SendIcon />
              </motion.button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-700">
              <kbd className="px-1 py-px rounded bg-white/5 text-slate-600 font-mono text-[9px]">
                ↵
              </kbd>{" "}
              Send &nbsp;·&nbsp;
              <kbd className="px-1 py-px rounded bg-white/5 text-slate-600 font-mono text-[9px]">
                ⇧↵
              </kbd>{" "}
              Newline
            </p>
          </div>
        </motion.aside>

        {/* ── PREVIEW ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="flex-1 flex flex-col rounded-2xl overflow-hidden min-w-0"
          style={{
            background: "rgba(11,14,24,0.8)",
            border: "1px solid rgba(255,255,255,0.065)",
            backdropFilter: "blur(28px)",
          }}
        >
          {/* browser chrome */}
          <div
            className="shrink-0 px-4 py-2 flex items-center gap-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.055)",
              background: "rgba(7,10,18,.65)",
            }}
          >
            {/* traffic lights */}
            <div className="flex items-center gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full"
                  style={{ background: c, opacity: 0.8 }}
                />
              ))}
            </div>

            {/* fake url bar */}
            <div
              className="flex-1 max-w-xs mx-auto flex items-center gap-2 rounded-lg px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.065)",
              }}
            >
              <span className="text-[10px]">🔒</span>
              <span className="text-[11px] text-slate-500 truncate">
                {website?.title
                  ? `${website.title.toLowerCase().replace(/\s+/g, "-")}.vercel.app`
                  : "preview.localhost"}
              </span>
            </div>

            {/* right: live badge + viewport icons */}
            <div className="flex items-center gap-2 ml-auto">
              {[
                "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                "M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m14 0H4m16 0l1 4H3l1-4",
              ].map((d, i) => (
                <button
                  key={i}
                  className="h-6 w-6 rounded-md flex items-center justify-center text-slate-600 hover:text-slate-300 transition-colors"
                >
                  <Icon d={d} size={12} />
                </button>
              ))}
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold"
                style={{
                  background: "rgba(16,185,129,.1)",
                  color: "#34d399",
                  border: "1px solid rgba(16,185,129,.2)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>
          </div>

          {/* iframe */}
          <div className="flex-1 relative bg-white" style={{ minHeight: 0 }}>
            <iframe
              srcDoc={
                website?.latestCode ||
                `<div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:12px;font-family:sans-serif;background:#f8fafc;color:#94a3b8"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg><p style="font-size:13px">No preview yet. Send a prompt to generate your site.</p></div>`
              }
              title="Website preview"
              className="w-full h-full border-none block"
            />

            {/* loading overlay */}
            <AnimatePresence>
              {sending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: "rgba(7,10,18,.6)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 rounded-2xl px-6 py-4"
                    style={{
                      background: "rgba(11,14,24,.95)",
                      border: "1px solid rgba(99,102,241,.3)",
                      boxShadow: "0 0 40px rgba(99,102,241,.2)",
                    }}
                  >
                    <div className="h-5 w-5 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
                    <span className="text-sm text-slate-300 font-medium">
                      Regenerating preview…
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Editor;
