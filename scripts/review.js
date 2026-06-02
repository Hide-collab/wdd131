// ── Review Confirmation ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // 1. Increment counter
  const KEY = "reviewCount";
  const count = (parseInt(localStorage.getItem(KEY), 10) || 0) + 1;
  localStorage.setItem(KEY, count);

  // Display counter
  const badge = document.getElementById("review-count");
  if (badge) badge.textContent = count;

  // 2. Parse query string and populate summary table
  const params = new URLSearchParams(window.location.search);

  const productNames = {
    "smart-thermostat-pro": "Smart Thermostat Pro",
    "solar-panel-kit-400w": "Solar Panel Kit 400W",
    "tankless-water-heater": "Tankless Water Heater",
    "attic-insulation-r60": "Attic Insulation R-60",
    "ev-charging-station": "EV Charging Station",
    "heat-pump-mini-split": "Heat Pump Mini-Split",
    "smart-sprinkler-controller": "Smart Sprinkler Controller",
    "whole-house-generator": "Whole-House Generator",
  };

  const starLabels = { "1": "★ Poor", "2": "★★ Fair", "3": "★★★ Good", "4": "★★★★ Great", "5": "★★★★★ Excellent" };

  const featureLabels = {
    "easy-install":    "Easy Installation",
    "energy-savings":  "Energy Savings",
    "smart-control":   "Smart Controls",
    "durability":      "Durability",
    "value":           "Good Value",
    "customer-support":"Customer Support",
  };

  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "—";
  };

  // Product
  const productId = params.get("product-name") || "";
  set("s-product", productNames[productId] || productId || "—");

  // Rating
  const rating = params.get("rating") || "";
  set("s-rating", starLabels[rating] || "—");

  // Date
  const dateVal = params.get("install-date") || "";
  if (dateVal) {
    const [y, m, d] = dateVal.split("-");
    set("s-date", `${m}/${d}/${y}`);
  } else {
    set("s-date", "—");
  }

  // Features (multiple values)
  const features = params.getAll("features");
  const featureText = features.length
    ? features.map(f => featureLabels[f] || f).join(", ")
    : "None selected";
  set("s-features", featureText);

  // Review text
  set("s-review", params.get("review") || "—");

  // Username
  set("s-username", params.get("username") || "Anonymous");
});