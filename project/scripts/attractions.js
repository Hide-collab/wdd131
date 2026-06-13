// attractions.js — Zimbabwe Travel & Culture Guide
// Renders attraction cards, handles category filtering, persists last filter to localStorage.

document.addEventListener("DOMContentLoaded", function () {

  // ── Data ──────────────────────────────────────────────────
  const attractions = [
    {
      id: "victoria-falls",
      title: "Victoria Falls",
      tag: "Natural Wonder",
      category: "nature",
      icon: "💧",
      description: "One of the world's largest waterfalls, known locally as Mosi-oa-Tunya ('The Smoke That Thunders'). The falls span 1.7 km wide and drop 108 m, creating a permanent mist visible from 50 km away.",
      badges: ["UNESCO Site", "Border: Zambia", "Bungee Jumping", "Rafting"],
      region: "Matabeleland North"
    },
    {
      id: "great-zimbabwe",
      title: "Great Zimbabwe Ruins",
      tag: "Heritage Site",
      category: "history",
      icon: "🏛️",
      description: "The ancient stone-walled city that gave the country its name. Built between the 11th and 15th centuries without mortar, it served as the capital of the Kingdom of Zimbabwe and is Africa's largest ancient structure south of the Sahara.",
      badges: ["UNESCO Site", "11th–15th c.", "Stone Architecture"],
      region: "Masvingo"
    },
    {
      id: "hwange",
      title: "Hwange National Park",
      tag: "Wildlife",
      category: "wildlife",
      icon: "🐘",
      description: "Zimbabwe's largest national park and one of Africa's great wildlife reserves. Home to over 45,000 elephants, lions, leopards, cheetahs, wild dogs, and more than 400 bird species across 14,651 km² of diverse ecosystems.",
      badges: ["14,651 km²", "Elephant Capital", "400+ Bird Species"],
      region: "Matabeleland North"
    },
    {
      id: "eastern-highlands",
      title: "Eastern Highlands",
      tag: "Scenic Area",
      category: "nature",
      icon: "🏔️",
      description: "A dramatic mountain range running along Zimbabwe's eastern border with Mozambique. Mutare, Nyanga, and Chimanimani offer cool temperatures, stunning waterfalls, hiking trails, and lush tea plantations.",
      badges: ["Hiking", "Tea Plantations", "Waterfalls", "Cool Climate"],
      region: "Manicaland"
    },
    {
      id: "mana-pools",
      title: "Mana Pools",
      tag: "Wildlife",
      category: "wildlife",
      icon: "🦛",
      description: "A UNESCO World Heritage Site on the banks of the Zambezi River, famed for unique walking safaris where you can follow wildlife on foot. Known for its extraordinary concentration of hippos, crocodiles, elephants, and predators.",
      badges: ["UNESCO Site", "Walking Safari", "Zambezi River", "Canoeing"],
      region: "Mashonaland West"
    },
    {
      id: "harare",
      title: "Harare",
      tag: "City",
      category: "city",
      icon: "🏙️",
      description: "Zimbabwe's capital is a lively city with excellent restaurants, vibrant art galleries, colourful markets, and the National Gallery of Zimbabwe. The Mbare Musika market and Avondale Flea Market are essential cultural experiences.",
      badges: ["Capital City", "Art Galleries", "Markets", "National Museum"],
      region: "Harare Province"
    },
    {
      id: "matobo-hills",
      title: "Matobo Hills",
      tag: "Heritage Site",
      category: "history",
      icon: "🪨",
      description: "Ancient granite hills scattered with San Bushmen rock art that is over 13,000 years old. The area holds Cecil Rhodes's grave at World's View and is a stronghold for endangered white and black rhino.",
      badges: ["UNESCO Site", "Rock Art", "Rhino Sanctuary", "Rhodes Grave"],
      region: "Matabeleland South"
    },
    {
      id: "kariba",
      title: "Lake Kariba",
      tag: "Lake",
      category: "nature",
      icon: "⛵",
      description: "One of the world's largest man-made lakes, stretching 280 km along the Zimbabwe–Zambia border. Famous for houseboat holidays, tiger fishing, stunning sunsets, and game-rich shores populated with elephant, buffalo, and predators.",
      badges: ["Houseboat Safari", "Tiger Fishing", "280 km Long", "Game Viewing"],
      region: "Mashonaland West"
    }
  ];

  const regions = [
    {
      icon: "💧",
      name: "Matabeleland North",
      description: "Home to Victoria Falls and Hwange National Park — the most-visited region.",
      places: "Victoria Falls, Hwange NP"
    },
    {
      icon: "🏛️",
      name: "Masvingo",
      description: "The historical heartland, where Great Zimbabwe's stone towers rise from the savanna.",
      places: "Great Zimbabwe, Lake Mutirikwi"
    },
    {
      icon: "🏔️",
      name: "Manicaland",
      description: "The lush Eastern Highlands, offering cool mountain escapes and dramatic scenery.",
      places: "Nyanga, Chimanimani, Mutare"
    },
    {
      icon: "🏙️",
      name: "Harare Province",
      description: "The capital and cultural hub, packed with galleries, markets, and fine dining.",
      places: "Harare CBD, Mbare, Avondale"
    },
    {
      icon: "🦛",
      name: "Mashonaland West",
      description: "Wilderness and water — Mana Pools and Lake Kariba define this frontier region.",
      places: "Mana Pools, Lake Kariba"
    },
    {
      icon: "🪨",
      name: "Matabeleland South",
      description: "Ancient rock art and the mystical Matobo Hills, cradle of Ndebele history.",
      places: "Matobo Hills, Bulawayo"
    }
  ];

  // ── State ─────────────────────────────────────────────────
  const STORAGE_KEY = "zim_filter";
  let activeCategory = localStorage.getItem(STORAGE_KEY) || "all";

  // ── Helper: get unique categories ─────────────────────────
  function getCategories(list) {
    const cats = list.map(function (a) { return a.category; });
    const unique = cats.filter(function (cat, index) {
      return cats.indexOf(cat) === index;
    });
    return ["all", ...unique];
  }

  // ── Render filter buttons ─────────────────────────────────
  function renderFilters() {
    const container = document.getElementById("filter-buttons");
    if (!container) return;

    const categories = getCategories(attractions);
    const labels = {
      all: "All",
      nature: "Nature",
      wildlife: "Wildlife",
      history: "Heritage",
      city: "Cities"
    };

    container.innerHTML = categories.map(function (cat) {
      const isActive = cat === activeCategory;
      return `<button
        class="filter-btn${isActive ? " active" : ""}"
        data-category="${cat}"
        aria-pressed="${isActive}"
      >${labels[cat] || cat}</button>`;
    }).join("");

    container.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.dataset.category;
        localStorage.setItem(STORAGE_KEY, activeCategory);
        renderFilters();
        renderCards();
      });
    });
  }

  // ── Render attraction cards ───────────────────────────────
  function renderCards() {
    const grid = document.getElementById("attractions-grid");
    const countEl = document.getElementById("result-count");
    if (!grid) return;

    const filtered = activeCategory === "all"
      ? attractions
      : attractions.filter(function (a) { return a.category === activeCategory; });

    if (countEl) {
      countEl.textContent = `${filtered.length} attraction${filtered.length !== 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="no-results">No attractions found for this category.</p>`;
      return;
    }

    grid.innerHTML = filtered.map(function (place) {
      const badgesHTML = place.badges.map(function (b) {
        return `<span class="badge">${b}</span>`;
      }).join("");

      return `
        <article class="card" id="${place.id}">
          <div class="card-img-placeholder" aria-hidden="true">${place.icon}</div>
          <div class="card-body">
            <p class="card-tag">${place.tag}</p>
            <h3>${place.title}</h3>
            <p>${place.description}</p>
            <div class="card-badges" aria-label="Tags for ${place.title}">${badgesHTML}</div>
          </div>
          <div class="card-footer">
            <span class="fact-badge">📍 ${place.region}</span>
          </div>
        </article>`;
    }).join("");
  }

  // ── Render regions ────────────────────────────────────────
  function renderRegions() {
    const grid = document.getElementById("regions-grid");
    if (!grid) return;

    grid.innerHTML = regions.map(function (region) {
      return `
        <div class="region-card">
          <div class="region-icon" aria-hidden="true">${region.icon}</div>
          <h3>${region.name}</h3>
          <p>${region.description}</p>
          <p class="region-places">Key places: ${region.places}</p>
        </div>`;
    }).join("");
  }

  // ── Init ──────────────────────────────────────────────────
  renderFilters();
  renderCards();
  renderRegions();

});