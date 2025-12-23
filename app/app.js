let DATA = null;

const elPageTitle = document.getElementById("pageTitle");
const elIntroText = document.getElementById("introText");
const elSelect = document.getElementById("operatorSelect");
const elPreferred = document.getElementById("preferredCard");
const elFallback = document.getElementById("fallbackCard");
const elOperatorTitle = document.getElementById("operatorTitle");
const elOperatorInfo = document.getElementById("operatorInfo");
const elRecommendedPill = document.getElementById("recommendedPill");
const elOperatorHeader = document.getElementById("operatorHeader");
const elOperatorLogo = document.getElementById("operatorLogo");
const elErrorState = document.getElementById("errorState");
const elErrorText  = document.getElementById("errorText");
const elCardsSection = document.getElementById("cardsSection");




function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCard(card, priceText = "", infoText = "") {
  if (!card) return `<div class="muted">—</div>`;

  const name = escapeHtml(card.name);
  const logo = escapeHtml(card.logo || "");

  const logoImg = logo
    ? `<img class="logo" src="${logo}" alt="${name} Logo" loading="lazy">`
    : `<div class="logo" aria-hidden="true"></div>`;

  let priceHtml = "";
  if (priceText && String(priceText).trim() !== "") {
    priceHtml = `<div class="price-pill">${escapeHtml(priceText)}</div>`;
  }

  let infoHtml = "";
  if (infoText && String(infoText).trim() !== "") {
    infoHtml = `<div class="card-info">${escapeHtml(infoText)}</div>`;
  }

  return `
    <div class="row">
      ${logoImg}
      <div>
        <p class="title">${name}</p>
        ${priceHtml}
        ${infoHtml}
      </div>
    </div>
  `;
}


function setOperatorHeader(operator) {
  // Reset
  elOperatorHeader.classList.add("hidden");
  elOperatorLogo.classList.add("hidden");
  elOperatorTitle.classList.add("hidden");
  elOperatorInfo.classList.add("hidden");

  elOperatorLogo.src = "";
  elOperatorLogo.alt = "";
  elOperatorTitle.textContent = "";
  elOperatorInfo.textContent = "";

  if (!operator || !operator.name) return;

  elOperatorHeader.classList.remove("hidden");

  const name = operator.name;

  // Betreiber-Info (optional)
  if (operator.operator_info && String(operator.operator_info).trim() !== "") {
    elOperatorInfo.textContent = operator.operator_info;
    elOperatorInfo.classList.remove("hidden");
  }

  // FALL 1: Logo existiert → versuchen zu laden
  if (operator.logo && String(operator.logo).trim() !== "") {
    elOperatorLogo.src = operator.logo;
    elOperatorLogo.alt = `${name} Logo`;

    elOperatorLogo.onload = () => {
      elOperatorLogo.classList.remove("hidden");
      elOperatorTitle.classList.add("hidden");
    };

    elOperatorLogo.onerror = () => {
      elOperatorLogo.classList.add("hidden");
      elOperatorTitle.textContent = name;
      elOperatorTitle.classList.remove("hidden");
    };

    return;
  }

  // FALL 2: Kein Logo → Text anzeigen
  elOperatorTitle.textContent = name;
  elOperatorTitle.classList.remove("hidden");
}




function setRecommendedPill(operatorName) {
  if (operatorName && String(operatorName).trim() !== "") {
    elRecommendedPill.textContent = `Empfohlen für ${operatorName}`;
    elRecommendedPill.classList.remove("hidden");
  } else {
    elRecommendedPill.textContent = "Empfohlen";
    elRecommendedPill.classList.add("hidden");
  }
}

function onSelectChange() {
  const id = elSelect.value;
  const op = (DATA?.operators || []).find(o => o.id === id);
  if (!op) return;

  setOperatorHeader(op);
  setRecommendedPill(op.name);

  elPreferred.innerHTML = renderCard(
    op.preferred_card,
    op.preferred_card_price,
    op.preferred_card_info
  );

  elFallback.innerHTML = renderCard(
    op.fallback_card,
    op.fallback_card_price,
    op.fallback_card_info
  );

}


async function loadYaml() {
  try {
    // Fehler-Cards ausblenden, echte Cards zeigen
    elErrorState.classList.add("hidden");
    elCardsSection.classList.remove("hidden");

    const res = await fetch("./custom_data.yaml", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const yamlText = await res.text();
    DATA = jsyaml.load(yamlText);

    // Meta
    const meta = DATA?.meta || {};
    if (meta.page_title) {
      document.title = meta.page_title;
      elPageTitle.textContent = meta.page_title;
    }

    if (meta.intro_text) elIntroText.textContent = meta.intro_text;

    // Betreiber in YAML zählen
    const ops = DATA?.operators || [];
    if (!ops.length) throw new Error("Keine Betreiber in custom_data.yaml gefunden");

    // Auswahl von Betreibern befüllen
    elSelect.innerHTML = "";
    for (const op of ops) {
      const opt = document.createElement("option");
      opt.value = op.id;
      opt.textContent = op.name;
      elSelect.appendChild(opt);
    }

    // Immer den ersten Betreiber vorauswählen
    elSelect.value = ops[0].id;
    onSelectChange();

  } catch (err) {
    console.error(err);

    // YAML nicht ladbar: Error-Karte zeigen, Rest verstecken
    elCardsSection.classList.add("hidden");
    elErrorText.textContent =
      "Die Datei „custom_data.yaml“ konnte nicht vom Webserver geladen werden. " +
      "Bitte prüfen, ob sie im gleichen Verzeichnis liegt und per Webserver ausgeliefert wird.";
    elErrorState.classList.remove("hidden");

  }
}

elSelect.addEventListener("change", onSelectChange);
loadYaml();
