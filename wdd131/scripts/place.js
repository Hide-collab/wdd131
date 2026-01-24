const yearSpan = document.querySelector("#year");
const modifiedSpan = document.querySelector("#lastModified");
const windChillSpan = document.querySelector("#windchill");

yearSpan.textContent = new Date().getFullYear();
modifiedSpan.textContent = document.lastModified;

const temperature = 9;      // °C
const windSpeed = 10;       // km/h

function calculateWindChill(temp, speed) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
    windChillSpan.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChillSpan.textContent = "N/A";
}
