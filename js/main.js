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
  function watchImages(root) {
    root.querySelectorAll(".media img").forEach(function (im) {
      function fail() { im.closest(".media").classList.add("is-missing"); }
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

    var gallery = (p.gallery || []).map(function (g, n) {
      return '<div class="g-item' + (n === 0 ? " g-wide" : "") + '">' + img(base + g.file, L(g.caption)) +
        "<p class=\"caption\">" + esc(L(g.caption)) + "</p></div>";
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
