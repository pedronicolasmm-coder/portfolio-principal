/* Portfolio principal · monta feeds, grades e celulares a partir de dados.js e cuida do visualizador */
(function () {
  var OBRAS = window.OBRAS || [], PANOS = window.PANORAMAS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var doGrupo = function (g) { return OBRAS.filter(function (o) { return o.grupo === g; }); };

  function botao(o, lista, i, extra) {
    var b = document.createElement("button");
    b.type = "button";
    if (extra) b.className = extra;
    b.setAttribute("aria-label", "Ampliar: " + o.titulo + ", " + o.cliente);
    b.innerHTML = '<img src="img/t/' + o.id + '.jpg" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '">';
    b.addEventListener("click", function () { abrir(lista, i); });
    return b;
  }

  /* feed 3x3 ao lado do texto */
  $$(".feed9").forEach(function (caixa) {
    var lista = doGrupo(caixa.dataset.grupo);
    lista.slice(0, 9).forEach(function (o, i) { caixa.appendChild(botao(o, lista, i)); });
  });

  /* grade larga, de 5 em 5 (no celular, de 3 em 3: o que sobra fica so no computador) */
  $$(".grade").forEach(function (caixa) {
    var lista = doGrupo(caixa.dataset.grupo);
    var cabe3 = Math.floor(lista.length / 3) * 3;
    lista.forEach(function (o, i) { caixa.appendChild(botao(o, lista, i, i >= cabe3 ? "so-desk" : "")); });
  });

  /* duas artes soltas (Eco do Pampa) */
  $$(".eco-artes").forEach(function (caixa) {
    var lista = doGrupo(caixa.dataset.grupo);
    lista.forEach(function (o, i) {
      var b = botao(o, lista, i);
      b.querySelector("img").removeAttribute("loading");
      caixa.appendChild(b);
    });
  });

  /* celular com o perfil */
  $$(".cel").forEach(function (cel) {
    var lista = doGrupo(cel.dataset.grupo).slice(0, 9);
    if (!lista.length) return;
    var grade = lista.map(function (o) { return '<img src="img/t/' + o.id + '.jpg" loading="lazy" decoding="async" alt="">'; }).join("");
    cel.setAttribute("role", "img");
    cel.setAttribute("aria-label", "Perfil @" + cel.dataset.user + " no celular, com as artes do feed");
    cel.innerHTML =
      '<div class="cel-tela"><span class="cel-ilha"></span>' +
      '<div class="cel-status"><span>9:41</span><span>●●●</span></div>' +
      '<div class="cel-user">' + esc(cel.dataset.user) + "</div>" +
      '<div class="cel-perfil"><img src="img/t/' + lista[0].id + '.jpg" alt=""><div><b>' + esc(cel.dataset.nome) +
      "</b><span>feed criado por Pedro Munareto</span></div></div>" +
      '<div class="cel-bts"><span>Seguindo</span><span>Mensagem</span></div>' +
      '<div class="cel-grade">' + grade + "</div></div>";
  });

  /* carrosseis completos */
  var porPano = {};
  PANOS.forEach(function (p) { porPano[p.id] = p; });
  $$(".panos").forEach(function (caixa) {
    caixa.dataset.ids.split(",").forEach(function (id) {
      var p = porPano[id];
      if (!p) return;
      var f = document.createElement("figure");
      f.className = "pano";
      f.innerHTML = '<img src="img/obras/' + p.id + '.jpg" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async" alt="' +
        esc(p.titulo) + ', todos os slides lado a lado">' + "<figcaption>" + esc(p.cliente) + " · " + p.ano + " · carrossel completo, arraste para o lado</figcaption>";
      caixa.appendChild(f);
    });
  });

  /* prints de resultado */
  $$("[data-zoom]").forEach(function (b) {
    b.addEventListener("click", function () {
      abrir([{ src: b.dataset.zoom, titulo: b.dataset.leg, cliente: "Pousada das Missões", ano: 2026, tipo: "Print de resultado" }], 0);
    });
  });

  /* ---------- visualizador ---------- */
  var lupa = $("#lupa"), img = $("#lupa-img"), leg = $("#lupa-leg"), atual = { lista: [], i: 0 }, foco = null;
  function mostrar(i) {
    var n = atual.lista.length;
    atual.i = (i + n) % n;
    var o = atual.lista[atual.i];
    img.src = o.src || ("img/obras/" + o.id + ".jpg");
    img.alt = o.titulo;
    leg.innerHTML = esc(o.titulo) + "<span>" + esc(o.cliente) + " · " + o.ano + " · " + esc(o.tipo) +
      (n > 1 ? " · " + (atual.i + 1) + " de " + n : "") + "</span>";
    $("#lupa-ant").hidden = n < 2;
    $("#lupa-prox").hidden = n < 2;
    if (n > 1) { var pre = new Image(); var p = atual.lista[(atual.i + 1) % n]; pre.src = p.src || ("img/obras/" + p.id + ".jpg"); }
  }
  function abrir(lista, i) {
    foco = document.activeElement;
    atual.lista = lista;
    mostrar(i < 0 ? 0 : i);
    lupa.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lupa-x").focus();
  }
  function fechar() {
    lupa.hidden = true;
    document.body.style.overflow = "";
    img.src = "";
    if (foco) foco.focus();
  }
  $("#lupa-x").addEventListener("click", fechar);
  $("#lupa-ant").addEventListener("click", function () { mostrar(atual.i - 1); });
  $("#lupa-prox").addEventListener("click", function () { mostrar(atual.i + 1); });
  lupa.addEventListener("click", function (e) { if (e.target === lupa) fechar(); });
  document.addEventListener("keydown", function (e) {
    if (lupa.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(atual.i - 1);
    if (e.key === "ArrowRight") mostrar(atual.i + 1);
  });
  var x0 = null;
  lupa.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lupa.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45 && atual.lista.length > 1) mostrar(atual.i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- sempre abre no topo ---------- */
  var mexeu = false;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) {
    window.addEventListener(ev, function () { mexeu = true; }, { once: true, passive: true });
  });
  function topo0() { if (!mexeu) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
  topo0();
  window.addEventListener("load", topo0);
  window.addEventListener("pageshow", function (e) { if (e.persisted) { mexeu = false; topo0(); } });

  /* ---------- menu e topo ---------- */
  var menu = $("#menu"), hamb = $("#hamb"), topo = $("#topo");
  hamb.addEventListener("click", function () {
    var a = menu.classList.toggle("aberto");
    hamb.setAttribute("aria-expanded", a ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("aberto"); hamb.setAttribute("aria-expanded", "false"); }
  });
  var rolou = function () { topo.classList.toggle("rolou", window.scrollY > 10); };
  window.addEventListener("scroll", rolou, { passive: true });
  rolou();

  /* ---------- efeitos ao rolar ---------- */
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visto"); obs.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
    $$(".revela").forEach(function (el) { obs.observe(el); });

    var links = {};
    $$("a", menu).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var secs = { sobre: "sobre", projetos: "projetos", pousada: "projetos", fasa: "projetos", tabua: "projetos", eco: "projetos",
      anima: "projetos", resultados: "resultados", sites: "sites", processo: "sites", contato: "contato" };
    var obsSec = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var alvo = secs[en.target.id];
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("ativo", k === alvo); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(secs).forEach(function (id) { var s = document.getElementById(id); if (s) obsSec.observe(s); });
  } else {
    $$(".revela").forEach(function (el) { el.classList.add("visto"); });
  }
})();
