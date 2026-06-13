// contact.js — Zimbabwe Travel & Culture Guide
// Handles trip planner form: validation, itinerary generation, localStorage persistence.

document.addEventListener("DOMContentLoaded", function () {

  // ── Destination database ──────────────────────────────────
  const destinationData = [
    {
      name: "Victoria Falls",
      icon: "💧",
      interests: ["wildlife", "nature", "adventure"],
      why: "The world's largest waterfall — unmissable for any visitor.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Hwange National Park",
      icon: "🐘",
      interests: ["wildlife"],
      why: "Home to over 45,000 elephants and incredible big game.",
      durations: ["week", "twoweeks", "extended"]
    },
    {
      name: "Great Zimbabwe Ruins",
      icon: "🏛️",
      interests: ["history", "culture"],
      why: "Africa's greatest medieval monument — eight centuries of stone.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Mana Pools",
      icon: "🦛",
      interests: ["wildlife", "adventure", "nature"],
      why: "UNESCO-listed Zambezi wilderness, famous for walking safaris.",
      durations: ["week", "twoweeks", "extended"]
    },
    {
      name: "Eastern Highlands",
      icon: "🏔️",
      interests: ["nature", "adventure"],
      why: "Cool mountain air, waterfalls, and scenic hiking trails.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Matobo Hills",
      icon: "🪨",
      interests: ["history", "wildlife", "nature"],
      why: "Ancient San rock art and rhino sanctuary in dramatic boulder country.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Harare City",
      icon: "🏙️",
      interests: ["culture", "city"],
      why: "Vibrant capital with galleries, markets, and excellent restaurants.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Lake Kariba",
      icon: "⛵",
      interests: ["nature", "adventure", "wildlife"],
      why: "Houseboat holidays and tiger fishing on one of Africa's great lakes.",
      durations: ["week", "twoweeks", "extended"]
    },
    {
      name: "Bulawayo",
      icon: "🎨",
      interests: ["history", "culture", "city"],
      why: "Zimbabwe's second city — rich in Ndebele culture and colonial-era architecture.",
      durations: ["weekend", "week", "twoweeks", "extended"]
    },
    {
      name: "Gonarezhou National Park",
      icon: "🦒",
      interests: ["wildlife", "nature", "adventure"],
      why: "Remote wilderness bordering South Africa and Mozambique — raw and unspoiled.",
      durations: ["twoweeks", "extended"]
    }
  ];

  const seasonTips = {
    dry: "You are travelling in the dry season (May–Oct) — ideal for wildlife viewing as animals gather at water sources. Bring warm layers for cold mornings.",
    wet: "You are travelling in the wet season (Nov–Apr) — Zimbabwe is lush and green with fewer crowds. Some roads may be impassable. Excellent for birdwatching.",
    unsure: "Tip: The dry season (May–Oct) is generally the best time for wildlife safaris. The wet season brings beautiful green landscapes and excellent birdwatching.",
    "": ""
  };

  const STORAGE_KEY = "zim_saved_itineraries";

  // ── Get saved itineraries ─────────────────────────────────
  function getSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  // ── Save an itinerary ─────────────────────────────────────
  function saveItinerary(itinerary) {
    const saved = getSaved();
    saved.unshift(itinerary);
    // Keep only the last 5
    const trimmed = saved.slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  }

  // ── Build destination list ────────────────────────────────
  function buildDestinations(interests, duration) {
    // Filter: must match at least one interest AND duration
    const matched = destinationData.filter(function (dest) {
      const interestMatch = interests.some(function (i) {
        return dest.interests.includes(i);
      });
      const durationMatch = dest.durations.includes(duration);
      return interestMatch && durationMatch;
    });

    // If nothing matched, return a fallback set
    if (matched.length === 0) {
      return destinationData.slice(0, 3);
    }

    // Sort: more interest overlaps = higher priority
    const ranked = matched.sort(function (a, b) {
      const aScore = interests.filter(function (i) { return a.interests.includes(i); }).length;
      const bScore = interests.filter(function (i) { return b.interests.includes(i); }).length;
      return bScore - aScore;
    });

    // Limit based on duration
    const limits = { weekend: 3, week: 5, twoweeks: 7, extended: 10 };
    return ranked.slice(0, limits[duration] || 5);
  }

  // ── Render itinerary output ───────────────────────────────
  function renderItinerary(data) {
    const destinations = buildDestinations(data.interests, data.duration);
    const seasonTip = seasonTips[data.season] || "";

    const destHTML = destinations.map(function (dest) {
      return `
        <li>
          <span class="dest-icon" aria-hidden="true">${dest.icon}</span>
          <span>
            <span class="dest-name">${dest.name}</span>
            <span class="dest-why">${dest.why}</span>
          </span>
        </li>`;
    }).join("");

    const seasonHTML = seasonTip
      ? `<p class="season-tip">🌤️ ${seasonTip}</p>`
      : "";

    const durationLabels = {
      weekend: "Weekend (2–3 days)",
      week: "One Week",
      twoweeks: "Two Weeks",
      extended: "Extended Stay (15+ days)"
    };

    return `
      <div class="itinerary-header">
        <h3>Hello, ${data.name}!</h3>
        <p>Here is your personalised Zimbabwe itinerary &mdash; ${durationLabels[data.duration] || data.duration}</p>
      </div>
      <div class="itinerary-body">
        ${seasonHTML}
        <p class="itinerary-section-title">Recommended Destinations</p>
        <ul class="destination-list">${destHTML}</ul>
      </div>
      <div class="itinerary-actions">
        <button class="btn btn-primary" id="save-btn">Save Itinerary</button>
        <a href="attractions.html" class="btn btn-outline">Browse All Attractions</a>
      </div>`;
  }

  // ── Display saved itineraries ─────────────────────────────
  function renderSaved() {
    const saved = getSaved();
    const container = document.getElementById("saved-list");
    const clearBtn = document.getElementById("clear-saved-btn");
    if (!container) return;

    if (saved.length === 0) {
      container.innerHTML = `<p class="saved-empty">No saved itineraries yet. Generate one using the form above!</p>`;
      if (clearBtn) clearBtn.hidden = true;
      return;
    }

    if (clearBtn) clearBtn.hidden = false;

    const gridHTML = saved.map(function (item) {
      return `
        <div class="saved-card">
          <h4>${item.name}</h4>
          <p>${item.destinations.join(" &middot; ")}</p>
          <span class="saved-date">Saved: ${item.date}</span>
        </div>`;
    }).join("");

    container.innerHTML = `<div class="saved-grid">${gridHTML}</div>`;
  }

  // ── Validate form ─────────────────────────────────────────
  function validateForm() {
    let valid = true;

    const name = document.getElementById("traveller-name");
    const nameError = document.getElementById("name-error");
    if (!name.value.trim()) {
      nameError.textContent = "Please enter your name.";
      name.classList.add("error");
      valid = false;
    } else {
      nameError.textContent = "";
      name.classList.remove("error");
    }

    const email = document.getElementById("traveller-email");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      emailError.textContent = "Please enter a valid email address.";
      email.classList.add("error");
      valid = false;
    } else {
      emailError.textContent = "";
      email.classList.remove("error");
    }

    const duration = document.getElementById("trip-duration");
    const durationError = document.getElementById("duration-error");
    if (!duration.value) {
      durationError.textContent = "Please select a trip duration.";
      duration.classList.add("error");
      valid = false;
    } else {
      durationError.textContent = "";
      duration.classList.remove("error");
    }

    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
      .map(function (cb) { return cb.value; });
    const interestsError = document.getElementById("interests-error");
    if (interests.length === 0) {
      interestsError.textContent = "Please select at least one interest.";
      valid = false;
    } else {
      interestsError.textContent = "";
    }

    return valid;
  }

  // ── Form submit ───────────────────────────────────────────
  const form = document.getElementById("trip-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
        .map(function (cb) { return cb.value; });

      const formData = {
        name: document.getElementById("traveller-name").value.trim(),
        email: document.getElementById("traveller-email").value.trim(),
        duration: document.getElementById("trip-duration").value,
        season: document.getElementById("travel-season").value,
        interests: interests,
        budget: document.getElementById("budget").value,
        notes: document.getElementById("notes").value.trim()
      };

      const placeholder = document.getElementById("results-placeholder");
      const output = document.getElementById("itinerary-output");

      if (placeholder) placeholder.hidden = true;
      if (output) {
        output.hidden = false;
        output.innerHTML = renderItinerary(formData);

        // Save button listener
        const saveBtn = document.getElementById("save-btn");
        if (saveBtn) {
          saveBtn.addEventListener("click", function () {
            const destinations = buildDestinations(formData.interests, formData.duration)
              .map(function (d) { return d.name; });

            saveItinerary({
              name: formData.name,
              destinations: destinations,
              date: new Date().toLocaleDateString("en-ZW", {
                year: "numeric", month: "short", day: "numeric"
              })
            });

            saveBtn.textContent = "✓ Saved!";
            saveBtn.disabled = true;
            renderSaved();
          });
        }

        // Scroll output into view on mobile
        if (window.innerWidth < 860) {
          output.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  // ── Reset button ──────────────────────────────────────────
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      const placeholder = document.getElementById("results-placeholder");
      const output = document.getElementById("itinerary-output");
      if (placeholder) placeholder.hidden = false;
      if (output) {
        output.hidden = true;
        output.innerHTML = "";
      }
    });
  }

  // ── Clear saved ───────────────────────────────────────────
  const clearSavedBtn = document.getElementById("clear-saved-btn");
  if (clearSavedBtn) {
    clearSavedBtn.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEY);
      renderSaved();
    });
  }

  // ── Init ──────────────────────────────────────────────────
  renderSaved();

});