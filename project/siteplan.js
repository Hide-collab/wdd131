
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("yr");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("nav a");

  function setActiveLink() {
    let current = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});