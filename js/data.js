/*
  Contenido de la web. Todo el texto bilingüe vive aquí.
  - Para publicar un proyecto: published: true
  - Imágenes: assets/projects/<slug>/<archivo>. Si un archivo no existe, la web muestra un hueco con el nombre esperado.
  - Vídeo: video: { src: "assets/projects/<slug>/film.mp4", poster: "assets/projects/<slug>/poster.jpg" }
  - Campos vacíos ("") no se muestran.
*/

window.UI = {
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    hero_role: "Graphic designer and art director in Berlin",
    hero_text: "Brand identity, campaigns, interfaces and motion, from the first sketch to the finished system.",
    work_title: "Selected work",
    badge_client: "Client project",
    badge_concept: "Self-initiated concept",
    about_title: "About",
    about_text: [
      "I'm a graphic designer and art director working across brand identity, campaigns, UX/UI and motion.",
      "My background in 3D design and animation shapes how I think about form, movement and systems that hold together across every format.",
      "I use AI tools where they make the work better, and I say so on every project where I do."
    ],
    contact_title: "Open to new roles in Berlin or remote, and to freelance projects of any size.",
    contact_intro: "Tell me about your project or role. To request my CV, choose “CV request” as the reason.",
    f_name: "Name",
    f_email: "Email",
    f_company: "Company (optional)",
    f_reason: "Reason",
    r_freelance: "Freelance project",
    r_job: "Job opportunity",
    r_cv: "CV request",
    r_other: "Something else",
    f_message: "Message",
    f_send: "Send message",
    f_sending: "Sending…",
    f_sent: "Message sent. I'll get back to you by email.",
    f_invalid: "Fill in your name, a valid email address and a message.",
    f_error: "The message couldn't be sent. Check your connection and try again.",
    f_mailapp: "Your email app has opened with the message. Send it from there.",
    project_role: "Role",
    project_year: "Year",
    project_discipline: "Discipline",
    project_deliverables: "Deliverables",
    project_next: "Next project",
    project_back: "All projects",
    image_pending: "Image pending",
    not_found: "This project doesn't exist. Go back to all projects.",
    lang_switch: "Deutsch"
  },
  de: {
    nav_work: "Projekte",
    nav_about: "Über mich",
    nav_contact: "Kontakt",
    hero_role: "Grafikdesigner und Art Director in Berlin",
    hero_text: "Markenidentität, Kampagnen, Interfaces und Motion, von der ersten Skizze bis zum fertigen System.",
    work_title: "Ausgewählte Projekte",
    badge_client: "Kundenprojekt",
    badge_concept: "Eigenes Konzeptprojekt",
    about_title: "Über mich",
    about_text: [
      "Ich bin Grafikdesigner und Art Director und arbeite in Markenidentität, Kampagnen, UX/UI und Motion.",
      "Mein Hintergrund in 3D-Design und Animation prägt, wie ich über Form, Bewegung und Systeme denke, die in jedem Format funktionieren.",
      "KI-Werkzeuge setze ich dort ein, wo sie die Arbeit besser machen, und kennzeichne das bei jedem Projekt."
    ],
    contact_title: "Offen für neue Stellen in Berlin oder remote und für freie Projekte jeder Größe.",
    contact_intro: "Erzählen Sie mir von Ihrem Projekt oder Ihrer Stelle. Für meinen Lebenslauf wählen Sie als Anliegen „Lebenslauf anfragen“.",
    f_name: "Name",
    f_email: "E-Mail",
    f_company: "Unternehmen (optional)",
    f_reason: "Anliegen",
    r_freelance: "Freelance-Projekt",
    r_job: "Stellenangebot",
    r_cv: "Lebenslauf anfragen",
    r_other: "Etwas anderes",
    f_message: "Nachricht",
    f_send: "Nachricht senden",
    f_sending: "Wird gesendet…",
    f_sent: "Nachricht gesendet. Ich melde mich per E-Mail.",
    f_invalid: "Bitte geben Sie Ihren Namen, eine gültige E-Mail-Adresse und eine Nachricht ein.",
    f_error: "Die Nachricht konnte nicht gesendet werden. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    f_mailapp: "Ihr E-Mail-Programm hat sich mit der Nachricht geöffnet. Senden Sie sie von dort.",
    project_role: "Rolle",
    project_year: "Jahr",
    project_discipline: "Disziplin",
    project_deliverables: "Leistungen",
    project_next: "Nächstes Projekt",
    project_back: "Alle Projekte",
    image_pending: "Bild folgt",
    not_found: "Dieses Projekt gibt es nicht. Zurück zu allen Projekten.",
    lang_switch: "English"
  }
};

window.PROFILE = {
  name: "Juan Diego Ruiz",
  // El email no aparece en la página. Se guarda en dos partes para que los bots no lo lean.
  email: ["juandiego", "mail.de"],
  // Pega aquí tu enlace de Formspree (p. ej. "https://formspree.io/f/abcdwxyz").
  // Mientras esté vacío, el formulario abre el programa de correo del visitante con el mensaje ya escrito.
  formEndpoint: ""
};

window.PROJECTS = [
  {
    slug: "geoda-de-pulpi",
    published: true,
    type: "client",
    title: "La Geoda de Pulpí",
    theme: { bg: "#3B84BF", fg: "#FFFFFF", accent: "#FFFFFF" },
    year: "2019",
    role: { en: "Lead Designer", de: "Lead Designer" },
    discipline: { en: "Brand identity, mascot & brand book", de: "Markenidentität, Maskottchen & Brand Book" },
    summary: {
      en: "Brand identity for La Geoda de Pulpí, one of the largest visitable geodes in the world, inside a former mine in Almería, Spain.",
      de: "Markenidentität für La Geoda de Pulpí, eine der größten begehbaren Geoden der Welt, in einem ehemaligen Bergwerk in Almería, Spanien."
    },
    deliverables: {
      en: ["Logo", "Mascot", "Posters", "Brand book", "Social media basis", "Merchandise basis"],
      de: ["Logo", "Maskottchen", "Plakate", "Brand Book", "Basis für Social Media", "Basis für Merchandising"]
    },
    sections: [
      {
        heading: { en: "The brief", de: "Die Aufgabe" },
        text: {
          en: "La Geoda needed a visual identity that could carry it from on-site signage to social media and merchandise.",
          de: "La Geoda brauchte eine visuelle Identität, die von der Beschilderung vor Ort bis zu Social Media und Merchandising trägt."
        }
      },
      {
        heading: { en: "The work", de: "Die Arbeit" },
        text: {
          en: "I designed the logo, a mascot, a series of posters and the brand book that defines how the identity is applied across social media and merchandise.",
          de: "Ich habe das Logo, ein Maskottchen, eine Plakatserie und das Brand Book gestaltet, das die Anwendung der Identität für Social Media und Merchandising festlegt."
        }
      }
    ],
    gallery: [
      { file: "logo.jpg", caption: { en: "Logo", de: "Logo" } },
      { video: "logo_video.mp4", caption: { en: "Logo on video", de: "Logo auf Video" } },
      { file: "mascot.jpg", caption: { en: "Mascot", de: "Maskottchen" } },
      { video: "mascot_video.mp4", caption: { en: "3D rendered animation of Pulpi's Geode mascot (2019)", de: "3D-gerenderte Animation des Maskottchens von Pulpi’s Geode (2019)" } },
      { video: "mascot_ad_video.mp4", caption: { en: "TV/Internet Ad for Pulpi's Geode (2019)", de: "TV-/Internetwerbung für Pulpi’s Geode (2019)" } },
      { file: "posters.jpg", caption: { en: "Posters", de: "Plakate" } },
      { file: "brandbook-01.jpg", caption: { en: "Brand book", de: "Brand Book" } },
      { file: "brandbook-02.jpg", caption: { en: "Brand book", de: "Brand Book" } },
      { file: "merch.jpg", caption: { en: "Merchandise", de: "Merchandising" } }
    ],
    video: null,
    note: {
      en: "Client project, shown with permission.",
      de: "Kundenprojekt, veröffentlicht mit Genehmigung."
    }
  },
  {
    slug: "vanta",
    published: true,
    type: "concept",
    title: "VANTA",
    claim: "COFFEE FOR FORWARD MOTION.",
    theme: { bg: "#17372D", fg: "#F4F0E8", accent: "#B8663F" },
    year: "",
    role: { en: "Concept, art direction, design", de: "Konzept, Art Direction, Design" },
    discipline: { en: "Brand identity & packaging", de: "Markenidentität & Packaging" },
    summary: {
      en: "A specialty coffee brand built around one idea: coffee as fuel for people who keep moving. Premium, editorial and quiet.",
      de: "Eine Specialty-Coffee-Marke rund um eine Idee: Kaffee als Antrieb für Menschen, die in Bewegung bleiben. Premium, editorial und zurückhaltend."
    },
    deliverables: {
      en: ["Logo", "Typography & colour", "Packaging, 3 varieties", "Cups & bags", "Outdoor campaign", "Landing page", "Social media"],
      de: ["Logo", "Typografie & Farben", "Packaging, 3 Sorten", "Becher & Taschen", "Outdoor-Kampagne", "Landingpage", "Social Media"]
    },
    sections: [
      {
        heading: { en: "Identity", de: "Identität" },
        text: {
          en: "A restrained wordmark, editorial typography and three colours: deep green, ivory and copper.",
          de: "Eine zurückhaltende Wortmarke, editoriale Typografie und drei Farben: Dunkelgrün, Elfenbein und Kupfer."
        }
      },
      {
        heading: { en: "Applications", de: "Anwendungen" },
        text: {
          en: "Packaging for three varieties, cups and bags, an outdoor campaign, a landing page and social media, all from one system.",
          de: "Packaging für drei Sorten, Becher und Taschen, eine Outdoor-Kampagne, eine Landingpage und Social Media, alles aus einem System."
        }
      }
    ],
    gallery: [
      { file: "logo.jpg", caption: { en: "Logo", de: "Logo" } },
      { file: "packaging.jpg", caption: { en: "Packaging", de: "Packaging" } },
      { file: "cups.jpg", caption: { en: "Cups & bags", de: "Becher & Taschen" } },
      { file: "outdoor.jpg", caption: { en: "Outdoor campaign", de: "Outdoor-Kampagne" } },
      { file: "landing.jpg", caption: { en: "Landing page", de: "Landingpage" } },
      { file: "social.jpg", caption: { en: "Social media", de: "Social Media" } }
    ],
    video: null, // brand film 10–15 s
    note: {
      en: "Self-initiated concept, not a real brand or commission. Imagery created with AI-assisted tools; concept, art direction and design by me.",
      de: "Eigenes Konzeptprojekt, keine reale Marke und kein Auftrag. Bildmaterial mit KI-Unterstützung erstellt; Konzept, Art Direction und Design von mir."
    }
  },
  {
    slug: "city-never-stops",
    published: true,
    type: "concept",
    title: "City Never Stops",
    claim: "RUN THE CITY. OWN THE NIGHT.",
    theme: { bg: "#000000", fg: "#FFFFFF", accent: "#C8FF00" }, // TODO: ajustar al verde lima exacto
    year: "",
    role: { en: "Concept, art direction, design", de: "Konzept, Art Direction, Design" },
    discipline: { en: "Advertising & social campaign", de: "Werbe- & Social-Kampagne" },
    summary: {
      en: "A campaign concept for adidas Running about running at night: rain, city light and speed.",
      de: "Ein Kampagnenkonzept für adidas Running über das Laufen bei Nacht: Regen, Stadtlicht und Tempo."
    },
    deliverables: {
      en: ["Moodboard", "Key visual", "Instagram posts & Stories", "Paid social", "Art direction", "Mockups"],
      de: ["Moodboard", "Key Visual", "Instagram-Posts & Stories", "Paid Social", "Art Direction", "Mockups"]
    },
    sections: [
      {
        heading: { en: "The idea", de: "Die Idee" },
        text: {
          en: "The headline CITY NEVER STOPS turns the city at night into the track. Urban photography, rain, motion blur and a black and lime palette carry the speed.",
          de: "Die Headline CITY NEVER STOPS macht die Stadt bei Nacht zur Laufstrecke. Urbane Fotografie, Regen, Motion Blur und eine Palette aus Schwarz und Limettengrün tragen das Tempo."
        }
      },
      {
        heading: { en: "The campaign", de: "Die Kampagne" },
        text: {
          en: "A key visual that scales down to Instagram posts, Stories and paid social formats, with mockups of the campaign in use.",
          de: "Ein Key Visual, das sich auf Instagram-Posts, Stories und Paid-Social-Formate herunterbrechen lässt, mit Mockups der Kampagne im Einsatz."
        }
      }
    ],
    gallery: [
      { file: "moodboard.jpg", caption: { en: "Moodboard", de: "Moodboard" } },
      { file: "key-visual.jpg", caption: { en: "Key visual", de: "Key Visual" } },
      { file: "instagram.jpg", caption: { en: "Instagram", de: "Instagram" } },
      { file: "stories.jpg", caption: { en: "Stories", de: "Stories" } },
      { file: "mockups.jpg", caption: { en: "Mockups", de: "Mockups" } }
    ],
    video: null, // spot 15–20 s
    note: {
      en: "Independent, self-initiated campaign. Not commissioned or endorsed by adidas. Imagery created with AI-assisted tools; concept, art direction and design by me.",
      de: "Unabhängiges, eigenes Kampagnenkonzept. Nicht von adidas beauftragt oder unterstützt. Bildmaterial mit KI-Unterstützung erstellt; Konzept, Art Direction und Design von mir."
    }
  },
  {
    slug: "bicf",
    published: true,
    type: "concept",
    title: "Berlin International Comedy Festival",
    claim: "SERIOUSLY FUNNY.",
    theme: { bg: "#FFD400", fg: "#000000", accent: "#FF4DA6", claim: "#000000" },
    year: "",
    role: { en: "Concept, art direction, design", de: "Konzept, Art Direction, Design" },
    discipline: { en: "Festival identity", de: "Festivalidentität" },
    summary: {
      en: "Identity for a fictional international comedy festival in Berlin. Loud, bold and a little irreverent.",
      de: "Identität für ein fiktives internationales Comedy-Festival in Berlin. Laut, mutig und ein bisschen respektlos."
    },
    deliverables: {
      en: ["Moodboard", "Visual identity", "Graphic system", "Key visual", "3 artist posters", "Festival programme", "City poster mockups"],
      de: ["Moodboard", "Visuelle Identität", "Grafisches System", "Key Visual", "3 Künstlerplakate", "Festivalprogramm", "Plakat-Mockups"]
    },
    sections: [
      {
        heading: { en: "The system", de: "Das System" },
        text: {
          en: "Heavy type, expressive portraits, collage, hand-drawn marks and textured paper, in six colours from festival yellow to pink and blue.",
          de: "Kräftige Typografie, ausdrucksstarke Porträts, Collage, handgezeichnete Elemente und strukturiertes Papier, in sechs Farben von Festivalgelb bis Pink und Blau."
        }
      },
      {
        heading: { en: "In the city", de: "In der Stadt" },
        text: {
          en: "Three artist posters, a festival programme and city poster mockups. Country and language labels were removed from the posters to keep each one focused on the artist.",
          de: "Drei Künstlerplakate, ein Festivalprogramm und Plakat-Mockups im Stadtraum. Länder- und Sprachangaben wurden von den Plakaten entfernt, damit jedes Plakat ganz auf die Person fokussiert."
        }
      }
    ],
    gallery: [
      { file: "key-visual.jpg", caption: { en: "Key visual", de: "Key Visual" } },
      { file: "poster-aisha-brown.jpg", caption: { en: "Poster, Aisha Brown", de: "Plakat, Aisha Brown" } },
      { file: "poster-miguel-campos.jpg", caption: { en: "Poster, Miguel Campos", de: "Plakat, Miguel Campos" } },
      { file: "poster-jordan-reid.jpg", caption: { en: "Poster, Jordan Reid", de: "Plakat, Jordan Reid" } },
      { file: "programme.jpg", caption: { en: "Programme", de: "Programm" } },
      { file: "city.jpg", caption: { en: "City posters", de: "Plakate im Stadtraum" } }
    ],
    video: null, // promo 10–15 s
    note: {
      en: "Fictional festival and artists. Self-initiated concept. Imagery created with AI-assisted tools; concept, art direction and design by me.",
      de: "Fiktives Festival und fiktive Künstler. Eigenes Konzeptprojekt. Bildmaterial mit KI-Unterstützung erstellt; Konzept, Art Direction und Design von mir."
    }
  },

  // Pendientes: cambiar a published: true cuando estén listos.
  { slug: "corporate", published: false, type: "concept", title: "Corporate / B2B", theme: { bg: "#FFFFFF", fg: "#0F0F0F", accent: "#293A5B" } },
  { slug: "product-ux-ui", published: false, type: "concept", title: "Digital product / UX/UI", theme: { bg: "#FFFFFF", fg: "#0F0F0F", accent: "#293A5B" } },
  { slug: "motion", published: false, type: "concept", title: "Motion / Digital experience", theme: { bg: "#0F0F0F", fg: "#FFFFFF", accent: "#5EDA5B" } }
];
