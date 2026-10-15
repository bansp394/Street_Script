/* =========================================================
   STREET SCRIPT — SHARED HELPERS (used on every page)
   ========================================================= */

/* ---------- Saving things in the browser ----------
   localStorage only lives in this visitor's browser.
   Wrapped in try/catch because private windows can block it. */
const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("streetscript:" + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("streetscript:" + key, JSON.stringify(value)); } catch (e) {}
  }
};

/* Messages visitors left on the "Leave a message" page */
function getUserMessages() { return Store.get("userMessages", []); }

/* Interpretations visitors typed under a message ("What does this mean to you?") */
function getUserMeanings(id) { return (Store.get("meanings", {})[id]) || []; }
function addUserMeaning(id, quote) {
  const all = Store.get("meanings", {});
  (all[id] = all[id] || []).unshift({ quote, who: "You", theme: "Your meaning", mine: true });
  Store.set("meanings", all);
}

/* Which messages this visitor has opened (red pin = new, yellow = explored) */
function getExplored() { return Store.get("explored", []); }
function markExplored(id) {
  const list = getExplored();
  if (!list.includes(id)) { list.push(id); Store.set("explored", list); }
}

/* Every message: the curated ones + the ones this visitor added */
function allMessages() { return MESSAGES.concat(getUserMessages()); }
function findMessage(id) { return allMessages().find(m => m.id === id); }
function messagesIn(cat) { return allMessages().filter(m => !cat || cat === "all" || m.category === cat); }

/* Read ?c=sign or ?id=trust-the-timing from the URL */
function param(name) { return new URLSearchParams(location.search).get(name); }

/* Escape text before putting it into HTML (protects against visitors typing <tags>) */
function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* The picture for a message.
   Curated messages have a photo; visitor messages are drawn as chalk on a surface. */
function mediaHTML(m) {
  if (m.image) return `<img src="${m.image}" alt="Street message: ${esc(m.title)}" loading="lazy">`;
  return writingHTML(m.text, SURFACES[m.surface] || SURFACES.sidewalk);
}

/* A visitor's words written onto a real street photo.
   The font size is worked out so the text fills the writing zone without spilling. */
function writingHTML(text, s) {
  const [zl, zt, zw, zh] = s.zone;
  const ratio = (zh * s.h) / (zw * s.w);                       // zone height / width
  const words = String(text).trim().split(/\s+/);
  const longest = Math.max(...words.map(w => w.length), 1);
  const chars = Math.max(String(text).length, 1);
  const size = Math.min(100 / (0.66 * longest), Math.sqrt((80 * ratio * 100) / (0.75 * chars)), 30);
  return `<div class="chalk-tile ${s.w > s.h ? "land" : "port"}" role="img" aria-label="Street message: ${esc(text)}">
    <div class="stage" style="aspect-ratio:${s.w}/${s.h};background-image:url('${s.image}')">
      <div class="zone ${s.style}" style="left:${zl}%;top:${zt}%;width:${zw}%;height:${zh}%;transform:rotate(${s.rot}deg)">
        <span style="font-size:${size.toFixed(2)}cqw">${esc(text)}</span>
      </div>
    </div>
  </div>`;
}

/* SVG filters that make text look like chalk / paint (added once per page) */
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="chalkf"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/><feComposite operator="in" in2="SourceGraphic" result="t"/><feTurbulence type="fractalNoise" baseFrequency="1.5" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -2.4 2" result="m"/><feComposite in="t" in2="m" operator="in"/></filter>
    <filter id="paintf"><feTurbulence type="fractalNoise" baseFrequency="1.2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.5"/></filter>
  </svg>`);
});

function categoryLabel(id) { return CATEGORIES[id] ? CATEGORIES[id].label : ""; }
function accentOf(id) { return CATEGORIES[id] ? CATEGORIES[id].accent : "red"; }

/* Arrow icon used inside the round buttons */
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PIN = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;

/* ---------- Hold to reveal ----------
   Press and hold the button; when the ring fills up, onDone() runs.
   Works with mouse, touch, and keyboard (hold Space or Enter). */
function setupHold(button, onDone, duration = 1100) {
  let start = null, frame = null;
  const set = p => button.style.setProperty("--p", p);

  function tick(now) {
    if (start === null) start = now;
    const p = Math.min((now - start) / duration, 1);
    set(p);
    if (p < 1) frame = requestAnimationFrame(tick);
    else { stop(false); onDone(); }
  }
  function begin(e) {
    if (e) e.preventDefault();
    if (frame) return;
    button.classList.add("is-holding");
    start = null; frame = requestAnimationFrame(tick);
  }
  function stop(reset = true) {
    cancelAnimationFrame(frame); frame = null;
    button.classList.remove("is-holding");
    if (reset) set(0); else setTimeout(() => set(0), 400);
  }
  button.addEventListener("pointerdown", begin);
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => button.addEventListener(ev, () => frame && stop()));
  button.addEventListener("keydown", e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) begin(e); });
  button.addEventListener("keyup", e => { if (e.key === " " || e.key === "Enter") frame && stop(); });
  button.addEventListener("contextmenu", e => e.preventDefault());
}

/* ---------- Header menu (the ☰ button) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-overlay");
  if (!toggle || !menu) return;
  const open = state => {
    menu.classList.toggle("is-open", state);
    toggle.setAttribute("aria-expanded", state);
    document.body.style.overflow = state ? "hidden" : "";
  };
  toggle.addEventListener("click", () => open(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => open(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") open(false); });
});

/* ---------- Walking distance (for "More messages nearby") ----------
   Manhattan's grid is tilted ~29°, so a walk = up the avenue, then across the street. */
function walkBetween(a, b) {
  const M_LAT = 110540, M_LNG = 111320 * Math.cos(a[0] * Math.PI / 180);
  const x = (b[1] - a[1]) * M_LNG, y = (b[0] - a[0]) * M_LAT;
  const ang = 29 * Math.PI / 180;
  const along = x * Math.sin(ang) + y * Math.cos(ang);
  const across = x * Math.cos(ang) - y * Math.sin(ang);
  const meters = Math.abs(along) + Math.abs(across);
  return { meters, minutes: Math.max(1, Math.round(meters / 80)) };
}
function walkLabel(w) { return `${w.minutes} min walk`; }
function nearestTo(m, list, count = 3) {
  return list.filter(x => x.id !== m.id && x.ll && m.ll)
    .map(x => ({ msg: x, walk: walkBetween(m.ll, x.ll) }))
    .sort((p, q) => p.walk.meters - q.walk.meters)
    .slice(0, count);
}

/* ---------- Walking animation ----------
   Shows a little walker for ~2.4s, then goes to the next message. */
function walkTo(href, title, minutes) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { location.href = href; return; }
  const el = document.createElement("div");
  el.className = "walk-overlay";
  el.setAttribute("role", "status");
  el.innerHTML = `
    <div class="walk-scene">
      <div class="walk-street"><span class="walk-dash"></span></div>
      <svg class="walker" viewBox="0 0 60 120" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="30" cy="14" r="9" fill="currentColor" stroke="none"/>
          <line x1="30" y1="26" x2="30" y2="62"/>
          <g class="arm arm-a"><line x1="30" y1="32" x2="30" y2="58"/></g>
          <g class="arm arm-b"><line x1="30" y1="32" x2="30" y2="58"/></g>
          <g class="leg leg-a"><line x1="30" y1="62" x2="30" y2="86"/><g class="shin"><line x1="30" y1="86" x2="30" y2="110"/><line x1="30" y1="110" x2="38" y2="110"/></g></g>
          <g class="leg leg-b"><line x1="30" y1="62" x2="30" y2="86"/><g class="shin"><line x1="30" y1="86" x2="30" y2="110"/><line x1="30" y1="110" x2="38" y2="110"/></g></g>
        </g>
      </svg>
    </div>
    <p class="walk-label">Walking to</p>
    <h2 class="walk-title">${esc(title)}</h2>
    <p class="walk-time">${minutes} min walk</p>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-on"));
  setTimeout(() => { location.href = href; }, 2400);
}
