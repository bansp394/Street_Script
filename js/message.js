/* =========================================================
   MESSAGE PAGE  —  message.html?id=trust-the-timing
   One street message: photo, hold to reveal, what it means to others.
   ========================================================= */

const root = document.getElementById("message");
const m = findMessage(param("id"));

if (!m) {
  root.innerHTML = `<div class="not-found"><h1 class="display">Washed away<span class="q">.</span></h1>
    <p class="lede" style="margin:20px auto">This message couldn't be found. Chalk doesn't last forever.</p>
    <a class="text-link" href="explore.html">Back to explore</a></div>`;
} else {
  render();
}

function render() {
  markExplored(m.id);
  document.title = `${m.title} — Street Script`;

  const cat = CATEGORIES[m.category];
  const siblings = messagesIn(m.category);
  const index = siblings.findIndex(x => x.id === m.id);
  const prev = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];
  const link = x => `message.html?id=${encodeURIComponent(x.id)}`;
  const backHref = `category.html?c=${m.category}`;
  const backText = `Back to ${cat.label}`;
  const nearby = nearestTo(m, allMessages(), 3);

  // in the header nav, mark the section the visitor came from
  document.querySelectorAll(".main-nav a").forEach(a =>
    a.toggleAttribute("aria-current", a.getAttribute("href") === "explore.html"));

  const CAL = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6"/></svg>`;
  const TAG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8L3 12z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="8.5" r="1.4" fill="currentColor"/></svg>`;
  const STAR = `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l5 15 15 1-12 9 5 15-13-9-13 9 5-15L4 20l15-1z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" transform="rotate(-8 24 24)"/></svg>`;

  root.innerHTML = `
    <div class="msg-bar">
      <a class="back-link" href="${backHref}">${ARROW} ${backText}</a>
      <div class="pager">
        <a class="prev" href="${link(prev)}">${ARROW} Previous</a>
        <span class="divider"></span>
        <span class="muted">${String(index + 1).padStart(2, "0")} / ${String(siblings.length).padStart(2, "0")}</span>
        <span class="divider"></span>
        <a class="next" href="${link(next)}">Next ${ARROW}</a>
      </div>
    </div>

    <div class="msg-layout">

      <!-- middle: the photo -->
      <section class="msg-main">
        <span class="label-accent accent-${cat.accent}">${cat.label}</span>
        <h1>${esc(m.title)}</h1>
        <div class="meta">
          <span>${PIN}${esc(m.hood)}</span>
          ${m.date ? `<span>${CAL}${esc(m.date)}</span>` : ""}
          ${m.tags && m.tags.length ? `<span>${TAG}${m.tags.slice(0, 2).map(esc).join(", ")}</span>` : ""}
        </div>
        <div class="msg-photo">${mediaHTML(m)}</div>

        <div class="msg-hold">
          <button class="hold" id="hold">
            <span class="round">${ARROW}</span>
            <span><span class="hold-label">Hold to reveal</span>
            <span class="hold-sub">Press and hold to see what this message meant to someone else.</span></span>
          </button>
          <div class="reveal" id="reveal" hidden aria-live="polite"></div>
        </div>
      </section>

      <!-- right: about, meanings -->
      <aside class="msg-side">
        <section class="about">
          <h2 class="section-title">About this message</h2>
          <div class="about-grid">
            <div>
              <p>${esc(m.about)}</p>
              ${m.tags && m.tags.length ? `<div class="tags-row">${m.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
            </div>
          </div>
        </section>




        <section>
          <h2 class="section-title">What it means to others</h2>
          <div class="meanings" id="meanings"></div>
        </section>

        <section class="your-meaning">
          <h2 class="section-title">${STAR} What does this mean to you?</h2>
          <form id="meaning-form" class="field">
            <label class="sr-only" for="meaning-input">Your interpretation</label>
            <textarea id="meaning-input" maxlength="200" placeholder="Share your interpretation…"></textarea>
            <button class="round" type="submit" aria-label="Add your meaning">${ARROW}</button>
          </form>
          <p class="saved-note" id="saved-note" aria-live="polite"></p>
        </section>

        ${nearby.length ? `
        <section>
          <h2 class="section-title">More messages nearby</h2>
          <div class="nearby">
            ${nearby.map(n => `
              <a class="nearby-item" href="${link(n.msg)}" data-walk="${n.walk.minutes}" data-title="${esc(n.msg.title)}">
                <span class="thumb">${mediaHTML(n.msg)}</span>
                <span><small>${walkLabel(n.walk)}</small><strong>${esc(n.msg.title)}</strong>
                <span class="muted">${PIN}${esc(n.msg.hood.split(",")[0])}</span></span>
                <svg class="arrow" viewBox="0 0 24 24">${ARROW.replace(/<\/?svg[^>]*>/g, "")}</svg>
              </a>`).join("")}
          </div>
        </section>` : ""}
      </aside>
    </div>

    <!-- bottom: keep exploring -->
    <nav class="keep-exploring" aria-label="Keep exploring">
      <a class="cta" href="explore.html">
        <span class="round">${ARROW}</span><span class="red-text">Another<br>feeling</span>
      </a>
    </nav>`;

  renderMeanings();
  setupReveal();
  setupForm();

  // nearby: play the walking animation first, then open the message
  root.querySelectorAll(".nearby-item").forEach(a => a.addEventListener("click", e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    walkTo(a.getAttribute("href"), a.dataset.title, a.dataset.walk);
  }));
}

function allMeanings() { return getUserMeanings(m.id).concat(m.meanings || []); }

function meaningHTML(x, i) {
  return `<article class="meaning ${x.mine ? "mine" : ""}">
    <p>${esc(x.quote)}</p>
    <footer><span class="who">— ${esc(x.who)}</span><span class="theme ${i % 2 ? "red" : ""}">${esc(x.theme)}</span></footer>
  </article>`;
}

function renderMeanings() {
  const list = allMeanings();
  document.getElementById("meanings").innerHTML = list.length
    ? list.map(meaningHTML).join("")
    : `<p class="muted">No one has shared what this means to them yet. Be the first.</p>`;
}

/* Hold to reveal: shows one person's meaning, a different one each time */
function setupReveal() {
  const btn = document.getElementById("hold");
  const box = document.getElementById("reveal");
  let n = 0;
  setupHold(btn, () => {
    const list = allMeanings();
    if (!list.length) { box.hidden = false; box.innerHTML = `<p>No stories yet. Add yours below.</p>`; return; }
    const x = list[n++ % list.length];
    box.hidden = false;
    box.style.animation = "none"; box.offsetHeight; box.style.animation = "";
    box.innerHTML = `<p>${esc(x.quote)}</p><footer><span>— ${esc(x.who)}</span><span class="theme">${esc(x.theme)}</span></footer>`;
    btn.querySelector(".hold-label").textContent = list.length > 1 ? "Hold again" : "Hold to reveal";
    btn.querySelector(".hold-sub").textContent = list.length > 1 ? "Hold again for another story." : "That's the only story so far.";
  });
}

/* "What does this mean to you?" — saved in this browser */
function setupForm() {
  const form = document.getElementById("meaning-form");
  const input = document.getElementById("meaning-input");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    addUserMeaning(m.id, text);
    input.value = "";
    renderMeanings();
    document.getElementById("saved-note").textContent = "Added. Your meaning is now part of this message.";
  });
}
