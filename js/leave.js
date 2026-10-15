/* =========================================================
   LEAVE A MESSAGE  —  leave.html
   Live preview → saved to this browser → shows up in the
   category grids.
   ========================================================= */

const form = {
  text: document.getElementById("text"),
  count: document.getElementById("count"),
  hood: document.getElementById("hood"),
  error: document.getElementById("error")
};
const preview = document.getElementById("preview");
const PLACEHOLDER = "You got this ♡";

/* ---- build the choices from data.js ---- */
document.getElementById("feel-row").innerHTML = Object.values(CATEGORIES).map((c, i) => `
  <label class="feel-chip"><input type="radio" name="category" value="${c.id}" ${i === 3 ? "checked" : ""}><span>${c.label}</span></label>`).join("");

document.getElementById("surface-row").innerHTML = Object.entries(SURFACES).map(([id, s], i) => `
  <label class="choice">
    <input type="radio" name="surface" value="${id}" ${i === 0 ? "checked" : ""}>
    <div class="swatch" style="background-image:url('${s.image}')"></div>
    <span class="choice-name">${s.label}</span>
  </label>`).join("");

form.hood.innerHTML = DROP_SPOTS.map((d, i) => `<option value="${i}">${d.hood}</option>`).join("");

document.getElementById("submit-arrow").innerHTML = ARROW;

/* ---- read the form ---- */
function current() {
  const spot = DROP_SPOTS[form.hood.value];
  return {
    text: form.text.value.trim(),
    category: document.querySelector('input[name="category"]:checked').value,
    surface: document.querySelector('input[name="surface"]:checked').value,
    spot
  };
}

/* ---- live preview ---- */
function updatePreview() {
  const f = current();
  form.count.textContent = form.text.value.length;
  const surf = SURFACES[f.surface];
  preview.style.aspectRatio = `${surf.w} / ${surf.h}`;     // show the whole street photo
  preview.innerHTML = mediaHTML({ text: f.text || PLACEHOLDER, surface: f.surface });
  preview.querySelector("span").classList.toggle("is-placeholder", !f.text);
  document.getElementById("preview-where").textContent = `${SURFACES[f.surface].label}  /  ${f.spot.hood}`;
}


["input", "change"].forEach(ev => document.getElementById("leave-form").addEventListener(ev, () => {
  form.error.textContent = "";
  updatePreview();
}));

/* ---- submit ---- */
document.getElementById("leave-form").addEventListener("submit", e => {
  e.preventDefault();
  const f = current();
  if (!f.text) {
    form.error.textContent = "Write something first. Even one word counts.";
    form.text.focus();
    return;
  }
  const jitter = () => (Math.random() - 0.5) * 0.06;
  const msg = {
    id: "yours-" + Date.now(),
    user: true,
    text: f.text,
    title: f.text,
    category: f.category,
    surface: f.surface,
    hood: f.spot.hood,
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    tags: ["yours"],
    about: `Left by you on a ${SURFACES[f.surface].label.toLowerCase()} in ${f.spot.hood.split(",")[0]}.`,
    ll: [f.spot.ll[0] + jitter() * 0.04, f.spot.ll[1] + jitter() * 0.04],
    map: { t: f.spot.t + jitter(), s: Math.max(-0.9, Math.min(0.9, f.spot.s + jitter() * 4)) },
    meanings: []
  };
  const list = getUserMessages();
  list.push(msg);
  Store.set("userMessages", list);
  showSuccess(msg);
});

function showSuccess(msg) {
  const box = document.getElementById("success");
  document.getElementById("success-preview").innerHTML = mediaHTML(msg);
  document.getElementById("success-text").textContent =
    `Your message is now on the streets of ${msg.hood.split(",")[0]}, filed under “${CATEGORIES[msg.category].label}”.`;
  document.getElementById("see-cat").href = `category.html?c=${msg.category}`;
  box.hidden = false;
  document.getElementById("see-cat").focus();
}
document.getElementById("write-another").addEventListener("click", () => {
  document.getElementById("success").hidden = true;
  form.text.value = "";
  updatePreview();
  form.text.focus();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") document.getElementById("success").hidden = true; });

updatePreview();
