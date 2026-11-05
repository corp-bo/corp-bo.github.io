/* Lee INVITACION (config/content.js) y rellena el HTML. No requiere edición por cliente. */
(function () {
  "use strict";
  var C = window.INVITACION;
  if (!C) { console.error("Falta config/content.js"); return; }

  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var SEM = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"];
  var $ = function (id) { return document.getElementById(id); };
  var set = function (id, t) { var e = $(id); if (e) e.textContent = (t === undefined || t === null) ? "" : t; };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var F = C.fecha, mesNombre = MESES[F.mes - 1];
  var hm = C.fiesta.hora.split(":");
  var zona = C.fiesta.zonaHoraria || "";
  var objetivo = new Date(F.anio + "-" + pad(F.mes) + "-" + pad(F.dia) + "T" + pad(+hm[0]) + ":" + pad(+hm[1]) + ":00" + zona);
  if (isNaN(objetivo)) objetivo = new Date(F.anio, F.mes - 1, F.dia, +hm[0], +hm[1], 0);

  /* ---------- Imagen de fondo (estampado) ---------- */
  var raiz = document.documentElement.style;
  if (C.imagenes && C.imagenes.portada) {   // ruta absoluta: el CSS la resolvería respecto a css/styles.css
    raiz.setProperty("--img-floral", 'url("' + new URL(C.imagenes.portada, document.baseURI).href + '")');
  }
  if (C.imagenes && C.imagenes.tamanoPatron) raiz.setProperty("--tam-floral", C.imagenes.tamanoPatron);

    if (C.imagenes && C.imagenes.marcoInicio) {
    raiz.setProperty("--img-marco-ini", 'url("' + new URL(C.imagenes.marcoInicio, document.baseURI).href + '")');
  }

  /* ---------- Textos ---------- */
  document.title = C.meta.titulo;
  var md = document.querySelector('meta[name="description"]'); if (md) md.content = C.meta.descripcion;

  set("portada-novio", C.novios.novio); set("portada-novia", C.novios.novia);
  set("portada-fecha", F.dia + " de " + mesNombre + " de " + F.anio);
  set("portada-mensaje", C.portada.mensaje); set("btn-abrir", C.portada.boton);
  set("hero-etiqueta", C.hero.etiqueta);
  set("hero-novio", C.novios.novio); set("hero-novia", C.novios.novia);

  set("padres-enc-1", C.padres.encabezado); set("padres-enc-2", C.padres.encabezado);
  set("padres-novio-1", C.padres.novio[0]); set("padres-novio-2", C.padres.novio[1]);
  set("padres-novia-1", C.padres.novia[0]); set("padres-novia-2", C.padres.novia[1]);
  set("padres-frase", C.padres.frase);
  set("padres-nombre-novio", C.padres.nombreNovio); set("padres-nombre-novia", C.padres.nombreNovia);

  set("ceremonia-titulo", C.ceremonia.titulo); set("ceremonia-lugar", C.ceremonia.lugar);
  set("ceremonia-hora", C.ceremonia.hora); set("ceremonia-dia", F.diaSemana);
  set("fiesta-titulo", C.fiesta.titulo); set("fiesta-texto", C.fiesta.texto);
  set("fiesta-hora", C.fiesta.hora); set("fiesta-dia", F.diaSemana);
  set("cuenta-titulo", C.fiesta.cuentaRegresiva);

  document.querySelectorAll("[data-fecha-dia]").forEach(function (e) { e.textContent = pad(F.dia); });
  document.querySelectorAll("[data-fecha-mes]").forEach(function (e) { e.textContent = mesNombre; });
  document.querySelectorAll("[data-fecha-anio]").forEach(function (e) { e.textContent = F.anio; });

  set("galeria-titulo", C.galeria.titulo);
  set("lugar-titulo", C.lugar.titulo); set("lugar-nombre", C.lugar.nombre);
  set("vest-titulo", C.vestimenta.titulo); set("vest-texto", C.vestimenta.texto); set("vest-codigo", C.vestimenta.codigo);
  set("libro-titulo", C.libro.titulo); set("libro-enviar", C.libro.boton);
  $("libro-nombre").placeholder = C.libro.placeholderNombre;
  $("libro-deseo").placeholder = C.libro.placeholderDeseo;
  set("cierre-texto", C.cierre.texto); set("cierre-versiculo", C.cierre.versiculo);
  set("cierre-cita", C.cierre.cita); set("cierre-credito", C.cierre.credito);
  set("btn-ics", C.calendario.textoEnlace); set("btn-rsvp", C.calendario.textoRsvp);

  /* ---------- Mapa ---------- */
  var q = encodeURIComponent(C.lugar.consulta);
  $("mapa").src = "https://www.google.com/maps?q=" + q + "&output=embed";
  $("mapa-abrir").href = "https://www.google.com/maps/search/?api=1&query=" + q;
  $("mapa-abrir").innerHTML = C.lugar.textoAbrir + ' <svg width="11" height="11" style="display:inline;vertical-align:-1px;fill:none" aria-hidden="true"><use href="#i-externo"/></svg>';
  $("mapa-llegar").href = "https://www.google.com/maps/dir/?api=1&destination=" + q;
  $("mapa-llegar").lastElementChild.textContent = C.lugar.textoLlegar;

  /* ---------- Dress code ---------- */
  var vi = $("vest-imagenes");
  (C.vestimenta.imagenes || []).forEach(function (o) {
    var f = document.createElement("figure"), im = document.createElement("img"), c = document.createElement("figcaption");
    im.src = o.src; im.alt = o.etiqueta; im.loading = "lazy"; c.textContent = o.etiqueta; f.append(im, c); vi.append(f);
  });
  (C.vestimenta.colores || []).forEach(function (col) {
    var s = document.createElement("span"); s.style.background = col; $("vest-colores").append(s);
  });

  /* ---------- Calendario del mes (semana desde el lunes) ---------- */
  (function () {
    var primero = (new Date(F.anio, F.mes - 1, 1).getDay() + 6) % 7;
    var total = new Date(F.anio, F.mes, 0).getDate();
    var h = '<div class="cal__mes">' + cap(mesNombre) + " " + F.anio + "</div>" +
            '<div class="cal__sem-fila">' + SEM.map(function (d) { return "<span>" + d + "</span>"; }).join("") + "</div>" +
            '<div class="cal__linea"></div><div class="cal__grid">';
    for (var i = 0; i < primero; i++) h += "<span></span>";
    for (var d = 1; d <= total; d++) {
      h += d === F.dia
        ? '<span class="cal__dia cal__dia--marca"><svg aria-hidden="true"><use href="#i-corazon"/></svg><b>' + d + "</b></span>"
        : '<span class="cal__dia">' + d + "</span>";
    }
    $("calendario").innerHTML = h + "</div>";
  })();

  /* ---------- Cuenta regresiva ---------- */
  var U = C.fiesta.unidades || { dias: "días", horas: "h", minutos: "min", segundos: "seg" };
  function cuenta() {
    var s = Math.max(0, Math.floor((objetivo - new Date()) / 1000));
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    $("cuenta").textContent = d + " " + U.dias + " " + h + " " + U.horas + " " + m + " " + U.minutos + " " + (s % 60) + " " + U.segundos;
  }
  cuenta(); setInterval(cuenta, 1000);

  /* ---------- Añadir al calendario (.ics) y RSVP ---------- */
  var utc = function (dt) { return dt.toISOString().replace(/[-:]|\.\d{3}/g, ""); };
  $("btn-ics").addEventListener("click", function (e) {
    e.preventDefault();
    var fin = new Date(objetivo.getTime() + (C.calendario.duracionHoras || 5) * 3600 * 1000);
    var ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Invitacion//ES","BEGIN:VEVENT",
      "UID:" + utc(objetivo) + "@invitacion","DTSTAMP:" + utc(new Date()),
      "DTSTART:" + utc(objetivo),"DTEND:" + utc(fin),
      "SUMMARY:" + (C.calendario.titulo || C.meta.titulo),"LOCATION:" + C.lugar.nombre,"END:VEVENT","END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "boda.ics"; document.body.append(a); a.click(); a.remove();
  });
  $("btn-rsvp").href = "https://wa.me/" + C.rsvp.whatsapp + "?text=" + encodeURIComponent(C.rsvp.mensaje);

  /* ---------- Carrusel 3D (avance automático + deslizar) ---------- */
  (function () {
    var fotos = (C.galeria.fotos || []).slice(0, 12), n = fotos.length, cur = 0, cont = $("carrusel"), timer = null, x0 = null;
    if (!n) { cont.style.display = "none"; $("carrusel-contador").style.display = "none"; return; }
    var slides = fotos.map(function (src, i) {
      var s = document.createElement("div"), im = document.createElement("img");
      s.className = "slide"; im.src = src; im.alt = "Foto " + (i + 1); im.draggable = false; s.append(im); cont.append(s);
      return s;
    });
    function pintar() {
      var mitad = Math.floor(n / 2);
      slides.forEach(function (s, i) {
        var o = ((i - cur + n + mitad) % n) - mitad, a = Math.abs(o);
        s.style.transform = "translateX(" + o * 70 + "%) rotateY(" + (-o * 42) + "deg) scale(" + (a ? .84 : 1) + ")";
        s.style.opacity = a > 1 ? 0 : 1; s.style.zIndex = 10 - a;
      });
      set("carrusel-contador", (cur + 1) + " / " + n);
    }
    function ir(i) { cur = (i + n) % n; pintar(); }
    function arrancar() {
      clearInterval(timer);
      if (n > 1 && C.galeria.intervalo > 0) timer = setInterval(function () { if (x0 === null) ir(cur + 1); }, C.galeria.intervalo);
    }
    cont.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    /*cont.addEventListener("pointerup", function (e) {
      if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { ir(cur + (dx < 0 ? 1 : -1)); arrancar(); }
    });*/

    cont.addEventListener("pointerup", function (e) {
      if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { ir(cur + (dx < 0 ? 1 : -1)); arrancar(); }
      else if (Math.abs(dx) < 10) {                       // toque/click sin arrastrar
        var i = slides.indexOf(e.target.closest(".slide"));
        //if (i === cur) abrirZoom(fotos[cur], "Foto " + (cur + 1));   // foto central: ampliar
        if (i === cur) abrirZoom(cur);                               // foto central: ampliar
        else if (i > -1) { ir(i); arrancar(); }                      // foto lateral: llevarla al centro
      }
    });    

    cont.addEventListener("pointercancel", function () { x0 = null; });
    pintar(); arrancar();
  })();

    /* ---------- Zoom de foto (se abre en la misma pestaña) ---------- */
  /*var zoom = $("zoom"), zoomImg = $("zoom-img"), estabaCorriendo = false;
  function abrirZoom(src, alt) {
    zoomImg.src = src; zoomImg.alt = alt || "";
    zoom.classList.add("abierto");
    estabaCorriendo = auto.activo(); auto.detener();      // pausa el scroll automático mientras ves la foto
  }
  function cerrarZoom() {
    if (!zoom.classList.contains("abierto")) return;
    zoom.classList.remove("abierto");
    if (estabaCorriendo) auto.reanudar();                 // lo continúa si estaba corriendo
  }
  zoom.addEventListener("click", cerrarZoom);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarZoom(); });*/

    /* ---------- Visor de fotos: ventana con zoom y deslizar ---------- */
  var zoom = $("zoom"), zImg = $("zoom-img"), zEscena = $("zoom-escena");
  var listaZoom = (C.galeria.fotos || []).slice(0, 12);
  var zi = 0, esc = 1, tx = 0, ty = 0, punteros = {}, gesto = null, ultimoToque = 0, estabaCorriendo = false;

  function aplicar() {
    var lx = Math.max(0, (zImg.offsetWidth * esc - zEscena.clientWidth) / 2);
    var ly = Math.max(0, (zImg.offsetHeight * esc - zEscena.clientHeight) / 2);
    tx = Math.max(-lx, Math.min(lx, tx)); ty = Math.max(-ly, Math.min(ly, ty));
    zImg.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + esc + ")";
  }
  function reiniciarZoom() { esc = 1; tx = 0; ty = 0; aplicar(); }
  function mostrar(i, dir) {
    var n = listaZoom.length; if (!n) return;
    zi = (i + n) % n;
    zImg.src = listaZoom[zi]; zImg.alt = "Foto " + (zi + 1);
    set("zoom-contador", (zi + 1) + " / " + n);
    reiniciarZoom();
    if (dir) {                                              // pequeña animación al cambiar de foto
      zImg.style.setProperty("--desde", (dir * 60) + "px");
      zImg.classList.remove("entra"); void zImg.offsetWidth; zImg.classList.add("entra");
    }
  }
  function abrirZoom(i) {
    mostrar(i, 0); zoom.classList.add("abierto");
    estabaCorriendo = auto.activo(); auto.detener();        // pausa el scroll automático mientras ves la foto
  }
  function cerrarZoom() {
    if (!zoom.classList.contains("abierto")) return;
    zoom.classList.remove("abierto");
    if (estabaCorriendo) auto.reanudar();
  }
  function alternarZoom(cx, cy) {                           // doble toque: acerca hacia el punto tocado / regresa
    if (esc > 1) { reiniciarZoom(); return; }
    esc = 2.5;
    tx = (zEscena.clientWidth / 2 - cx) * (esc - 1);
    ty = (zEscena.clientHeight / 2 - cy) * (esc - 1);
    aplicar();
  }
  var dist = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };

  zEscena.addEventListener("pointerdown", function (e) {
    zEscena.setPointerCapture(e.pointerId);
    punteros[e.pointerId] = { x: e.clientX, y: e.clientY };
    gesto = gesto || { x0: e.clientX, y0: e.clientY, t0: Date.now(), movio: false, pellizco: false, base: null };
    var ids = Object.keys(punteros);
    if (ids.length === 2) { gesto.pellizco = true; gesto.base = { d: dist(punteros[ids[0]], punteros[ids[1]]), esc: esc }; }
    zImg.classList.add("en-gesto");
  });
  zEscena.addEventListener("pointermove", function (e) {
    var p = punteros[e.pointerId]; if (!p || !gesto) return;
    var dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    var ids = Object.keys(punteros);
    if (ids.length === 2 && gesto.base) {                   // pellizcar con dos dedos
      esc = Math.min(5, Math.max(1, gesto.base.esc * dist(punteros[ids[0]], punteros[ids[1]]) / gesto.base.d));
      gesto.movio = true; aplicar(); return;
    }
    if (Math.hypot(e.clientX - gesto.x0, e.clientY - gesto.y0) > 10) gesto.movio = true;
    if (esc > 1) { tx += dx; ty += dy; aplicar(); }         // con zoom: mueve la foto
  });
  function finGesto(e) {
    if (!punteros[e.pointerId]) return;
    delete punteros[e.pointerId];
    if (Object.keys(punteros).length) { if (gesto) gesto.base = null; return; }
    zImg.classList.remove("en-gesto");
    var g = gesto; gesto = null; if (!g) return;
    var dx = e.clientX - g.x0;
    if (esc === 1 && g.movio && !g.pellizco && Math.abs(dx) > 50) {      // deslizar: siguiente / anterior
      mostrar(zi + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); return;
    }
    if (!g.movio && Date.now() - g.t0 < 500) {                           // toque
      var r = zImg.getBoundingClientRect(), ahora = Date.now();
      var dentro = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!dentro) { cerrarZoom(); return; }                             // toque fuera de la foto: cierra
      if (ahora - ultimoToque < 320) { alternarZoom(e.clientX, e.clientY); ultimoToque = 0; } else ultimoToque = ahora;
    }
  }
  zEscena.addEventListener("pointerup", finGesto);
  zEscena.addEventListener("pointercancel", finGesto);
  zEscena.addEventListener("wheel", function (e) {          // rueda del mouse: zoom
    e.preventDefault();
    esc = Math.min(5, Math.max(1, esc * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
    if (esc === 1) { tx = 0; ty = 0; }
    aplicar();
  }, { passive: false });

  zoom.querySelector(".zoom__cerrar").addEventListener("click", cerrarZoom);
  zoom.querySelector(".zoom__nav--prev").addEventListener("click", function () { mostrar(zi - 1, -1); });
  zoom.querySelector(".zoom__nav--next").addEventListener("click", function () { mostrar(zi + 1, 1); });
  document.addEventListener("keydown", function (e) {
    if (!zoom.classList.contains("abierto")) return;
    if (e.key === "Escape") cerrarZoom();
    if (e.key === "ArrowRight") mostrar(zi + 1, 1);
    if (e.key === "ArrowLeft") mostrar(zi - 1, -1);
  });

  /* ---------- Libro de visitas (se guarda en el navegador) ---------- */
  (function () {
    var KEY = "invitacion_deseos_" + C.meta.titulo, lista = $("libro-lista"), datos = [];
    try { datos = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) {}
    function pintar() {
      lista.textContent = "";
      if (!datos.length) { lista.textContent = C.libro.vacio; return; }
      datos.slice().reverse().forEach(function (d) {
        var w = document.createElement("div"), b = document.createElement("b"), s = document.createElement("span");
        w.className = "deseo"; b.textContent = d.n; s.textContent = d.t; w.append(b, s); lista.append(w);
      });
    }
    $("libro-enviar").addEventListener("click", function () {
      var n = $("libro-nombre").value.trim(), t = $("libro-deseo").value.trim();
      if (!n || !t) { (n ? $("libro-deseo") : $("libro-nombre")).focus(); return; }
      datos.push({ n: n, t: t });
      try { localStorage.setItem(KEY, JSON.stringify(datos)); } catch (e) {}
      $("libro-nombre").value = ""; $("libro-deseo").value = ""; pintar();
    });
    $("libro-magia").addEventListener("click", function () {
      var s = C.libro.sugerencias || []; if (s.length) $("libro-deseo").value = s[Math.floor(Math.random() * s.length)];
    });
    pintar();
  })();

  /* ---------- Scroll automático: un toque/click lo detiene, otro lo continúa ---------- */
  var AS = C.autoScroll || { activo: false };
  var auto = (function () {
    var vel = AS.velocidad || 55, pos = 0, ultimo = 0, corriendo = false, manual = false, habilitado = false, raf = 0, tManual = 0;
    /*var NO_TOGGLE = "a, button, input, textarea, select, label, iframe, #portada";*/
    var NO_TOGGLE = "a, button, input, textarea, select, label, iframe, #portada, .carrusel, #zoom";

    function maximo() { return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }
    function paso(t) {
      raf = 0; if (!corriendo) return;
      var dt = Math.min(.1, (t - ultimo) / 1000); ultimo = t;
      if (!manual) {
        if (Math.abs(window.scrollY - pos) > 1.5) pos = window.scrollY;       // respeta el scroll manual del usuario
        pos = Math.min(maximo(), pos + vel * dt);
        window.scrollTo(0, pos);
        if (pos >= maximo() - 1) { corriendo = false; return; }                // llegó al final
      }
      raf = requestAnimationFrame(paso);
    }
    function iniciar() {
      if (!habilitado || corriendo) return;
      corriendo = true; pos = window.scrollY; ultimo = performance.now();
      if (!raf) raf = requestAnimationFrame(paso);
    }
    function detener() { corriendo = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    function alternar() { corriendo ? detener() : iniciar(); }
    function mientrasManual(ms) { manual = true; clearTimeout(tManual); tManual = setTimeout(function () { manual = false; pos = window.scrollY; }, ms); }

    /* Detección de "toque": poco movimiento y poca duración (no cuenta si arrastras para hacer scroll) */
    var p0 = null;
    document.addEventListener("pointerdown", function (e) {
      p0 = (e.button === 0 || e.pointerType === "touch") ? { x: e.clientX, y: e.clientY, t: Date.now(), el: e.target } : null;
    });
    document.addEventListener("pointerup", function (e) {
      if (!p0 || !habilitado) { p0 = null; return; }
      var tap = Math.hypot(e.clientX - p0.x, e.clientY - p0.y) < 10 && Date.now() - p0.t < 600;
      var interactivo = p0.el.closest && p0.el.closest(NO_TOGGLE);
      p0 = null;
      if (tap && !interactivo) alternar();
    });
    document.addEventListener("pointercancel", function () { p0 = null; });

    /* Mientras el usuario hace scroll con el dedo, la rueda o el teclado, no pelea con él */
    document.addEventListener("touchstart", function () { manual = true; clearTimeout(tManual); }, { passive: true });
    var finTouch = function () { clearTimeout(tManual); tManual = setTimeout(function () { manual = false; pos = window.scrollY; }, 1200); };
    document.addEventListener("touchend", finTouch, { passive: true });
    document.addEventListener("touchcancel", finTouch, { passive: true });
    window.addEventListener("wheel", function () { mientrasManual(900); }, { passive: true });
    window.addEventListener("keydown", function (e) {
      if (["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].indexOf(e.key) > -1) mientrasManual(900);
    });

    /*return {
      habilitar: function () { if (AS.activo) { habilitado = true; iniciar(); } }
    };*/

    return {
      habilitar: function () { if (AS.activo) { habilitado = true; iniciar(); } },
      detener: detener,
      reanudar: function () { iniciar(); },
      activo: function () { return corriendo; }
    };

  })();

  /* ---------- Música y portada ---------- */
  var audio = $("audio"), bm = $("btn-musica");
  audio.src = C.musica.archivo; audio.volume = C.musica.volumen;
  function estado() { bm.classList.toggle("sonando", !audio.paused); }
  audio.addEventListener("play", estado); audio.addEventListener("pause", estado);
  bm.addEventListener("click", function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); });

  $("btn-abrir").addEventListener("click", function () {
    $("portada").classList.add("oculta");
    document.body.classList.remove("bloqueado");
    bm.classList.add("visible");
    window.scrollTo(0, 0);
    audio.play().catch(function () {});
    setTimeout(function () { $("portada").style.display = "none"; auto.habilitar(); }, 1000);
  });

  /* ---------- Aparición suave al hacer scroll ---------- */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  } else els.forEach(function (e) { e.classList.add("visible"); });
})();
