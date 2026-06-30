import { useEffect, useState } from "react";
import type { BackstageAnnotations, BackstageAnnotation, BackstageStatus } from "./types";

/**
 * Backstage — a backend-explainer overlay for prototype demos.
 *
 * Render once at the app root: <Backstage annotations={annotations} />
 * Tag elements in your prototype with data-backstage="<id>" matching a key in `annotations`.
 *
 * Off by default. A tab peeks on the right edge; opening it reveals an inspector (top) over a
 * live event log (bottom). Hovering an annotated element previews its backend; clicking logs
 * an event AND lets the click through, so the prototype keeps working during a demo.
 */

const PANEL_W = 412; // px — keep in sync with the handle offset and panel width below

const TYPE_LABEL: Record<string, string> = { api: "API", db: "DB", svc: "SVC", calc: "CALC", mock: "MOCK" };
const STATUS_STYLE: Record<BackstageStatus, string> = {
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  mock: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  tbd: "bg-orange-500/15 text-orange-300 border-orange-500/50",
};

interface LogItem extends BackstageAnnotation { time: string; key: number }

export default function Backstage({
  annotations,
  defaultOpen = false,
}: { annotations: BackstageAnnotations; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [active, setActive] = useState<string | null>(null);
  const [ioTab, setIoTab] = useState<"req" | "res">("req");
  const [log, setLog] = useState<LogItem[]>([]);

  // Inject highlight styles for tagged targets, only while the panel is open.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body.backstage-open [data-backstage]{cursor:help;border-radius:8px;transition:box-shadow .12s}
      body.backstage-open [data-backstage]:hover{box-shadow:0 0 0 2px #fff,0 0 0 4px #0070e0}
      body.backstage-open [data-backstage].backstage-pinned{box-shadow:0 0 0 2px #fff,0 0 0 4px #7c3aed}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => { document.body.classList.toggle("backstage-open", open); }, [open]);

  // Event delegation: hover previews, click pins + logs. Navigation is NOT blocked.
  useEffect(() => {
    if (!open) return;
    const find = (e: Event) => (e.target as HTMLElement)?.closest?.("[data-backstage]") as HTMLElement | null;
    const onOver = (e: Event) => { const el = find(e); if (el) setActive(el.dataset.backstage!); };
    const onClick = (e: Event) => {
      const el = find(e); if (!el) return;
      const id = el.dataset.backstage!; const a = annotations[id]; if (!a) return;
      document.querySelectorAll("[data-backstage].backstage-pinned").forEach(n => n.classList.remove("backstage-pinned"));
      el.classList.add("backstage-pinned");
      setActive(id);
      setLog(prev => [{
        ...a,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        key: Date.now() + Math.random(),
      }, ...prev]);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("mouseover", onOver); document.removeEventListener("click", onClick); };
  }, [open, annotations]);

  const a = active ? annotations[active] : null;
  const Badge = ({ s }: { s: BackstageStatus }) => (
    <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full border ${STATUS_STYLE[s]}`}>{s}</span>
  );

  return (
    <>
      {/* Peeking handle */}
      <button
        aria-label="Toggle Backstage backend overlay"
        onClick={() => setOpen(o => !o)}
        className="fixed top-1/2 -translate-y-1/2 z-[60] w-10 h-32 rounded-l-xl text-white flex flex-col items-center justify-center gap-2 shadow-xl transition-[right] duration-300"
        style={{ right: open ? PANEL_W : 0, background: "linear-gradient(180deg,#003087,#0070e0)" }}
      >
        <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-extrabold tracking-widest">BACKSTAGE</span>
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>❮</span>
      </button>

      {/* Panel */}
      <section
        className="fixed top-0 right-0 h-screen z-[55] flex flex-col bg-[#0f1115] text-slate-200 border-l border-slate-700/60 shadow-2xl transition-transform duration-300"
        style={{ width: PANEL_W, transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <header className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-700/60">
          <div className="w-7 h-7 grid place-items-center rounded-lg text-sm" style={{ background: "linear-gradient(135deg,#0070e0,#7c3aed)" }}>🎬</div>
          <div>
            <h1 className="text-sm font-extrabold leading-tight">Backstage</h1>
            <p className="text-[11px] text-slate-400 m-0">Hover to inspect · click to log</p>
          </div>
          <button aria-label="Close" onClick={() => setOpen(false)} className="ml-auto text-slate-400 text-xl leading-none">×</button>
        </header>

        {/* Inspector — top third */}
        <div className="h-[39%] overflow-y-auto px-4 py-4 border-b border-slate-700/60">
          <p className="text-[10.5px] font-extrabold tracking-[0.14em] text-slate-400 uppercase mb-2.5">Inspector</p>
          {!a ? (
            <div className="text-sm text-slate-400 leading-relaxed border border-dashed border-slate-700 rounded-lg p-4 text-center">
              Hover any <b className="text-slate-200">highlighted</b> element to see where its data comes from.
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2.5"><h2 className="text-base font-extrabold m-0">{a.label}</h2><Badge s={a.status} /></div>
              <Field lab="Data source">
                {a.sources.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#171a21] border border-slate-700/60 rounded-lg px-2.5 py-1.5 mb-1.5">
                    <span className="text-[9px] font-extrabold tracking-wide px-1.5 py-0.5 rounded bg-[#222633] text-indigo-300 uppercase">{TYPE_LABEL[s.type] ?? s.type}</span>
                    <span className="text-[12.5px] font-semibold">{s.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono ml-auto truncate">{s.ref}</span>
                  </div>
                ))}
              </Field>
              <Field lab="What it computes"><p className="text-[13px] leading-relaxed text-slate-200 m-0">{a.calc}</p></Field>
              <Field lab="Request / response">
                <div className="flex gap-1.5 mb-1.5">
                  {(["req", "res"] as const).map(t => (
                    <button key={t} onClick={() => setIoTab(t)} className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded border border-slate-700/60 ${ioTab === t ? "bg-[#1d2330] text-slate-200" : "bg-[#171a21] text-slate-400"}`}>{t === "req" ? "Request" : "Response"}</button>
                  ))}
                </div>
                <pre className="bg-[#0a0c10] border border-slate-700/60 rounded-lg px-3 py-2.5 text-[11.5px] leading-relaxed font-mono text-slate-300 overflow-x-auto m-0 whitespace-pre-wrap">{ioTab === "req" ? a.io.request : a.io.response}</pre>
              </Field>
              <Field lab="Presenter note"><div className="text-[12.5px] leading-relaxed text-slate-200 bg-violet-500/10 border border-violet-500/30 rounded-lg px-3 py-2">{a.presenter}</div></Field>
              {a.openQuestions?.length ? (
                <Field lab="Open questions">
                  {a.openQuestions.map((q, i) => (
                    <div key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-orange-100 bg-orange-500/10 border border-orange-500/30 rounded-lg px-2.5 py-2 mb-1.5">
                      <span className="shrink-0 w-4 h-4 grid place-items-center rounded-full bg-orange-600 text-white font-extrabold text-[11px]">?</span>{q}
                    </div>
                  ))}
                </Field>
              ) : null}
            </>
          )}
        </div>

        {/* Event log — bottom two-thirds */}
        <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-6">
          <div className="flex items-center mb-2.5">
            <p className="text-[10.5px] font-extrabold tracking-[0.14em] text-slate-400 uppercase m-0">Event log</p>
            <span className="ml-2 text-[10px] font-extrabold text-slate-200 bg-[#1d2330] rounded-full px-2">{log.length}</span>
            <button onClick={() => setLog([])} className="ml-auto text-[11px] font-bold text-slate-400 border border-slate-700/60 rounded-md px-2 py-0.5">Clear</button>
          </div>
          {log.length === 0 ? (
            <div className="text-[12.5px] text-slate-400 text-center py-6 leading-relaxed">Click highlighted elements to record what the backend does.</div>
          ) : log.map(item => (
            <div key={item.key} className="bg-[#171a21] border border-slate-700/60 rounded-xl px-3 py-2.5 mb-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[13px] font-extrabold">{item.action ?? item.label}</span>
                <Badge s={item.status} />
                <span className="ml-auto text-[10.5px] text-slate-400 font-mono">{item.time}</span>
              </div>
              <div className="text-[12px] leading-relaxed text-slate-300">{item.narration ?? item.calc}</div>
              <div className="text-[11px] font-mono text-indigo-300 mt-1.5 break-words">{item.sources.map(s => s.ref).join("  →  ")}</div>
              <div className="flex flex-wrap gap-1.5 mt-2">{item.sources.map((s, i) => <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#222633] text-indigo-300">{s.name}</span>)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({ lab, children }: { lab: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-[10.5px] font-extrabold tracking-[0.08em] text-slate-400 uppercase mb-1.5">{lab}</div>
      {children}
    </div>
  );
}
