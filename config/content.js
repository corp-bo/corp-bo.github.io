/* ==========================================================
   CONTENIDO DE LA INVITACIÓN — lo único que se edita por cliente
   (junto con config/colors.css, config/fonts.css y assets/)
   ========================================================== */
window.INVITACION = {

  /* ---------- Datos generales ---------- */
  meta: {
    titulo: "Ramiro & Magui",                       // pestaña del navegador
    descripcion: "Tenemos el honor de invitarte a nuestra boda"
  },

  novios: { novio: "Ramiro", novia: "Magui" },

  /* Fecha del evento (mes 1-12) */
  fecha: { anio: 2026, mes: 12, dia: 5, diaSemana: "Sábado" },

  /* ---------- Portada (tarjeta con el botón "Abrir") ---------- */
  portada: {
    mensaje: "Tenemos el honor de invitarles a celebrar nuestra unión en matrimonio",
    boton: "Abrir"
  },

  /* ---------- Marco de nombres ---------- */
  hero: { etiqueta: "Nuestra boda" },

  /* ---------- Padres y ceremonia ---------- */
  padres: {
    encabezado: "Sr. y Sra.",
    novio: ["Manuel Nina Acarapi", "Gualbina Ramos de Nina"],
    novia: ["Marcelo Callisaya Machaca", "Cristina Altamirano Patty"],
    frase: "Con la gracia de Dios y la bendición de nuestros padres",
    nombreNovio: "Ramiro Nina Ramos",
    nombreNovia: "Magui Callisaya Altamirano"
  },

  ceremonia: { titulo: "Ceremonia de boda", lugar: "Iglesia Bethel", hora: "11:00" },

  /* ---------- Galería (hasta 12 fotos; agrega o quita rutas) ---------- */
  galeria: {
    titulo: "Galería de fotos",
    intervalo: 2600,                                // ms entre fotos (0 = sin avance automático)
    fotos: [
      "assets/img/1.jpg",  "assets/img/2.jpg",  "assets/img/3.jpg",  "assets/img/4.jpg",
      "assets/img/5.jpg",  "assets/img/6.jpg",  "assets/img/7.jpg",  "assets/img/8.jpg",
      "assets/img/9.jpg",  "assets/img/10.jpg", "assets/img/11.jpg", "assets/img/12.jpg"
    ]
  },

  /* ---------- Fiesta, cuenta regresiva y calendario ---------- */
  fiesta: {
    titulo: "Fiesta",
    texto: "La recepción se llevará a cabo:",
    hora: "14:30",                                  // formato 24 h (HH:MM); también es la hora de la cuenta regresiva
    zonaHoraria: "-04:00",                          // Bolivia = -04:00 · México = -06:00 · España (invierno) = +01:00
    cuentaRegresiva: "Cuenta regresiva",
    unidades: { dias: "días", horas: "h", minutos: "min", segundos: "seg" }
  },

  calendario: {
    textoEnlace: "Añadir al Calendario",
    textoRsvp: "Confirmar asistencia",
    titulo: "Boda Ramiro & Magui",                  // nombre del evento al añadirlo al calendario
    duracionHoras: 6
  },

  /* RSVP por WhatsApp: número con código de país, sin + ni espacios */
  rsvp: {
    whatsapp: "59165184362",
    mensaje: "¡Hola! Confirmo mi asistencia a la boda de Ramiro & Magui el 5 de diciembre."
  },

  /* ---------- Lugar de la recepción (mapa de Google) ---------- */
  lugar: {
    titulo: "Recepción social",
    nombre: "Recreo familiar Wakulla",
    consulta: "Wakulla Recreo Familiar, El Alto, Bolivia",   // lo que busca Google Maps (nombre + ciudad, o "lat,lng")
    textoAbrir: "Abrir en Maps",
    textoLlegar: "Cómo llegar"
  },

  /* ---------- Dress code ---------- */
  vestimenta: {
    titulo: "Dress code",
    texto: "Vestimenta para la fiesta:",
    codigo: "Bonitos y gorditos",
    colores: ["#e8b4bc", "#a9bf9c", "#a9b8d0"],     // círculos de colores sugeridos
    imagenes: []                                    // opcional, ej.: [{ src: "assets/img/traje.jpg", etiqueta: "Caballeros" }, { src: "assets/img/vestido.jpg", etiqueta: "Damas" }]
  },

  /* ---------- Libro de visitas ---------- */
  libro: {
    titulo: "Libro de visitas",
    placeholderNombre: "Ingresa tu nombre*",
    placeholderDeseo: "Escribe tus deseos*",
    boton: "Enviar deseos",
    vacio: "Aún no hay deseos. ¡Sé el primero!",
    sugerencias: [                                  // la varita mágica rellena uno al azar
      "¡Que Dios bendiga su unión hoy y siempre!",
      "Les deseamos una vida llena de amor y alegría.",
      "¡Felicidades! Que su amor crezca cada día."
    ]
  },

  /* ---------- Cierre ---------- */
  cierre: {
    texto: "Su presencia será el mejor regalo que podríamos recibir.",
    versiculo: "“Más valen dos que uno, porque obtienen más fruto de su esfuerzo. Si caen, el uno levanta al otro”.",
    cita: "Eclesiastés 4:9-10",
    credito: ""                                     // ej.: "♡ tu-marca.com" (vacío = oculto)
  },

  /* ---------- Música ---------- */
  musica: { archivo: "assets/audio/cancion.mp3", volumen: 0.6 },

  /* ---------- Scroll automático ----------
     Se inicia al pulsar "Abrir". Un toque/click en la pantalla lo detiene;
     otro toque/click lo continúa. */
  autoScroll: {
    activo: true,
    velocidad: 55                                   // píxeles por segundo (30 = lento · 55 = como el video · 90 = rápido)
  },

  /* ---------- Imágenes ---------- */
  imagenes: {
    portada: "assets/img/portada.jpg",              // estampado floral (se repite como fondo)
        marcoInicio: "assets/img/decoracion-ini.jpg",   // tu marco de la sección de nombres
    tamanoPatron: "400px"                           // tamaño del patrón. Usa "cover" si pones una foto en vez de un patrón
  }
};
