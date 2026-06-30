/* ============================================================================
 * Backstage — framework-agnostic backend-explainer overlay for prototype demos.
 *
 * USAGE
 *   <script src="backstage.js"></script>
 *   <script>
 *     Backstage.init({
 *       balance: {
 *         label: "Available Balance",
 *         status: "live",                       // "live" | "mock" | "tbd"
 *         sources: [                            // where the data comes from
 *           { name: "Wallet Ledger", type: "svc", ref: "GET /v1/wallet/balance" }
 *           // type: "api" | "db" | "svc" | "calc" | "mock"
 *         ],
 *         calc: "Settled funds minus pending holds.",      // plain-English computation
 *         io: { request: "GET /v1/wallet/balance", response: "{ available: 882701 }" },
 *         presenter: "Real-time balance — already nets out reserves.",  // say aloud
 *         openQuestions: ["Are disputes deducted here or downstream?"],
 *         action: "Opened balance detail",      // optional log-card title
 *         narration: "Fetches live balance..."  // optional log-card story
 *       }
 *       // ...more entries...
 *     }, { defaultOpen: false, blockClicks: false });
 *   </script>
 *
 * Then tag elements:  <div data-backstage="balance">$8,827.01</div>
 *
 * The id in data-backstage must match a key above. Off by default; a tab peeks on the right.
 * Hover an element to inspect it; click to log an event. Clicks pass through by default so the
 * prototype keeps working (set blockClicks:true for dead-link demos).
 * ============================================================================ */
(function (global) {
  "use strict";

  var TYPE_LABEL = { api: "API", db: "DB", svc: "SVC", calc: "CALC", mock: "MOCK" };
  var PANEL_W = 412;

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function badge(s) { return '<span class="bks-badge bks-' + s + '">' + (s === "tbd" ? "TBD" : s) + "</span>"; }

  var STYLE = `
  body.bks-open [data-backstage]{cursor:help;border-radius:8px;transition:box-shadow .12s}
  body.bks-open [data-backstage]:hover{box-shadow:0 0 0 2px #fff,0 0 0 4px #0070e0}
  body.bks-open [data-backstage].bks-pinned{box-shadow:0 0 0 2px #fff,0 0 0 4px #7c3aed}
  .bks-handle{position:fixed;top:50%;right:0;transform:translateY(-50%);z-index:2147483000;width:40px;height:132px;
    background:linear-gradient(180deg,#003087,#0070e0);color:#fff;border:none;border-radius:12px 0 0 12px;cursor:pointer;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;box-shadow:-4px 0 18px rgba(0,0,0,.18);
    transition:right .32s cubic-bezier(.4,0,.2,1);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  body.bks-open .bks-handle{right:${PANEL_W}px}
  .bks-handle .vt{writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;font-weight:800;letter-spacing:1.5px}
  .bks-handle .ar{font-size:14px;transition:transform .3s}
  body.bks-open .bks-handle .ar{transform:rotate(180deg)}
  .bks-panel{position:fixed;top:0;right:0;height:100vh;width:${PANEL_W}px;background:#0f1115;color:#e7e9ee;z-index:2147482000;
    transform:translateX(100%);transition:transform .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;
    border-left:1px solid #272b34;box-shadow:-12px 0 36px rgba(0,0,0,.28);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  body.bks-open .bks-panel{transform:translateX(0)}
  .bks-head{padding:16px 18px;border-bottom:1px solid #272b34;display:flex;align-items:center;gap:10px;flex:0 0 auto}
  .bks-glyph{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#0070e0,#7c3aed);display:grid;place-items:center;font-size:15px}
  .bks-head h1{font-size:15px;margin:0;font-weight:800}
  .bks-head p{margin:1px 0 0;font-size:11.5px;color:#9aa3b2}
  .bks-x{margin-left:auto;background:none;border:none;color:#9aa3b2;font-size:20px;cursor:pointer;line-height:1}
  .bks-insp{flex:0 0 39%;overflow-y:auto;padding:16px 18px;border-bottom:1px solid #272b34}
  .bks-cap{font-size:10.5px;font-weight:800;letter-spacing:1.4px;color:#9aa3b2;text-transform:uppercase;margin:0 0 10px}
  .bks-empty{color:#9aa3b2;font-size:13px;line-height:1.6;border:1px dashed #272b34;border-radius:10px;padding:18px;text-align:center}
  .bks-title{display:flex;align-items:center;gap:8px;margin-bottom:10px}
  .bks-title h2{font-size:16px;margin:0;font-weight:800}
  .bks-badge{font-size:10px;font-weight:800;letter-spacing:.4px;padding:2px 8px;border-radius:20px;text-transform:uppercase;border:1px solid}
  .bks-live{background:rgba(31,157,85,.18);color:#5bd98a;border-color:rgba(31,157,85,.4)}
  .bks-mock{background:rgba(180,83,9,.16);color:#fbbf5a;border-color:rgba(180,83,9,.4)}
  .bks-tbd{background:rgba(194,65,12,.18);color:#fb9a6a;border-color:rgba(194,65,12,.45)}
  .bks-field{margin:12px 0 0}
  .bks-lab{font-size:10.5px;font-weight:800;letter-spacing:1px;color:#9aa3b2;text-transform:uppercase;margin-bottom:5px}
  .bks-val{font-size:13px;line-height:1.5;color:#dfe3ea}
  .bks-src{display:flex;align-items:center;gap:8px;background:#171a21;border:1px solid #272b34;border-radius:8px;padding:7px 10px;margin-bottom:6px}
  .bks-ty{font-size:9px;font-weight:800;letter-spacing:.5px;padding:2px 6px;border-radius:5px;background:#222633;color:#9fb4ff;text-transform:uppercase}
  .bks-nm{font-size:12.5px;font-weight:600}
  .bks-rf{font-size:11px;color:#9aa3b2;font-family:ui-monospace,Menlo,monospace;margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px}
  .bks-panel pre{background:#0a0c10;border:1px solid #272b34;border-radius:8px;padding:10px 12px;font-size:11.5px;line-height:1.5;
    font-family:ui-monospace,Menlo,monospace;color:#cdd6e4;overflow-x:auto;margin:0;white-space:pre-wrap}
  .bks-iotabs{display:flex;gap:6px;margin-bottom:6px}
  .bks-iotab{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:6px;cursor:pointer;background:#171a21;border:1px solid #272b34;color:#9aa3b2}
  .bks-iotab.on{background:#1d2330;color:#cbd5e9}
  .bks-note{font-size:12.5px;line-height:1.5;color:#dfe3ea;background:rgba(124,58,237,.10);border:1px solid rgba(124,58,237,.32);border-radius:8px;padding:9px 11px}
  .bks-q{font-size:12.5px;line-height:1.5;color:#fcd9c2;background:rgba(194,65,12,.10);border:1px solid rgba(194,65,12,.3);border-radius:8px;padding:8px 11px;margin-bottom:6px;display:flex;gap:8px}
  .bks-q .qm{flex:0 0 auto;width:16px;height:16px;border-radius:50%;background:#c2410c;color:#fff;font-weight:800;font-size:11px;display:grid;place-items:center}
  .bks-log{flex:1;overflow-y:auto;padding:14px 18px 24px}
  .bks-loghead{display:flex;align-items:center;margin-bottom:10px}
  .bks-count{margin-left:8px;font-size:10px;font-weight:800;color:#cbd5e9;background:#1d2330;border-radius:20px;padding:1px 8px}
  .bks-clear{margin-left:auto;font-size:11px;font-weight:700;color:#9aa3b2;background:none;border:1px solid #272b34;border-radius:7px;padding:3px 9px;cursor:pointer}
  .bks-ev{background:#171a21;border:1px solid #272b34;border-radius:11px;padding:11px 12px;margin-bottom:9px;animation:bksPop .25s ease}
  @keyframes bksPop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
  .bks-ev .top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
  .bks-ev .act{font-size:13px;font-weight:800}
  .bks-ev .time{margin-left:auto;font-size:10.5px;color:#9aa3b2;font-family:ui-monospace,Menlo,monospace}
  .bks-ev .narr{font-size:12px;line-height:1.5;color:#c4cbd8}
  .bks-ev .flow{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#9fb4ff;margin-top:6px;word-break:break-word}
  .bks-ev .chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
  .bks-ev .chips .c{font-size:10px;font-weight:700;padding:2px 7px;border-radius:6px;background:#222633;color:#9fb4ff}
  .bks-logempty{color:#9aa3b2;font-size:12.5px;text-align:center;padding:24px 10px;line-height:1.6}`;

  function Backstage() {}

  Backstage.init = function (annotations, options) {
    annotations = annotations || {};
    options = options || {};
    var blockClicks = !!options.blockClicks;

    // styles
    var style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    // handle
    var handle = document.createElement("button");
    handle.className = "bks-handle";
    handle.setAttribute("aria-label", "Toggle Backstage backend overlay");
    handle.innerHTML = '<span class="vt">BACKSTAGE</span><span class="ar">❮</span>';
    document.body.appendChild(handle);

    // panel
    var panel = document.createElement("section");
    panel.className = "bks-panel";
    panel.innerHTML =
      '<div class="bks-head"><div class="bks-glyph">🎬</div>' +
      '<div><h1>Backstage</h1><p>Hover to inspect · click to log</p></div>' +
      '<button class="bks-x" aria-label="Close">×</button></div>' +
      '<div class="bks-insp" id="bks-insp"><p class="bks-cap">Inspector</p>' +
      '<div class="bks-empty">Hover any <b style="color:#cbd5e9">highlighted</b> element to see where its data comes from.</div></div>' +
      '<div class="bks-log"><div class="bks-loghead"><p class="bks-cap" style="margin:0">Event log</p>' +
      '<span class="bks-count" id="bks-count">0</span>' +
      '<button class="bks-clear" id="bks-clear">Clear</button></div>' +
      '<div id="bks-logbody"><div class="bks-logempty">Click highlighted elements to record what the backend does.</div></div></div>';
    document.body.appendChild(panel);

    var insp = panel.querySelector("#bks-insp");
    var logBody = panel.querySelector("#bks-logbody");
    var countEl = panel.querySelector("#bks-count");
    var count = 0, pinned = null;

    function open(v) {
      var willOpen = v == null ? !document.body.classList.contains("bks-open") : v;
      document.body.classList.toggle("bks-open", willOpen);
    }
    handle.addEventListener("click", function () { open(); });
    panel.querySelector(".bks-x").addEventListener("click", function () { open(false); });
    panel.querySelector("#bks-clear").addEventListener("click", function () {
      count = 0; countEl.textContent = "0";
      logBody.innerHTML = '<div class="bks-logempty">Click highlighted elements to record what the backend does.</div>';
    });

    function renderInspector(id) {
      var a = annotations[id]; if (!a) return;
      var sources = (a.sources || []).map(function (s) {
        return '<div class="bks-src"><span class="bks-ty">' + esc(TYPE_LABEL[s.type] || s.type) +
          '</span><span class="bks-nm">' + esc(s.name) + '</span><span class="bks-rf">' + esc(s.ref) + "</span></div>";
      }).join("");
      var questions = (a.openQuestions && a.openQuestions.length)
        ? '<div class="bks-field"><div class="bks-lab">Open questions</div>' +
          a.openQuestions.map(function (q) { return '<div class="bks-q"><span class="qm">?</span>' + esc(q) + "</div>"; }).join("") + "</div>"
        : "";
      var io = a.io || { request: "", response: "" };
      insp.innerHTML =
        '<p class="bks-cap">Inspector</p>' +
        '<div class="bks-title"><h2>' + esc(a.label) + "</h2>" + badge(a.status) + "</div>" +
        '<div class="bks-field"><div class="bks-lab">Data source</div>' + sources + "</div>" +
        '<div class="bks-field"><div class="bks-lab">What it computes</div><div class="bks-val">' + esc(a.calc) + "</div></div>" +
        '<div class="bks-field"><div class="bks-lab">Request / response</div>' +
          '<div class="bks-iotabs"><span class="bks-iotab on" data-io="req">Request</span><span class="bks-iotab" data-io="res">Response</span></div>' +
          '<pre id="bks-req">' + esc(io.request) + '</pre><pre id="bks-res" style="display:none">' + esc(io.response) + "</pre></div>" +
        '<div class="bks-field"><div class="bks-lab">Presenter note</div><div class="bks-note">' + esc(a.presenter) + "</div></div>" +
        questions;
      var req = insp.querySelector("#bks-req"), res = insp.querySelector("#bks-res");
      insp.querySelectorAll(".bks-iotab").forEach(function (t) {
        t.addEventListener("click", function () {
          insp.querySelectorAll(".bks-iotab").forEach(function (x) { x.classList.toggle("on", x === t); });
          var which = t.getAttribute("data-io");
          req.style.display = which === "req" ? "block" : "none";
          res.style.display = which === "res" ? "block" : "none";
        });
      });
    }

    function logEvent(id) {
      var a = annotations[id]; if (!a) return;
      count++; countEl.textContent = count;
      if (count === 1) logBody.innerHTML = "";
      var flow = (a.sources || []).map(function (s) { return s.ref; }).join("  →  ");
      var chips = (a.sources || []).map(function (s) { return '<span class="c">' + esc(s.name) + "</span>"; }).join("");
      var time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      var card = document.createElement("div");
      card.className = "bks-ev";
      card.innerHTML =
        '<div class="top"><span class="act">' + esc(a.action || a.label) + "</span>" + badge(a.status) +
          '<span class="time">' + time + "</span></div>" +
        '<div class="narr">' + esc(a.narration || a.calc) + "</div>" +
        '<div class="flow">' + esc(flow) + "</div>" +
        '<div class="chips">' + chips + "</div>";
      logBody.insertBefore(card, logBody.firstChild);
    }

    // event delegation
    document.addEventListener("mouseover", function (e) {
      if (!document.body.classList.contains("bks-open")) return;
      var el = e.target.closest ? e.target.closest("[data-backstage]") : null;
      if (el) renderInspector(el.getAttribute("data-backstage"));
    });
    document.addEventListener("click", function (e) {
      if (!document.body.classList.contains("bks-open")) return;
      var el = e.target.closest ? e.target.closest("[data-backstage]") : null;
      if (!el) return;
      var id = el.getAttribute("data-backstage");
      if (!annotations[id]) return;
      if (blockClicks) e.preventDefault();
      if (pinned) pinned.classList.remove("bks-pinned");
      pinned = el; el.classList.add("bks-pinned");
      renderInspector(id);
      logEvent(id);
    });

    if (options.defaultOpen) open(true);
    return { open: open };
  };

  global.Backstage = Backstage;
})(typeof window !== "undefined" ? window : this);
