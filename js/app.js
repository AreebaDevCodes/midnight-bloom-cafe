/* =========================
   Midnight Bloom Café
   Loader Functionality
========================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 1000);

});

/* =========================
   Mobile Navigation
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});

/* =========================
   Close Mobile Menu
   After Link Click
========================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});