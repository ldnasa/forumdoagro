/* ==========================================================================
   Fórum do Agronegócio 2027 - comportamentos (vanilla JS)
   Compartilhado entre index.html, programacao.html e ingressos.html.
   ========================================================================== */

/* --------------------------------------------------------------------------
   FLAGS DE CONTROLE
   -------------------------------------------------------------------------- */
// true  = barra do contador mostra o botão "Garantir ingresso" ao lado.
// false = barra mostra só o contador (vendas ainda não abertas).
const vendasAbertas = false;

// [PLACEHOLDER] data-alvo do contador regressivo (edição 2027)
const DATA_EVENTO = "2027-09-04T09:00:00";

const prefersReduced =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initReveal();
  initCountUp();
  initCountdown();
  initSpeakerModal();
  initNumbersToggle();
  initSponsorsToggle();
  initProgramAccordion();
  initProgramTabs();
  initHeroVideo();
});

/* --------------------------------------------------------------------------
   Vídeo do hero: reforça o autoplay; respeita prefers-reduced-motion
   (quem pede menos movimento vê só o poster, sem vídeo rodando)
   -------------------------------------------------------------------------- */
function initHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;
  if (prefersReduced) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  tryPlay();
  // alguns navegadores só liberam o play após interação do usuário
  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
}

/* --------------------------------------------------------------------------
   Menu mobile (hambúrguer)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    })
  );
}

/* --------------------------------------------------------------------------
   Reveal on scroll (fade-in / slide-up)
   -------------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Count-up dos números (entra na viewport)
   -------------------------------------------------------------------------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.countup);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  if (prefersReduced) {
    el.textContent = prefix + target.toLocaleString("pt-BR") + suffix;
    return;
  }
  const dur = 1600;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = prefix + val.toLocaleString("pt-BR") + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCountUp() {
  // só observa os números da view atualmente visível (evita rodar nos ocultos)
  const nums = [...document.querySelectorAll("[data-countup]")].filter(
    (el) => el.offsetParent !== null
  );
  if (!nums.length) return;
  if (!("IntersectionObserver" in window)) {
    nums.forEach(animateCount);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  nums.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Contador regressivo + barra sticky
   -------------------------------------------------------------------------- */
function initCountdown() {
  const bar = document.getElementById("countdown-bar");
  if (!bar) return;

  // botão de ingresso condicional à flag vendasAbertas
  const btn = document.getElementById("countdown-cta");
  if (btn) btn.classList.toggle("hidden", !vendasAbertas);

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMin = document.getElementById("cd-min");
  const elSec = document.getElementById("cd-sec");
  const target = new Date(DATA_EVENTO).getTime();

  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      [elDays, elHours, elMin, elSec].forEach((e) => e && (e.textContent = "00"));
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (elDays) elDays.textContent = pad(d);
    if (elHours) elHours.textContent = pad(h);
    if (elMin) elMin.textContent = pad(m);
    if (elSec) elSec.textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);

  // a barra aparece logo nos primeiros scrolls
  const onScroll = () => {
    bar.classList.toggle("is-active", window.scrollY > 80);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Modal de palestrantes ("ver mais")
   -------------------------------------------------------------------------- */
function initSpeakerModal() {
  const modal = document.getElementById("speaker-modal");
  if (!modal) return;
  const elName = document.getElementById("sm-name");
  const elOrg = document.getElementById("sm-org");
  const elBio = document.getElementById("sm-bio");
  const elPh = document.getElementById("sm-photo");

  const open = (card) => {
    elName.textContent = card.dataset.name || "";
    if (elOrg) elOrg.textContent = card.dataset.org || "";
    elBio.textContent = card.dataset.bio || "";
    if (elPh) {
      elPh.src = card.dataset.photo || "";
      elPh.alt = card.dataset.name || "";
    }
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-speaker]").forEach((card) =>
    card.addEventListener("click", () => open(card))
  );
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", close)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* --------------------------------------------------------------------------
   Toggle A/B da seção de números (Padrão / Imersivo) - discreto
   -------------------------------------------------------------------------- */
function initNumbersToggle() {
  const btns = document.querySelectorAll("[data-numbers-toggle]");
  if (!btns.length) return;
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const view = btn.dataset.numbersToggle; // "classic" | "cmo"
      document.querySelectorAll(".numbers-view").forEach((v) =>
        v.classList.toggle("is-active", v.dataset.numview === view)
      );
      btns.forEach((b) => {
        const active = b.dataset.numbersToggle === view;
        b.classList.toggle("bg-secondary", active);
        b.classList.toggle("text-white", active);
        b.classList.toggle("text-slate-300", !active);
        b.setAttribute("aria-pressed", String(active));
      });
      // re-dispara o count-up na view recém-exibida
      const shown = document.querySelector('.numbers-view[data-numview="' + view + '"]');
      if (shown) shown.querySelectorAll("[data-countup]").forEach(animateCount);
    })
  );
}

/* --------------------------------------------------------------------------
   Toggle A/B de patrocinadores (Versão Escura / Versão Clara)
   -------------------------------------------------------------------------- */
function initSponsorsToggle() {
  const btns = document.querySelectorAll("[data-sponsors-toggle]");
  if (!btns.length) return;
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const view = btn.dataset.sponsorsToggle; // "dark" | "light"
      document.querySelectorAll(".sponsors-view").forEach((v) =>
        v.classList.toggle("is-active", v.dataset.view === view)
      );
      btns.forEach((b) => {
        const active = b.dataset.sponsorsToggle === view;
        b.classList.toggle("bg-secondary", active);
        b.classList.toggle("text-white", active);
        b.classList.toggle("text-on-surface", !active);
        b.setAttribute("aria-pressed", String(active));
      });
    })
  );
}

/* --------------------------------------------------------------------------
   Acordeão da programação (item clicável abre detalhe)
   -------------------------------------------------------------------------- */
function initProgramAccordion() {
  document.querySelectorAll(".acc-item > .acc-trigger").forEach((trigger) =>
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".acc-item");
      const open = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
    })
  );
}

/* --------------------------------------------------------------------------
   Abas por dia (programação)
   -------------------------------------------------------------------------- */
function initProgramTabs() {
  const tabs = document.querySelectorAll("[data-day-tab]");
  if (!tabs.length) return;
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      const day = tab.dataset.dayTab;
      tabs.forEach((t) => {
        const active = t.dataset.dayTab === day;
        t.classList.toggle("bg-primary", active);
        t.classList.toggle("text-white", active);
        t.classList.toggle("text-accent", !active);
        t.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll("[data-day-panel]").forEach((p) =>
        p.classList.toggle("hidden", p.dataset.dayPanel !== day)
      );
    })
  );
}
