// home.js — Zimbabwe Travel & Culture Guide
// Populates dynamic content on the home page using objects, arrays, and array methods.

document.addEventListener("DOMContentLoaded", function () {

  // ── Data ──────────────────────────────────────────────────
  const highlights = [
    {
      id: "victoria-falls",
      tag: "Natural Wonder",
      title: "Victoria Falls",
      description: "Known locally as Mosi-oa-Tunya — 'The Smoke That Thunders' — Victoria Falls is one of the world's largest waterfalls, straddling the border of Zimbabwe and Zambia.",
      icon: "💧",
      fact: "108 m tall · 1.7 km wide"
    },
    {
      id: "great-zimbabwe",
      tag: "UNESCO Heritage",
      title: "Great Zimbabwe",
      description: "The ruins of a medieval city built entirely without mortar, Great Zimbabwe was the capital of the Kingdom of Zimbabwe and remains one of Africa's most remarkable archaeological sites.",
      icon: "🏛️",
      fact: "Built c. 1100–1450 AD"
    },
    {
      id: "hwange",
      tag: "Wildlife",
      title: "Hwange National Park",
      description: "Zimbabwe's largest game reserve is home to one of Africa's biggest elephant populations, alongside lions, leopards, wild dogs, and over 400 bird species.",
      icon: "🐘",
      fact: "14,651 km² of wilderness"
    }
  ];

  const facts = [
    { term: "Capital", value: "Harare" },
    { term: "Population", value: "approx. 16 million" },
    { term: "Currency", value: "Zimbabwe Gold (ZiG)" },
    { term: "Official Languages", value: "16, incl. Shona & Ndebele" },
    { term: "Best Time to Visit", value: "May – October (dry season)" },
    { term: "Time Zone", value: "CAT (UTC+2)" }
  ];

  const tips = [
    { icon: "🛂", title: "Visa", text: "Many nationalities get a visa on arrival. Check requirements at least 6 weeks before travel." },
    { icon: "💵", title: "Currency", text: "US dollars are widely accepted. Carry small bills — change is often scarce." },
    { icon: "🌡️", title: "Climate", text: "Dry season (May–Oct) is best for wildlife. November–April brings rains and lush scenery." },
    { icon: "🦟", title: "Health", text: "Malaria prophylaxis is recommended. Consult your doctor at least 4 weeks before departure." },
    { icon: "📱", title: "Connectivity", text: "Local SIM cards from Econet or NetOne offer affordable data. Coverage is good in cities." },
    { icon: "🤝", title: "Etiquette", text: "Greet with both hands or support your right arm — a sign of respect across Zimbabwe." }
  ];

  // ── Render highlights ─────────────────────────────────────
  const highlightsGrid = document.getElementById("highlights-grid");
  if (highlightsGrid) {
    highlightsGrid.innerHTML = highlights.map(function (place) {
      return `
        <article class="card">
          <div class="card-img-placeholder" aria-hidden="true">${place.icon}</div>
          <div class="card-body">
            <p class="card-tag">${place.tag}</p>
            <h3>${place.title}</h3>
            <p>${place.description}</p>
            <span class="fact-badge">📍 ${place.fact}</span>
          </div>
          <div class="card-footer">
            <a href="attractions.html#${place.id}" class="btn btn-outline">Learn More</a>
          </div>
        </article>`;
    }).join("");
  }

  // ── Render quick facts ────────────────────────────────────
  const factsList = document.getElementById("facts-list");
  if (factsList) {
    factsList.innerHTML = facts.map(function (fact) {
      return `
        <div class="fact-item">
          <dt class="fact-term">${fact.term}</dt>
          <dd class="fact-value">${fact.value}</dd>
        </div>`;
    }).join("");
  }

  // ── Render travel tips ────────────────────────────────────
  const tipsGrid = document.getElementById("tips-grid");
  if (tipsGrid) {
    tipsGrid.innerHTML = tips.map(function (tip) {
      return `
        <div class="tip-card">
          <div class="tip-icon" aria-hidden="true">${tip.icon}</div>
          <h3>${tip.title}</h3>
          <p>${tip.text}</p>
        </div>`;
    }).join("");
  }

});