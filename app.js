/* Portfolio principal · monta a galeria a partir de dados.js e cuida do visualizador */
(function () {
  var OBRAS = window.OBRAS || [], PANOS = window.PANORAMAS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var porId = {};
  OBRAS.forEach(function (o) { porId[o.id] = o; });

  /* ---------- galeria ---------- */
  var galeria = $("#galeria");
  OBRAS.forEach(function (o, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "obra";
    b.dataset.grupo = o.grupo;
    b.dataset.i = i;
    b.setAttribute("aria-label", "Ampliar: " + o.titulo + ", " + o.cliente);
    b.innerHTML =
      '<span class="quadro"><img src="img/t/' + o.id + '.jpg" width="' + o.w + '" height="' + o.h +
      '" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '"></span>' +
      '<span class="leg"><b>' + esc(o.titulo) + "</b><span>" + esc(o.cliente) + " · " + o.ano + " · " + esc(o.tipo) + "</span></span>";
    galeria.appendChild(b);
  });

  var visiveis = OBRAS.slice(), filtro = "todos", tudo = false, LIMITE = 16;
  var verMais = $("#ver-mais");
  verMais.textContent = "Ver todos os " + OBRAS.length + " trabalhos";
  function aplicar() {
    visiveis = OBRAS.filter(function (o) { return filtro === "todos" || o.grupo === filtro; });
    var n = 0;
    galeria.querySelectorAll(".obra").forEach(function (b) {
      var ok = filtro === "todos" || b.dataset.grupo === filtro;
      if (ok) n++;
      b.classList.toggle("some", !ok || (filtro === "todos" && !tudo && n > LIMITE));
    });
    verMais.parentNode.hidden = filtro !== "todos" || tudo;
  }
  verMais.addEventListener("click", function () { tudo = true; aplicar(); });
  aplicar();
  galeria.addEventListener("click", function (e) {
    var b = e.target.closest(".obra");
    if (!b) return;
    var o = OBRAS[+b.dataset.i];
    abrir(visiveis, visiveis.indexOf(o));
  });

  /* filtros */
  var filtros = document.querySelectorAll(".filtros button");
  filtros.forEach(function (f) {
    f.addEventListener("click", function () {
      filtro = f.dataset.f;
      filtros.forEach(function (x) { var on = x === f; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
      aplicar();
    });
  });

  /* carrosseis completos */
  var panos = $("#panoramas");
  PANOS.forEach(function (p) {
    var f = document.createElement("figure");
    f.className = "pano";
    f.innerHTML = '<img src="img/obras/' + p.id + '.jpg" width="' + p.w + '" height="' + p.h +
      '" loading="lazy" decoding="async" alt="' + esc(p.titulo) + ', todos os slides lado a lado">' +
      "<figcaption>" + esc(p.cliente) + " · " + p.ano + " · carrossel completo</figcaption>";
    panos.appendChild(f);
  });

  /* miniaturas da trajetoria */
  document.querySelectorAll(".ano-fotos").forEach(function (caixa) {
    var lista = caixa.dataset.ids.split(",").map(function (id) { return porId[id]; }).filter(Boolean);
    lista.forEach(function (o, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ampliar: " + o.titulo + ", " + o.cliente);
      b.innerHTML = '<img src="img/t/' + o.id + '.jpg" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '">';
      b.addEventListener("click", function () { abrir(lista, i); });
      caixa.appendChild(b);
    });
  });

  /* prints de resultado */
  document.querySelectorAll("[data-zoom]").forEach(function (b) {
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
    document.querySelectorAll(".revela").forEach(function (el) { obs.observe(el); });

    var links = {};
    menu.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var obsSec = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("ativo", k === en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["inicio", "servicos", "resultados", "trajetoria", "trabalhos", "sites", "formacao", "processo", "contato"].forEach(function (id) {
      var s = document.getElementById(id); if (s) obsSec.observe(s);
    });
  } else {
    document.querySelectorAll(".revela").forEach(function (el) { el.classList.add("visto"); });
  }
})();
