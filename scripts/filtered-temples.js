const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Nairobi Kenya",
    location: "Nairobi, Kenya",
    dedicated: "2025, May, 18",
    area: 19870,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-60488-main.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
  },
  {
    templeName: "Harare Zimbabwe",
    location: "Harare, Zimbabwe",
    dedicated: "2026, March, 01",
    area: 17247,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/harare-zimbabwe-temple/harare-zimbabwe-temple-67717-main.jpg",
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg",
  },
];


function getDedicatedYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(",")[0].trim(), 10);
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  card.innerHTML = `
    <div class="card-image-wrap">
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName} Temple"
        loading="lazy"
        width="400"
        height="250"
      />
    </div>
    <div class="card-body">
      <h2 class="card-title">${temple.templeName}</h2>
      <dl class="card-meta">
        <dt>Location</dt>
        <dd>${temple.location}</dd>
        <dt>Dedicated</dt>
        <dd>${temple.dedicated}</dd>
        <dt>Area</dt>
        <dd>${temple.area.toLocaleString()} ft²</dd>
      </dl>
    </div>
  `;

  return card;
}

function displayTemples(list) {
  const grid = document.getElementById("temple-grid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="no-results">No temples match this filter.</p>`;
    return;
  }

  list.forEach((t) => grid.appendChild(createTempleCard(t)));
}

const filters = {
  home: () => temples,
  old:  () => temples.filter((t) => getDedicatedYear(t.dedicated) < 1900),
  new:  () => temples.filter((t) => getDedicatedYear(t.dedicated) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

function applyFilter(filterName) {
  const filtered = (filters[filterName] || filters.home)();
  displayTemples(filtered);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.filter === filterName);
  });

  const labels = {
    home:  "All Temples",
    old:   "Old Temples (Before 1900)",
    new:   "New Temples (After 2000)",
    large: "Large Temples (90,000+ ft²)",
    small: "Small Temples (Under 10,000 ft²)",
  };
  document.getElementById("filter-heading").textContent =
    labels[filterName] || "All Temples";
}

document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      applyFilter(link.dataset.filter);
    });
  });

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("open")
    );
  });

  document.getElementById("copy-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent =
    document.lastModified;

  applyFilter("home");
});