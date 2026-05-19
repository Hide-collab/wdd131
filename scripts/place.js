

const yearSpan     = document.getElementById("current-year");
const modifiedSpan = document.getElementById("last-modified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (modifiedSpan) {
  modifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString("en-ZW", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

//  . Wind Chill Calculation 
/**
 
 * @param {number} temperature - Air temperature in °C
 * @param {number} windSpeed   - Wind speed in km/h
 * @returns {number} Wind chill temperature in °C (rounded to 1 decimal place)
 */
function calculateWindChill(temperature, windSpeed) {
  return parseFloat((13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1));
}

// ── Static weather values (matching page content) 
const TEMPERATURE  = 28;  // °C — warm Harare afternoon
const WIND_SPEED   = 15;  // km/h — gentle breeze

// ── Viability check & display 
const windChillSpan = document.getElementById("wind-chill");

if (windChillSpan) {
  // Metric conditions: temp <= 10 °C AND wind speed > 4.8 km/h
  const conditionsMet = TEMPERATURE <= 10 && WIND_SPEED > 4.8;

  if (conditionsMet) {
    const chill = calculateWindChill(TEMPERATURE, WIND_SPEED);
    windChillSpan.textContent = `${chill} °C`;
  } else {
    windChillSpan.textContent = "N/A";
  }
}