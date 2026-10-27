(function () {
  "use strict";

  var UI = window.UI, PROFILE = window.PROFILE;
  var PROJECTS = window.PROJECTS.filter(function (p) { return p.published; });

  // ---------- language ----------
  function getLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "de") return q;
    try {
      var s = localStorage.getItem("lang");
      if (s === "en" || s === "de") return s;
    } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }
  var lang = getLang();

  function t(key) { return UI[lang][key]; }
  function L(obj) { return obj && typeof obj === "object" ? (obj[lang] || "") : (obj || ""); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    var st = document.getElementById("form-status");
    if (st) { st.textContent = ""; st.classList.remove("is-error"); }
    var sw = document.querySelector(".lang-switch");
    if (sw) {
      sw.textContent = t("lang_switch");
      sw.setAttribute("lang", lang === "en" ? "de" : "en");
    }
  }

  function bindSwitch() {
    var sw = document.querySelector(".lang-switch");
    if (!sw) return;
    sw.addEventListener("click", function () {
      lang = lang === "en" ? "de" : "en";
      try { localStorage.setItem("lang", lang); } catch (e) {}
      render();
    });
  }

  // ---------- images with visible placeholders ----------
  function img(src, alt, cls) {
    return '<figure class="media ' + (cls || "") + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">' +
      '<span class="media-missing"><strong>' + esc(t("image_pending")) + "</strong>" + esc(src) + "</span>" +
      "</figure>";
  }
  // Si una imagen no existe con la extensión indicada, prueba las demás
  // (logo.jpg → logo.jpeg → logo.png → logo.webp…) antes de mostrar el hueco.
  var EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];
  function watchImages(root) {
    root.querySelectorAll(".media img").forEach(function (im) {
      var src = im.getAttribute("src");
      var m = src.match(/^(.*)(\.(?:jpe?g|png|webp))$/i);
      var tried = m ? [m[2]] : [];
      function fail() {
        if (m) {
          var next = EXTS.filter(function (e) { return tried.indexOf(e) < 0; })[0];
          if (next) { tried.push(next); im.src = m[1] + next; return; }
        }
        im.closest(".media").classList.add("is-missing");
      }
      if (im.complete && im.naturalWidth === 0) fail();
      im.addEventListener("error", fail);
    });
  }

  function badge(p) {
    return '<span class="badge badge-' + p.type + '">' + esc(t(p.type === "client" ? "badge_client" : "badge_concept")) + "</span>";
  }

  // ---------- home ----------
  function renderHome() {
    var work = document.getElementById("work-list");
    if (!work) return;

    work.innerHTML = PROJECTS.map(function (p) {
      var href = "project.html?p=" + encodeURIComponent(p.slug);
      return '<li class="work-item" style="--p-bg:' + p.theme.bg + ";--p-fg:" + p.theme.fg + ";--p-accent:" + p.theme.accent + '">' +
        '<a href="' + href + '">' +
          img("assets/projects/" + p.slug + "/cover.jpg", p.title, "work-cover") +
          '<div class="work-meta">' +
            "<h3>" + esc(p.title) + "</h3>" +
            "<p>" + esc(L(p.discipline)) + "</p>" +
            badge(p) +
          "</div>" +
        "</a></li>";
    }).join("");
    watchImages(work);

    document.getElementById("about-text").innerHTML =
      t("about_text").map(function (s) { return "<p>" + esc(s) + "</p>"; }).join("");

  }

  // ---------- project page ----------
  function renderProject() {
    var root = document.getElementById("project");
    if (!root) return;
    var slug = new URLSearchParams(location.search).get("p");
    var i = PROJECTS.findIndex(function (p) { return p.slug === slug; });
    if (i < 0) {
      root.innerHTML = '<div class="wrap not-found"><p><a href="index.html#work">' + esc(t("not_found")) + "</a></p></div>";
      return;
    }
    var p = PROJECTS[i], next = PROJECTS[(i + 1) % PROJECTS.length];
    var base = "assets/projects/" + p.slug + "/";
    document.title = p.title + " | Juan Diego Ruiz";
    document.body.style.setProperty("--p-bg", p.theme.bg);
    document.body.style.setProperty("--p-fg", p.theme.fg);
    document.body.style.setProperty("--p-accent", p.theme.accent);
    document.body.style.setProperty("--p-claim", p.theme.claim || p.theme.accent);

    var facts = [
      ["project_discipline", L(p.discipline)],
      ["project_role", L(p.role)],
      ["project_year", p.year || ""]
    ].filter(function (f) { return f[1]; }).map(function (f) {
      return "<div><dt>" + esc(t(f[0])) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
    }).join("");

    var deliverables = (p.deliverables ? p.deliverables[lang] : []).map(function (d) {
      return "<li>" + esc(d) + "</li>";
    }).join("");

    var sections = (p.sections || []).map(function (s) {
      return '<section class="cs-text"><h2>' + esc(L(s.heading)) + "</h2><p>" + esc(L(s.text)) + "</p></section>";
    }).join("");

    // Galería: cada elemento puede ser una imagen ({ file: ... }) o un vídeo ({ video: ... }).
    // Opciones: wide: true (ocupa todo el ancho), poster: "imagen.jpg" (vídeo),
    // Los vídeos se reproducen solos, en bucle y silenciados (con controles para activar el sonido).
    // loop: true oculta los controles (tipo GIF). autoplay: false desactiva la reproducción automática.
    var gallery = (p.gallery || []).map(function (g, n) {
      var wide = g.wide === true || (g.wide !== false && n === 0);
      var media;
      if (g.video) {
        media = '<figure class="media media-video" style="aspect-ratio:auto;height:auto;min-height:0;padding:0;background:transparent">' +
          '<video style="position:static;display:block;width:100%;height:auto" playsinline preload="metadata"' +
          (g.autoplay === false ? "" : " autoplay muted loop") +
          (g.loop ? "" : " controls") +
          ' src="' + esc(base + g.video) + '"' +
          (g.poster ? ' poster="' + esc(base + g.poster) + '"' : "") +
          "></video></figure>";
      } else {
        media = img(base + g.file, L(g.caption));
      }
      var cap = L(g.caption);
      var data = ' data-type="' + (g.video ? "video" : "image") + '"' +
        ' data-src="' + esc(base + (g.video || g.file)) + '"' +
        (g.poster ? ' data-poster="' + esc(base + g.poster) + '"' : "") +
        ' data-cap="' + esc(cap) + '"';
      var expand = g.video ? '<button type="button" class="lb-open-btn" aria-label="' + (lang === "de" ? "Vergrößern" : "Enlarge") + '">&#x2922;</button>' : "";
      return '<div class="g-item' + (wide ? " g-wide" : "") + '"' + data + '>' + expand + media +
        (cap ? "<p class=\"caption\">" + esc(cap) + "</p>" : "") + "</div>";
    }).join("");

    var video = p.video && p.video.src
      ? '<div class="cs-video"><video controls playsinline preload="metadata" src="' + esc(p.video.src) + '"' +
        (p.video.poster ? ' poster="' + esc(p.video.poster) + '"' : "") + "></video></div>"
      : "";

    root.innerHTML =
      '<header class="cs-hero">' +
        '<div class="wrap">' +
          '<a class="back" href="index.html#work">' + esc(t("project_back")) + "</a>" +
          "<h1>" + esc(p.title) + "</h1>" +
          (p.claim ? '<p class="claim">' + esc(p.claim) + "</p>" : "") +
          '<p class="cs-summary">' + esc(L(p.summary)) + "</p>" +
          badge(p) +
        "</div>" +
      "</header>" +
      '<div class="wrap">' +
        img(base + "cover.jpg", p.title, "cs-cover") +
        '<div class="cs-body">' +
          '<aside class="cs-facts"><dl>' + facts + "</dl>" +
            (deliverables ? "<h3>" + esc(t("project_deliverables")) + '</h3><ul class="pills">' + deliverables + "</ul>" : "") +
          "</aside>" +
          '<div class="cs-main">' + sections + "</div>" +
        "</div>" +
        video +
        '<div class="gallery">' + gallery + "</div>" +
        (p.note ? '<p class="cs-note">' + esc(L(p.note)) + "</p>" : "") +
      "</div>" +
      '<a class="next" href="project.html?p=' + encodeURIComponent(next.slug) + '" style="--n-bg:' + next.theme.bg + ";--n-fg:" + next.theme.fg + '">' +
        '<div class="wrap"><span>' + esc(t("project_next")) + "</span><strong>" + esc(next.title) + "</strong></div>" +
      "</a>";
    watchImages(root);
    bindLightbox(root);
  }

  // ---------- lightbox (galería ampliada) ----------
  var LB = null, lbItems = [], lbIndex = 0, lbTouchX = null;

  function lbInit() {
    if (LB) return;
    var css = document.createElement("style");
    css.textContent =
      ".g-item{position:relative}" +
      ".g-item[data-type=image] .media:not(.is-missing){cursor:zoom-in}" +
      ".lb-open-btn{position:absolute;top:10px;right:10px;z-index:2;width:40px;height:40px;border:0;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;font-size:18px;line-height:1;cursor:pointer}" +
      ".lb-open-btn:hover{background:rgba(0,0,0,.85)}" +
      ".lb{position:fixed;inset:0;z-index:1000;display:none;flex-direction:column;background:rgba(12,12,12,.96);color:#fff}" +
      ".lb.is-open{display:flex}" +
      ".lb-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:64px 72px 8px}" +
      ".lb-stage img,.lb-stage video{display:block;max-width:100%;max-height:100%;object-fit:contain;user-select:none}" +
      ".lb-bar{display:flex;justify-content:space-between;gap:16px;padding:12px 24px 20px;font:14px/1.4 Inter,system-ui,sans-serif;opacity:.85}" +
      ".lb button{background:none;border:0;color:#fff;cursor:pointer;opacity:.75;line-height:1}" +
      ".lb button:hover,.lb button:focus-visible{opacity:1}" +
      ".lb-close,.lb-full{position:absolute;top:12px;width:44px;height:44px;font-size:24px}" +
      ".lb-close{right:12px}.lb-full{right:60px}" +
      ".lb-prev,.lb-next{position:absolute;top:50%;transform:translateY(-50%);width:60px;height:80px;font-size:44px}" +
      ".lb-prev{left:6px}.lb-next{right:6px}" +
      "@media (max-width:700px){.lb-stage{padding:60px 8px 8px}.lb-prev,.lb-next{display:none}}";
    document.head.appendChild(css);

    LB = document.createElement("div");
    LB.className = "lb";
    LB.setAttribute("role", "dialog");
    LB.setAttribute("aria-modal", "true");
    LB.innerHTML =
      '<div class="lb-stage"></div>' +
      '<div class="lb-bar"><span class="lb-cap"></span><span class="lb-count"></span></div>' +
      '<button type="button" class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button type="button" class="lb-next" aria-label="Next">&#8250;</button>' +
      '<button type="button" class="lb-full" aria-label="Fullscreen">&#x26F6;</button>' +
      '<button type="button" class="lb-close" aria-label="Close">&#x2715;</button>';
    document.body.appendChild(LB);

    var stage = LB.querySelector(".lb-stage");
    LB.querySelector(".lb-close").addEventListener("click", lbClose);
    LB.querySelector(".lb-prev").addEventListener("click", function () { lbShow(lbIndex - 1); });
    LB.querySelector(".lb-next").addEventListener("click", function () { lbShow(lbIndex + 1); });

    var fullBtn = LB.querySelector(".lb-full");
    if (!(LB.requestFullscreen || LB.webkitRequestFullscreen)) fullBtn.style.display = "none";
    fullBtn.addEventListener("click", function () {
      var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else (LB.requestFullscreen || LB.webkitRequestFullscreen).call(LB);
    });

    // clic en el fondo oscuro = cerrar
    stage.addEventListener("click", function (e) { if (e.target === stage) lbClose(); });

    // deslizar en móvil
    stage.addEventListener("touchstart", function (e) { lbTouchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (lbTouchX === null) return;
      var dx = e.changedTouches[0].clientX - lbTouchX;
      lbTouchX = null;
      if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
    });

    // teclado
    document.addEventListener("keydown", function (e) {
      if (!LB.classList.contains("is-open")) return;
      if (e.key === "Escape") lbClose();
      else if (e.key === "ArrowRight") lbShow(lbIndex + 1);
      else if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
    });
  }

  function lbShow(i) {
    if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    var it = lbItems[lbIndex];
    var stage = LB.querySelector(".lb-stage");
    stage.innerHTML = it.type === "video"
      ? '<video src="' + esc(it.src) + '"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") +
        ' controls autoplay muted loop playsinline></video>'
      : '<img src="' + esc(it.src) + '" alt="' + esc(it.cap) + '">';
    LB.querySelector(".lb-cap").textContent = it.cap;
    LB.querySelector(".lb-count").textContent = (lbIndex + 1) + " / " + lbItems.length;
    var multi = lbItems.length > 1 ? "" : "none";
    LB.querySelector(".lb-prev").style.display = multi;
    LB.querySelector(".lb-next").style.display = multi;
  }

  function lbOpen(i) {
    LB.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    lbShow(i);
    LB.querySelector(".lb-close").focus();
  }

  function lbClose() {
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    LB.classList.remove("is-open");
    LB.querySelector(".lb-stage").innerHTML = "";
    document.documentElement.style.overflow = "";
  }

  function bindLightbox(root) {
    lbInit();
    root.querySelectorAll(".g-item").forEach(function (el) {
      var trigger = el.getAttribute("data-type") === "video" ? el.querySelector(".lb-open-btn") : el.querySelector(".media");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        if (el.querySelector(".is-missing")) return;
        e.preventDefault();
        var els = Array.prototype.filter.call(root.querySelectorAll(".g-item"), function (x) {
          return !x.querySelector(".is-missing");
        });
        lbItems = els.map(function (x) {
          var im = x.querySelector(".media img");
          return { type: x.getAttribute("data-type"),
                   src: im ? im.getAttribute("src") : x.getAttribute("data-src"),
                   poster: x.getAttribute("data-poster") || "", cap: x.getAttribute("data-cap") || "" };
        });
        lbOpen(els.indexOf(el));
      });
    });
  }

  // ---------- contact form ----------
  function bindForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");
    function say(key, isError) {
      status.textContent = t(key);
      status.classList.toggle("is-error", !!isError);
    }
    var f = form.elements;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (f["_gotcha"].value) return;
      var email = f["email"].value.trim();
      if (!f["name"].value.trim() || !f["message"].value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        say("f_invalid", true);
        return;
      }
      var reason = f["reason"].options[f["reason"].selectedIndex].textContent;
      var endpoint = PROFILE.formEndpoint;

      if (!endpoint) {
        var to = PROFILE.email.join("@");
        var body = f["message"].value + "\n\n" + f["name"].value +
          (f["company"].value ? "\n" + f["company"].value : "") + "\n" + email;
        location.href = "mailto:" + to + "?subject=" + encodeURIComponent(reason) + "&body=" + encodeURIComponent(body);
        say("f_mailapp");
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      say("f_sending");
      var data = new FormData(form);
      data.set("reason", reason);
      data.append("_subject", "Portfolio: " + reason);
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          say("f_sent");
        })
        .catch(function () { say("f_error", true); })
        .then(function () { btn.disabled = false; });
    });
  }

  function render() {
    applyStatic();
    renderHome();
    renderProject();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  bindSwitch();
  bindForm();
  render();
})();
