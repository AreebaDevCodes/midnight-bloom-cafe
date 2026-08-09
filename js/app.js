/* =========================================
   Midnight Bloom Café
   Main JavaScript
========================================= */
/* =========================================
   Always Start Page From Top
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});

/* =========================================
   1. Loading Screen
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 1000);

    }

});


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("open");

    });

    const navigationLinks =
        navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

        });

    });

}

/* =========================================
   3. Menu Category Filter
========================================= */

const menuCategories =
    document.querySelectorAll(".menu-category");

const menuCards =
    document.querySelectorAll(".menu-card");


menuCategories.forEach(function (categoryButton) {


    categoryButton.addEventListener("click", function () {


        /* Get selected category */

        const selectedCategory =
            categoryButton.dataset.category;


        /* Remove active from all buttons */

        menuCategories.forEach(function (button) {

            button.classList.remove("active");

        });


        /* Add active to clicked button */

        categoryButton.classList.add("active");


        /* Show / hide menu cards */

        menuCards.forEach(function (card) {


            const cardCategory =
                card.dataset.category;


            if (cardCategory === selectedCategory) {

                card.classList.add("show");

            }

            else {

                card.classList.remove("show");

            }

        });

    });

});