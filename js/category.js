/* =========================================================
   CATEGORY PAGE  —  category.html?c=sign
   A grid of every message in one feeling.
   Each card turns over on hover (or tap on phones) to show its info.
   ========================================================= */

const catId = CATEGORIES[param("c")] ? param("c") : "sign";
const cat = CATEGORIES[catId];
const list = messagesIn(catId);
const explored = getExplored();
const canHover = matchMedia("(hover: hover)").matches;

document.title = `${cat.label} — Street Script`;
document.body.classList.add(`theme-${cat.accent}`);   // yellow or red page background

/* --- header text --- */
document.getElementById("back").innerHTML = `${ARROW} All feelings`;
document.getElementById("cat-title").innerHTML =
  `${cat.label.replace("?", "")}<span class="q accent-${cat.accent}">?</span>`;
document.getElementById("cat-blurb").textContent =
  `${cat.blurb} ${list.length} message${list.length === 1 ? "" : "s"} found so far.`;
if (!canHover) document.getElementById("hint-text").textContent = "Tap a message to turn it over, tap again to open it.";

/* --- tabs to jump between feelings --- */
document.getElementById("tabs").innerHTML = Object.values(CATEGORIES).map(c =>
  `<a href="category.html?c=${c.id}" ${c.id === catId ? 'aria-current="page"' : ""}>${c.label}</a>`
).join("");

/* --- the flip cards --- */
const grid = document.getElementById("grid");

function cardHTML(m) {
  const meaning = (getUserMeanings(m.id)[0] || (m.meanings || [])[0]);
  const quote = meaning ? meaning.quote : m.about;
  return `
  <article class="flip">
    <div class="flip-inner">

      <!-- FRONT: the photo -->
      <div class="flip-face flip-front">
        ${mediaHTML(m)}
        ${!explored.includes(m.id) ? `<span class="flip-new">New</span>` : ""}
        <div class="front-cap">
          <h3>${esc(m.title)}<small>${esc(m.hood)}</small></h3>
          <svg class="flip-turn" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7M17.6 2.5v3.8h-3.8M6.4 21.5v-3.8h3.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </div>
      </div>

      <!-- BACK: the info (the whole back is a link to the full message) -->
      <a class="flip-face flip-back" href="message.html?id=${encodeURIComponent(m.id)}">
        <span class="label-accent accent-${cat.accent}" style="font-size:16px">${cat.label}</span>
        <h3>${esc(m.title)}</h3>
        <div class="meta">
          <span>${PIN}${esc(m.hood)}</span>
          ${m.date ? `<span class="muted">${esc(m.date)}</span>` : ""}
        </div>
        <blockquote>${esc(quote)}</blockquote>
        ${m.tags && m.tags.length ? `<div class="tags">${m.tags.slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
        <span class="flip-open">Open message <span class="round">${ARROW}</span></span>
      </a>

    </div>
  </article>`;
}

grid.innerHTML = list.length
  ? list.map(cardHTML).join("")
  : `<div class="empty-state">No messages here yet. <a class="text-link" href="leave.html">Leave the first one</a></div>`;

/* On phones there's no hover: first tap turns the card, second tap opens it */
if (!canHover) {
  grid.addEventListener("click", e => {
    const card = e.target.closest(".flip");
    if (!card) return;
    if (!card.classList.contains("is-flipped")) {
      e.preventDefault();
      grid.querySelectorAll(".flip.is-flipped").forEach(c => c.classList.remove("is-flipped"));
      card.classList.add("is-flipped");
    }
  });
}

/* --- "next feeling" links at the bottom --- */
const ids = Object.keys(CATEGORIES);
const i = ids.indexOf(catId);
const prev = CATEGORIES[ids[(i - 1 + ids.length) % ids.length]];
const next = CATEGORIES[ids[(i + 1) % ids.length]];
document.getElementById("cat-next").innerHTML = `
  <a href="category.html?c=${prev.id}"><span><small>Previous feeling</small><strong>${prev.label}</strong></span><span class="round outline" style="transform:scaleX(-1)">${ARROW}</span></a>
  <a href="category.html?c=${next.id}"><span><small>Next feeling</small><strong>${next.label}</strong></span><span class="round">${ARROW}</span></a>`;
