// culture.js — Zimbabwe Travel & Culture Guide
// Renders food, music, art, festivals, and cycles the did-you-know ticker.

document.addEventListener("DOMContentLoaded", function () {

  // ── Data ──────────────────────────────────────────────────
  const foods = [
    {
      icon: "🍲",
      name: "Sadza",
      tag: "Staple",
      description: "Zimbabwe's national dish — a thick, smooth porridge made from finely ground maize meal. Eaten daily by most Zimbabweans, sadza is served with relish, vegetables, or meat, and is always eaten with the hands."
    },
    {
      icon: "🥩",
      name: "Nyama",
      tag: "Meat Dish",
      description: "Grilled or stewed meat — beef, goat, chicken, or game — that accompanies sadza at most Zimbabwean meals. Braai (barbecue) culture is central to social life, especially on weekends."
    },
    {
      icon: "🐟",
      name: "Matemba",
      tag: "Dried Fish",
      description: "Small dried kapenta fish from Lake Kariba, cooked in a tomato-and-onion relish. Matemba is an affordable, protein-rich food eaten across the country."
    },
    {
      icon: "🌿",
      name: "Muriwo",
      tag: "Vegetable",
      description: "Collard greens or pumpkin leaves, sautéed with onion, tomato, and groundnut peanut butter. A nutritious side dish served alongside sadza in most Zimbabwean homes."
    },
    {
      icon: "🎋",
      name: "Madora",
      tag: "Delicacy",
      description: "Dried or fried mopane worms — emperor moth caterpillars harvested from mopane trees. Crunchy, salty, and high in protein, madora are a beloved traditional snack."
    },
    {
      icon: "🍺",
      name: "Chibuku",
      tag: "Traditional Drink",
      description: "A traditional opaque beer brewed from sorghum or maize. Thick, slightly sour, and sold in distinctive cartons, Chibuku is the most widely consumed traditional drink in Zimbabwe."
    }
  ];

  const musicStyles = [
    {
      icon: "🎵",
      name: "Mbira",
      origin: "Shona — Ancient",
      description: "The mbira dzavadzimu ('voice of the ancestors') is a thumb piano with 22–28 metal tines mounted on a wooden board. It is central to Shona spiritual ceremonies and has been played for over 1,000 years."
    },
    {
      icon: "🎸",
      name: "Chimurenga",
      origin: "National — 1970s",
      description: "Pioneered by the legendary Thomas Mapfumo, chimurenga music blends mbira melodies with electric guitars and was used as a rallying voice during Zimbabwe's liberation struggle."
    },
    {
      icon: "🕺",
      name: "Jit",
      origin: "Urban — 1980s",
      description: "A fast-paced, high-energy dance music genre born in Harare's townships. Jit features rapid-fire guitar licks and percussion, creating irresistibly danceable rhythms."
    },
    {
      icon: "🥁",
      name: "Ngoma Drumming",
      origin: "Ndebele — Traditional",
      description: "Traditional drumming performed at ceremonial events, funerals, weddings, and celebrations. Each drum rhythm carries specific meaning in Ndebele and Shona cultural practice."
    },
    {
      icon: "🎤",
      name: "Zimdancehall",
      origin: "Urban — 2000s",
      description: "Zimbabwe's own spin on Jamaican dancehall, sung in Shona. Artists like Winky D and Tocky Vibes have built massive followings with socially conscious lyrics and heavy basslines."
    },
    {
      icon: "🎼",
      name: "Gospel Music",
      origin: "National — Contemporary",
      description: "Gospel is one of Zimbabwe's most popular music genres. Artists like Charles Charamba and Olivia Charamba blend traditional African rhythms with Christian worship, filling churches and airwaves nationwide."
    }
  ];

  const arts = [
    {
      icon: "🗿",
      tag: "Sculpture",
      title: "Shona Stone Sculpture",
      description: "Internationally acclaimed stone sculptures carved from serpentine, springstone, and opal stone. Zimbabwean sculptors like Henry Munyaradzi and Nicholas Mukomberanwa gained world fame from the 1960s onward."
    },
    {
      icon: "🧺",
      tag: "Craft",
      title: "Weaving & Basketry",
      description: "Intricate baskets, mats, and woven items crafted by Tonga and other communities using ilala palm and other local materials. Each pattern carries cultural significance passed through generations."
    },
    {
      icon: "🎨",
      tag: "Visual Art",
      title: "Batik & Textile Art",
      description: "Vibrant wax-resist dyed fabrics featuring bold geometric patterns and scenes of Zimbabwean rural life. Found in galleries and markets across Harare and Bulawayo."
    }
  ];

  const festivals = [
    {
      month: "Apr",
      icon: "🎭",
      name: "HIFA — Harare International Festival of the Arts",
      description: "One of Africa's biggest performing arts festivals, held annually in Harare. Five days of theatre, dance, music, poetry, and circus from Zimbabwean and international artists.",
      location: "Harare"
    },
    {
      month: "Jun",
      icon: "🎵",
      name: "Jikinya Dance Festival",
      description: "A national school competition celebrating traditional Zimbabwean dance. Students from across the country perform dances from their ethnic heritage, preserving cultural knowledge in young people.",
      location: "Nationwide"
    },
    {
      month: "Aug",
      icon: "🎬",
      name: "Zimbabwe International Film Festival (ZIFF)",
      description: "An annual celebration of African and international cinema held in Harare. Screenings, workshops, and panel discussions spotlight emerging Zimbabwean filmmakers alongside global cinema.",
      location: "Harare"
    },
    {
      month: "Sep",
      icon: "🌿",
      name: "Harare Agricultural Show",
      description: "The country's largest agricultural and trade exhibition, showcasing Zimbabwe's farming, industry, and commerce. A family event with livestock displays, food, and entertainment.",
      location: "Harare"
    },
    {
      month: "Dec",
      icon: "🔥",
      name: "Amakhosi Cultural Festival",
      description: "A celebration of Ndebele culture held in Bulawayo, featuring traditional music, dance, storytelling, and food. A powerful expression of Matabeleland's rich cultural identity.",
      location: "Bulawayo"
    }
  ];

  const cultureFacts = [
    "Zimbabwe has 16 official languages — more than almost any other country in the world.",
    "The mbira instrument has been played in Zimbabwe for over 1,000 years and is considered a sacred spiritual tool by the Shona people.",
    "Great Zimbabwe's stone walls were built without mortar, yet have stood for over 800 years.",
    "Zimbabwe is home to one of Africa's largest elephant populations, with over 100,000 elephants.",
    "The name 'Zimbabwe' comes from the Shona phrase 'dzimba dzemabwe', meaning 'houses of stone'.",
    "Victoria Falls is so powerful that its mist and spray can be seen from 50 km away.",
    "Zimbabwe has produced internationally acclaimed sculptors whose work is exhibited in museums worldwide.",
    "Sadza, Zimbabwe's national dish, is eaten at almost every meal and is considered a symbol of Zimbabwean identity."
  ];

  // ── Render food cards ─────────────────────────────────────
  function renderFood() {
    const grid = document.getElementById("food-grid");
    if (!grid) return;
    grid.innerHTML = foods.map(function (item) {
      return `
        <article class="food-card">
          <div class="food-icon-wrap" aria-hidden="true">${item.icon}</div>
          <div class="food-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="food-tag">${item.tag}</span>
          </div>
        </article>`;
    }).join("");
  }

  // ── Render music cards ────────────────────────────────────
  function renderMusic() {
    const grid = document.getElementById("music-grid");
    if (!grid) return;
    grid.innerHTML = musicStyles.map(function (style) {
      return `
        <article class="music-card">
          <div class="music-icon" aria-hidden="true">${style.icon}</div>
          <h3>${style.name}</h3>
          <p>${style.description}</p>
          <p class="music-origin">${style.origin}</p>
        </article>`;
    }).join("");
  }

  // ── Render art cards ──────────────────────────────────────
  function renderArt() {
    const grid = document.getElementById("art-grid");
    if (!grid) return;
    grid.innerHTML = arts.map(function (item) {
      return `
        <article class="card">
          <div class="card-img-placeholder" aria-hidden="true">${item.icon}</div>
          <div class="card-body">
            <p class="card-tag">${item.tag}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>`;
    }).join("");
  }

  // ── Render festivals ──────────────────────────────────────
  function renderFestivals() {
    const list = document.getElementById("festival-list");
    if (!list) return;
    list.innerHTML = festivals.map(function (fest) {
      return `
        <article class="festival-item">
          <div class="festival-month">
            <span class="month-name">${fest.month}</span>
            <span class="month-icon" aria-hidden="true">${fest.icon}</span>
          </div>
          <div class="festival-info">
            <h3>${fest.name}</h3>
            <p>${fest.description}</p>
            <p class="festival-location">📍 ${fest.location}</p>
          </div>
        </article>`;
    }).join("");
  }

  // ── Did You Know Ticker ───────────────────────────────────
  const TICKER_KEY = "zim_ticker_index";
  let currentFact = parseInt(localStorage.getItem(TICKER_KEY)) || 0;

  function updateTicker() {
    // Boundary check using conditional branching
    if (currentFact >= cultureFacts.length) {
      currentFact = 0;
    } else if (currentFact < 0) {
      currentFact = cultureFacts.length - 1;
    }

    const ticker = document.getElementById("fact-ticker");
    const indexEl = document.getElementById("ticker-index");
    if (ticker) {
      ticker.innerHTML = `<p class="ticker-text">${cultureFacts[currentFact]}</p>`;
    }
    if (indexEl) {
      indexEl.textContent = `${currentFact + 1} / ${cultureFacts.length}`;
    }
    localStorage.setItem(TICKER_KEY, String(currentFact));
  }

  const prevBtn = document.getElementById("prev-fact");
  const nextBtn = document.getElementById("next-fact");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentFact--;
      updateTicker();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentFact++;
      updateTicker();
    });
  }

  // ── Init ──────────────────────────────────────────────────
  renderFood();
  renderMusic();
  renderArt();
  renderFestivals();
  updateTicker();

});