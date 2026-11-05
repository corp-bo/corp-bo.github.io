# Invitación de boda digital (HTML + CSS + JS)

Plantilla basada en la invitación "Ramiro & Magui": portada con botón **Abrir**, marcos con estampado floral, galería 3D, cuenta regresiva, calendario, mapa, dress code, libro de visitas, música y **scroll automático**.

## Cómo verla
- Abre `index.html` con doble clic (funciona sin servidor), o súbela a cualquier hosting estático (Netlify, GitHub Pages, Vercel, tu hosting).
- Para ver la web en el celular con la misma red: `python3 -m http.server 8000` dentro de esta carpeta y entra a `http://IP-DE-TU-PC:8000`.
- Necesita internet para: las fuentes de Google, el mapa y el enlace de WhatsApp.

## Estructura
```
invitacion/
├── index.html            Estructura de las secciones (IDs vacíos que rellena main.js)
├── config/               ← LO ÚNICO QUE SE EDITA POR CLIENTE
│   ├── colors.css        Paleta (variables CSS)
│   ├── fonts.css         Fuentes y tamaños base
│   └── content.js        Textos, fecha, horarios, lugar, rutas de imágenes, RSVP
├── css/styles.css        Layout, responsive y transiciones (solo usa var(--...))
├── js/main.js            Lee INVITACION (content.js) y rellena el HTML
└── assets/
    ├── img/              portada.jpg, traje.jpg, vestido.jpg, 1.jpg … 12.jpg
    └── audio/            cancion.mp3
```

## Qué cambiar para cada cliente

### 1. Textos y datos → `config/content.js`
Cada bloque está comentado. Los más usados:

| Campo | Qué cambia |
|---|---|
| `meta.titulo` | Título de la pestaña |
| `novios.novio` / `novios.novia` | Nombres en la portada y en el marco principal |
| `fecha` | `anio`, `mes` (1-12), `dia` y `diaSemana`. El calendario se dibuja solo |
| `portada.mensaje` / `portada.boton` | Texto de la tarjeta de bienvenida |
| `padres` | Nombres de los padres, frase de bendición y nombres completos |
| `ceremonia` | Título, lugar y hora de la ceremonia |
| `fiesta.hora` | Hora de la recepción (24 h) y base de la cuenta regresiva |
| `fiesta.zonaHoraria` | Zona del evento (`-04:00` Bolivia, `-06:00` México, `-05:00` Colombia/Perú, `+01:00` España en invierno) |
| `calendario.titulo` | Nombre del evento al pulsar "Añadir al Calendario" |
| `rsvp.whatsapp` / `rsvp.mensaje` | Número con código de país (sin `+`) y mensaje de "Confirmar asistencia" |
| `lugar.nombre` / `lugar.consulta` | Nombre visible y búsqueda de Google Maps (ej. `"Salón Las Palmas, La Paz, Bolivia"` o `"-16.5,-68.15"`) |
| `vestimenta` | Código de vestimenta y colores (`colores`). Opcional: fotos de traje/vestido en `imagenes` |
| `libro.sugerencias` | Frases que rellena la varita mágica |
| `cierre` | Frase final, versículo/cita y crédito (`credito` vacío = oculto) |
| `musica.archivo` / `musica.volumen` | Canción y volumen (0 a 1) |

Para mostrar las fotos de traje y vestido (dress code), en `content.js`:
```js
imagenes: [
  { src: "assets/img/traje.jpg",   etiqueta: "Caballeros" },
  { src: "assets/img/vestido.jpg", etiqueta: "Damas" }
]
```

### 2. Imágenes → `assets/img/`
Reemplaza los archivos conservando el nombre (o cambia la ruta en `content.js`):

| Archivo | Uso |
|---|---|
| `portada.jpg` | Estampado floral del fondo (portada y bandas). Es un patrón que se repite. Si usas una foto, pon `imagenes.tamanoPatron: "cover"` |
| `1.jpg` … `12.jpg` | Galería de fotos (máximo 12; en `galeria.fotos` agrega o quita rutas) |
| `traje.jpg`, `vestido.jpg` | Opcionales (dress code) |

Las fotos incluidas son **de ejemplo**: cámbialas por las reales. Recomendado: horizontales, ~1200 px de ancho, menos de 300 KB cada una.
Para la vista previa al compartir por WhatsApp, edita también las 3 líneas `og:` de `index.html`.

### 3. Música → `assets/audio/cancion.mp3`
Reemplaza el archivo (la incluida es de ejemplo). El navegador solo permite el audio después de un toque, por eso empieza al pulsar **Abrir**. El botón redondo de abajo a la derecha la silencia o reanuda.

### 4. Colores → `config/colors.css`
Cambia solo las variables (`--color-primario`, `--color-fondo`, `--color-tarjeta`, `--color-calendario`, etc.). Nada más usa colores fijos.
El estampado floral es una imagen: para otro color, cambia `portada.jpg`.

### 5. Fuentes → `config/fonts.css`
1. Cambia la URL del `@import` por la fuente de Google Fonts que quieras.
2. Cambia el nombre en `--fuente-nombres`, `--fuente-elegante`, `--fuente-texto` o `--fuente-ui`.
También están los tamaños base (`--tam-nombres-hero`, `--tam-titulo`, …).

## Scroll automático
Al pulsar **Abrir**, la página baja sola.
- **Un toque o click** en cualquier parte de la pantalla → se detiene.
- **Otro toque o click** → continúa desde donde estaba.
- Si haces scroll con el dedo, la rueda o el teclado, el automático espera y sigue desde tu nueva posición.
- Los botones, enlaces, formulario y mapa no lo detienen.
- Se configura en `content.js`: `autoScroll.activo` (`true`/`false`) y `autoScroll.velocidad` (píxeles por segundo: 30 lento, 55 como el video, 90 rápido).
- Al llegar al final se detiene solo.

## Galería
Carrusel 3D con avance automático (`galeria.intervalo` en milisegundos; `0` lo desactiva). También se desliza con el dedo.

## Libro de visitas
Los deseos se guardan solo en el navegador de cada visitante (`localStorage`); el novio/a **no los recibe**. Si necesitas recibirlos, hay que conectar un servicio externo (Google Forms, Formspree, una base de datos) en `js/main.js`, sección "Libro de visitas".

## Responsive
Diseñada para celular. En pantallas grandes mantiene una columna central de ~480 px con el estampado a todo lo ancho; todo queda centrado. Respeta `prefers-reduced-motion`.

## Lista rápida para entregar a un cliente
1. `config/content.js`: nombres, fecha, hora, zona horaria, padres, lugar, WhatsApp.
2. `assets/img/`: fotos reales (1.jpg a 12.jpg) y, si quieres, otro `portada.jpg`.
3. `assets/audio/cancion.mp3`: su canción.
4. `config/colors.css` y `config/fonts.css` si quiere otro estilo.
5. `index.html`: las 3 líneas `og:` para la vista previa en WhatsApp.
6. Probar en el celular: Abrir → scroll automático → toque (pausa) → toque (continúa).
