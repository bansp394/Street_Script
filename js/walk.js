/* =========================================================
   WALK THE CITY  —  map.html  (optional ?id=… to open on a message)
   Dark map of Manhattan. Red pin = new, yellow = explored.
   Click a pin or a photo in the right strip.
   ========================================================= */

const list = allMessages().filter(m => m.ll);
let activeId = (param("id") && list.some(m => m.id === param("id"))) ? param("id") : "trust-the-timing";
if (!list.some(m => m.id === activeId)) activeId = list[0].id;

/* ---------- the map ---------- */
const map = L.map("map", {
  zoomControl: false, minZoom: 12, maxZoom: 18,
  maxBounds: [[40.68, -74.06], [40.89, -73.88]], maxBoundsViscosity: 0.8,
  attributionControl: true
}).setView([40.752, -73.985], 13);
L.control.zoom({ position: "bottomright" }).addTo(map);

/* Real map of New York: borough shapes (js/nyc-map.js) + every street centerline
   from NYC Open Data (js/nyc-streets.js). Drawn locally, so it always loads. */
const cv = L.canvas({ padding: 0.5 });
const decode = f => { const out = [[f[0] / 1e5, f[1] / 1e5]]; for (let i = 2; i < f.length; i += 2) { const p = out[out.length - 1]; out.push([p[0] + f[i] / 1e5, p[1] + f[i + 1] / 1e5]); } return out; };
const draw = (lines, style) => lines.forEach(f => L.polyline(decode(f), { renderer: cv, interactive: false, ...style }).addTo(map));
NYC_MAP.land.forEach(p => L.polygon(p, { renderer: cv, interactive: false, color: "#2c2c2c", weight: 1, fillColor: "#0f0f0f", fillOpacity: 1 }).addTo(map));
NYC_MAP.manhattan.forEach(p => L.polygon(p, { renderer: cv, interactive: false, color: "#cfcac0", weight: 1.4, opacity: .75, fillColor: "#141414", fillOpacity: 1 }).addTo(map));
NYC_MAP.park.forEach(p => L.polygon(p, { renderer: cv, interactive: false, stroke: false, fillColor: "#0a0a0a", fillOpacity: 1 }).addTo(map));
/* each street type gets its own layer; the WHOLE layer is faded (not each line),
   so overlapping line ends don't pile up into bright dots */
function drawLayer(key, weight, opacity) {
  const pane = map.createPane("st-" + key);
  pane.style.opacity = opacity; pane.style.zIndex = 410; pane.style.pointerEvents = "none";
  const r = L.canvas({ pane: "st-" + key, padding: 0.5 });
  NYC_STREETS[key].forEach(f => L.polyline(decode(f), { renderer: r, interactive: false, color: "#ffffff", weight, opacity: 1, lineCap: "butt", lineJoin: "round" }).addTo(map));
}
drawLayer("other", .5, 0.063);
drawLayer("otherMajor", .9, 0.105);
drawLayer("path", .5, 0.112);
drawLayer("street", .8, 0.21);
drawLayer("major", 1.6, 0.35);
drawLayer("bridge", 1.8, 0.294);
map.attributionControl.setPrefix(false).addAttribution("Streets: NYC Open Data");

/* big neighbourhood labels like the design */
[["Upper<br>West Side", 40.787, -73.979], ["Upper<br>East Side", 40.774, -73.956], ["Central<br>Park", 40.7812, -73.9665],
 ["Midtown", 40.7549, -73.9840], ["Chelsea", 40.7465, -74.0014], ["SoHo", 40.7233, -74.0030],
 ["Lower<br>Manhattan", 40.7075, -74.0110], ["Harlem", 40.8116, -73.9465], ["Brooklyn", 40.6950, -73.9900],
 ["Hudson River", 40.765, -74.012, "river"], ["East River", 40.745, -73.962, "river"]]
  .forEach(([t, lat, lng, k]) => L.marker([lat, lng], { interactive: false, keyboard: false,
    icon: L.divIcon({ className: "walk-label" + (k ? " river" : ""), html: `<span>${t}</span>`, iconSize: [160, 50], iconAnchor: [80, 25] }) }).addTo(map));

/* ---------- pins ---------- */
const pins = {};
function pinIcon(m) {
  const state = m.id === activeId ? "active" : getExplored().includes(m.id) ? "explored" : "new";
  return L.divIcon({ className: "walk-pin " + state, html: "<i></i>", iconSize: [26, 26], iconAnchor: [13, 13] });
}
list.forEach(m => {
  pins[m.id] = L.marker(m.ll, { icon: pinIcon(m), title: m.title, riseOnHover: true })
    .on("click", () => select(m.id, true)).addTo(map);
});

/* the card that opens next to the active pin */
const card = L.popup({ closeButton: false, autoClose: false, closeOnClick: false, className: "walk-card", offset: [175, 170], autoPan: false });

/* ---------- right strip ---------- */
const strip = document.getElementById("strip");
strip.innerHTML = list.map(m => `<button class="strip-item" data-id="${m.id}" title="${esc(m.title)}">${mediaHTML(m)}</button>`).join("");
strip.addEventListener("click", e => { const b = e.target.closest(".strip-item"); if (b) select(b.dataset.id, true); });

/* ---------- select a message ---------- */
function select(id, fly) {
  const prev = activeId; activeId = id;
  const m = list.find(x => x.id === id), cat = CATEGORIES[m.category];
  [prev, id].forEach(k => pins[k] && pins[k].setIcon(pinIcon(list.find(x => x.id === k))));
  pins[id].setZIndexOffset(1000);

  const link = `message.html?id=${encodeURIComponent(m.id)}`;
  card.setLatLng(m.ll).setContent(`
    <span class="label-accent accent-${cat.accent}">${cat.label}</span>
    <a class="walk-card-photo" href="${link}">${mediaHTML(m)}</a>
    <div class="walk-card-foot">
      <div><strong>${esc(m.title)}</strong><small>${PIN}${esc(m.hood)}</small></div>
      <a class="round" href="${link}" aria-label="Open ${esc(m.title)}">${ARROW}</a>
    </div>`).openOn(map);

  strip.querySelectorAll(".strip-item").forEach(b => b.classList.toggle("is-active", b.dataset.id === id));
  const active = strip.querySelector(".is-active");
  if (active) {   // scroll only the strip, never the whole page
    const horiz = strip.scrollWidth > strip.clientWidth + 2;
    strip.scrollTo({ [horiz ? "left" : "top"]: horiz ? active.offsetLeft - 8 : active.offsetTop - 8, behavior: fly ? "smooth" : "auto" });
  }

  if (fly) map.flyTo([m.ll[0] - 0.004, m.ll[1] + 0.012], Math.max(map.getZoom(), 14), { duration: .7 });
  history.replaceState(null, "", `map.html?id=${encodeURIComponent(id)}`);
}
select(activeId, false);
