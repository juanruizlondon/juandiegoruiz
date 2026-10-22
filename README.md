# Portfolio Juan Diego Ruiz

Web estática (HTML, CSS y JavaScript), bilingüe inglés/alemán, lista para GitHub Pages. No necesita instalación ni compilación.

## Estructura

```
index.html            Página principal
project.html          Plantilla de case study (project.html?p=vanta)
css/style.css         Estilos (colores y tipografía del Lebenslauf)
js/data.js            TODO el contenido: textos EN/DE y proyectos
js/main.js            Lógica (idioma, renderizado)
assets/img/           Retrato y favicon
assets/projects/<slug>/   Imágenes de cada proyecto
```

## Añadir imágenes

Cada proyecto espera `cover.jpg` y los archivos listados en su `gallery` dentro de `js/data.js`.
Mientras falte un archivo, la web muestra un hueco con la ruta exacta que espera.
Recomendado: JPG o WebP, 2000 px de ancho máximo, menos de 500 KB por imagen.

## Añadir vídeo

En `js/data.js`, dentro del proyecto:
`video: { src: "assets/projects/vanta/film.mp4", poster: "assets/projects/vanta/poster.jpg" }`
Mantén los MP4 por debajo de 25 MB (GitHub rechaza archivos de más de 100 MB). Para vídeos más pesados, súbelos a Vimeo y te adapto el bloque.

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `portfolio`, y sube todo el contenido de esta carpeta a la raíz.
2. En el repositorio: Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
3. La web estará en `https://<tu-usuario>.github.io/portfolio/`.

Dominio propio (juandiegoruiz.com): en Settings → Pages → Custom domain, escribe el dominio y configura los registros DNS que GitHub indica en tu proveedor.

## Publicar proyectos pendientes

Corporate / B2B, UX/UI y Motion ya están en `js/data.js` con `published: false`. Al completarlos, rellena sus campos (copia la estructura de VANTA) y cambia a `published: true`.

## Formulario de contacto (Formspree)

Tu email no aparece en la web. Para recibir los mensajes del formulario:

1. Crea una cuenta gratuita en formspree.io con juandiego@mail.de.
2. Crea un formulario nuevo y copia su enlace (algo como `https://formspree.io/f/abcdwxyz`).
3. Pégalo en `js/data.js`, en `formEndpoint`.
4. Envía un mensaje de prueba desde la web y confirma el email de verificación que te manda Formspree.

Mientras `formEndpoint` esté vacío, el formulario abre el programa de correo del visitante con el mensaje ya escrito.
