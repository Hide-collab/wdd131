// ── Product Data ──────────────────────────────────────────────
const products = [
  { id: "smart-thermostat-pro", name: "Smart Thermostat Pro" },
  { id: "solar-panel-kit-400w", name: "Solar Panel Kit 400W" },
  { id: "tankless-water-heater", name: "Tankless Water Heater" },
  { id: "attic-insulation-r60", name: "Attic Insulation R-60" },
  { id: "ev-charging-station", name: "EV Charging Station" },
  { id: "heat-pump-mini-split", name: "Heat Pump Mini-Split" },
  { id: "smart-sprinkler-controller", name: "Smart Sprinkler Controller" },
  { id: "whole-house-generator", name: "Whole-House Generator" },
];

// ── Populate Product Select ────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("product-name");
  if (!select) return;

  products.forEach(({ id, name }) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = name;
    select.appendChild(opt);
  });
});