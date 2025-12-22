// Script, um die Info aus der data.yaml in die Info-Page zu schreiben

function setFaviconFromLogo(logoPath) {
  if (!logoPath) return;
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  const url = new URL(logoPath, location.href);
  const isSvg = url.pathname.toLowerCase().endsWith(".svg");

  if (isSvg) {
    favicon.href = logoPath;
    favicon.type = "image/svg+xml";
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    favicon.href = canvas.toDataURL("image/png");
    favicon.type = "image/png";
  };
  img.src = logoPath;
}

function renderParagraphs(containerEl, text) {
  containerEl.innerHTML = "";

  const raw = String(text || "").trim();
  if (!raw) return;

  // Jede Zeile => Absatz (leere Zeilen werden ignoriert)
  const lines = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);

  for (const line of lines) {
    const p = document.createElement("p");
    p.textContent = line;
    containerEl.appendChild(p);
  }
}

async function loadInfoFromYaml() {
  const elPageTitle = document.getElementById("pageTitle");
  const elIntroText = document.getElementById("introText");
  const elPageLogo  = document.getElementById("pageLogo");

  const elInfoText  = document.getElementById("infoText");

  const elFooter    = document.getElementById("infoFooter");
  const elPrivacy   = document.getElementById("privacyLink");
  const elImprint   = document.getElementById("imprintLink");
  const elSep       = document.getElementById("linksSep");

  const elErrorState = document.getElementById("errorState");
  const elErrorText  = document.getElementById("errorText");

  try {
    const res = await fetch("./data.yaml", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const yamlText = await res.text();
    const data = jsyaml.load(yamlText);
    const meta = data?.meta || {};

    // Header aus YAML
    const title = meta.page_title || "Ladekarten-Kompass";
    document.title = `${title} – Info`;
    elPageTitle.textContent = title;
    elIntroText.textContent = meta.intro_text || "";

    if (meta.page_logo && elPageLogo) {
      elPageLogo.src = meta.page_logo;
      elPageLogo.alt = title;
      elPageLogo.classList.remove("hidden");
      elPageLogo.onerror = () => elPageLogo.classList.add("hidden");
      setFaviconFromLogo(meta.page_logo);
    } else if (elPageLogo) {
      elPageLogo.classList.add("hidden");
    }

    // Info-Text: jede Zeile => eigener Absatz
    renderParagraphs(elInfoText, meta.info_page_text || "");

    // Footer-Links (nur anzeigen, wenn befüllt)
    const ds = (meta.info_page_datenschutz_url || "").trim();
    const im = (meta.info_page_impressum_url || "").trim();

    let shown = 0;

    if (ds) {
    elPrivacy.href = ds;
    elPrivacy.classList.remove("hidden");
    shown++;
    } else {
    elPrivacy.classList.add("hidden");
    }

    if (im) {
    elImprint.href = im;
    elImprint.classList.remove("hidden");
    shown++;
    } else {
    elImprint.classList.add("hidden");
    }

    // Separator zwischen Datenschutz und Impressum
    const sep1 = document.getElementById("linksSep");
    if (ds && im) sep1.classList.remove("hidden");
    else sep1.classList.add("hidden");

    // Footer zeigen, sobald *irgendein* Inhalt da ist
    // (ladegams.eu ist immer sichtbar)
    elFooter.classList.remove("hidden");


    // Fehler aus
    elErrorState.classList.add("hidden");
    elErrorText.textContent = "";

  } catch (e) {
    console.warn(e);
    elErrorText.textContent =
      "Die Datei „data.yaml“ konnte nicht geladen werden. Bitte prüfen, ob sie im gleichen Verzeichnis liegt und vom Webserver ausgeliefert wird.";
    elErrorState.classList.remove("hidden");
    if (elFooter) elFooter.classList.add("hidden");
  }
}

loadInfoFromYaml();
