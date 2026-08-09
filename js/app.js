/* =========================================
   Midnight Bloom Café
   Main JavaScript
========================================= */


/* =========================================
   1. Always Start Page From Top
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});


/* =========================================
   2. Loading Screen
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 1000);

    }

});


/* =========================================
   3. Mobile Navigation
========================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("open");

        }
    );


    const navigationLinks =
        navLinks.querySelectorAll("a");


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove("open");

            }
        );

    });

}


/* =========================================
   4. Home Menu Category Filter
========================================= */

const menuCategories =
    document.querySelectorAll(".menu-category");

const menuCards =
    document.querySelectorAll(
        "#menu-preview .menu-card"
    );


menuCategories.forEach(function (categoryButton) {

    categoryButton.addEventListener(
        "click",
        function () {

            const selectedCategory =
                categoryButton.dataset.category;


            menuCategories.forEach(
                function (button) {

                    button.classList.remove("active");

                }
            );


            categoryButton.classList.add("active");


            menuCards.forEach(
                function (card) {

                    const cardCategory =
                        card.dataset.category;


                    if (
                        cardCategory ===
                        selectedCategory
                    ) {

                        card.classList.add("show");

                    } else {

                        card.classList.remove("show");

                    }

                }
            );

        }
    );

});


/* =========================================
   5. Full Menu Category Filter
========================================= */

const menuCategoryButtons =
    document.querySelectorAll(
        ".full-menu-category"
    );

const menuGroups =
    document.querySelectorAll(
        ".full-menu-grid"
    );


menuCategoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedCategory =
                button.dataset.category;


            menuCategoryButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            menuGroups.forEach(
                function (group) {

                    if (
                        group.dataset.menuGroup ===
                        selectedCategory
                    ) {

                        group.hidden = false;

                    } else {

                        group.hidden = true;

                    }

                }
            );

        }
    );

});


/* =========================================
   6. Open Full Menu From Home Cards
========================================= */

const homeMenuCards =
    document.querySelectorAll(
        "#menu-preview .menu-card"
    );


homeMenuCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function (event) {

            /*
             * Do not open menu page if
             * Add to Order was clicked.
             */

            if (
                event.target.closest(
                    ".add-to-cart"
                )
            ) {

                return;

            }


            const category =
                card.dataset.category;


            if (!category) {

                return;

            }


            window.location.href =
                "pages/menu.html?category=" +
                category;

        }
    );

});


/* =========================================
   7. ORDER / CART SYSTEM
========================================= */


/* -----------------------------------------
   Get Saved Order
----------------------------------------- */

let orderItems = [];

try {

    orderItems =
        JSON.parse(
            localStorage.getItem(
                "midnightBloomOrder"
            )
        ) || [];

} catch (error) {

    orderItems = [];

}


/* -----------------------------------------
   Create Floating Order Button
----------------------------------------- */

const orderButton =
    document.createElement("button");

orderButton.className =
    "floating-order-button";

orderButton.type = "button";

orderButton.innerHTML = `

    <span>🛒</span>

    <span>
        Your Order
    </span>

    <span class="order-count">
        0
    </span>

`;

document.body.appendChild(orderButton);


/* -----------------------------------------
   Create Order Panel
----------------------------------------- */

const orderPanel =
    document.createElement("div");

orderPanel.className =
    "order-panel";

orderPanel.innerHTML = `

    <div class="order-panel-header">

        <div>

            <p class="section-label">
                MIDNIGHT BLOOM
            </p>

            <h2>
                Your Order
            </h2>

        </div>


        <button
            class="close-order"
            type="button"
            aria-label="Close order">

            ×

        </button>

    </div>


    <div class="order-items">
    </div>


    <div class="order-panel-footer">

        <div class="order-total">

            <span>
                Total
            </span>

            <strong>
                $0.00
            </strong>

        </div>


        <button
            class="checkout-button"
            type="button">

            Continue

        </button>

    </div>

`;

document.body.appendChild(orderPanel);


/* -----------------------------------------
   Order Elements
----------------------------------------- */

const orderCount =
    orderButton.querySelector(
        ".order-count"
    );


const orderItemsContainer =
    orderPanel.querySelector(
        ".order-items"
    );


const orderTotal =
    orderPanel.querySelector(
        ".order-total strong"
    );


const closeOrderButton =
    orderPanel.querySelector(
        ".close-order"
    );


/* =========================================
   Save Order
========================================= */

function saveOrder() {

    localStorage.setItem(
        "midnightBloomOrder",
        JSON.stringify(orderItems)
    );

}


/* =========================================
   Render Order
========================================= */

function renderOrder() {

    /*
     * Clear old items
     */

    orderItemsContainer.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;


    /* -------------------------------------
       Empty Order
    ------------------------------------- */

    if (orderItems.length === 0) {

        orderItemsContainer.innerHTML = `

            <div class="empty-order">

                <p>
                    Your order is empty.
                </p>

                <span>
                    Choose something beautiful
                    from our menu.
                </span>

            </div>

        `;

    }


    /* -------------------------------------
       Create Each Order Item
    ------------------------------------- */

    orderItems.forEach(
        function (item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;

            totalQuantity +=
                item.quantity;


            const orderItem =
                document.createElement(
                    "div"
                );


            orderItem.className =
                "order-item";


            orderItem.innerHTML = `

                <div class="order-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <span>
                        $${item.price.toFixed(2)}
                    </span>

                </div>


                <div class="order-item-controls">

                    <button
                        type="button"
                        class="quantity-minus"
                        data-index="${index}">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-plus"
                        data-index="${index}">

                        +

                    </button>


                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}"
                        aria-label="Remove ${item.name}">

                        ×

                    </button>

                </div>

            `;


            orderItemsContainer.appendChild(
                orderItem
            );

        }
    );


    /* -------------------------------------
       Update Total
    ------------------------------------- */

    orderTotal.textContent =
        `$${total.toFixed(2)}`;


    orderCount.textContent =
        totalQuantity;


    /* =====================================
       Minus Buttons
    ===================================== */

    const minusButtons =
        orderItemsContainer.querySelectorAll(
            ".quantity-minus"
        );


    minusButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        orderItems[index]
                            .quantity > 1
                    ) {

                        orderItems[index]
                            .quantity--;

                    } else {

                        orderItems.splice(
                            index,
                            1
                        );

                    }


                    saveOrder();

                    renderOrder();

                }
            );

        }
    );


    /* =====================================
       Plus Buttons
    ===================================== */

    const plusButtons =
        orderItemsContainer.querySelectorAll(
            ".quantity-plus"
        );


    plusButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    orderItems[index]
                        .quantity++;


                    saveOrder();

                    renderOrder();

                }
            );

        }
    );


    /* =====================================
       Remove Entire Item Buttons
    ===================================== */

    const removeButtons =
        orderItemsContainer.querySelectorAll(
            ".remove-item"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    /*
                     * Remove the complete
                     * item regardless of quantity.
                     */

                    orderItems.splice(
                        index,
                        1
                    );


                    saveOrder();

                    renderOrder();

                }
            );

        }
    );

}


/* =========================================
   8. Add To Order
========================================= */

const addToCartButtons =
    document.querySelectorAll(
        ".add-to-cart"
    );


addToCartButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                /*
                 * Prevent the home menu
                 * card from opening menu page.
                 */

                event.stopPropagation();


                const name =
                    button.dataset.item;


                const price =
                    Number(
                        button.dataset.price
                    );


                const existingItem =
                    orderItems.find(
                        function (item) {

                            return (
                                item.name ===
                                name
                            );

                        }
                    );


                if (existingItem) {

                    existingItem.quantity++;

                } else {

                    orderItems.push({

                        name: name,

                        price: price,

                        quantity: 1

                    });

                }


                saveOrder();

                renderOrder();


                /* ---------------------------------
                   Button Feedback
                --------------------------------- */

                button.innerHTML =
                    `Added ✓ <span>+</span>`;


                setTimeout(
                    function () {

                        button.innerHTML =
                            `Add to order <span>+</span>`;

                    },
                    1200
                );

            }
        );

    }
);


/* =========================================
   9. Open Order Panel
========================================= */

orderButton.addEventListener(
    "click",
    function () {

        orderPanel.classList.add(
            "open"
        );

    }
);


/* =========================================
   10. Close Order Panel
========================================= */

closeOrderButton.addEventListener(
    "click",
    function () {

        orderPanel.classList.remove(
            "open"
        );

    }
);


/* =========================================
   11. Initial Order Render
========================================= */

renderOrder();

/* =========================================
   RESERVATION FORM
========================================= */

const reservationForm =
    document.querySelector(".reservation-form");


if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.querySelector("#guest-name").value.trim();

            const date =
                document.querySelector("#reservation-date").value;

            const time =
             document.querySelector("#reservation-time").value.trim();

const timePattern =
    /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

if (!timePattern.test(time)) {

    alert("Please enter a valid time, for example 7:30 PM.");

    document
        .querySelector("#reservation-time")
        .focus();

    return;
}

            const guests =
                document.querySelector("#guests").value;


            if (!name || !date || !time || !guests) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /* Save reservation */

            const reservation = {

                name: name,

                date: date,

                time: time,

                guests: guests,

                specialRequest:
                    document.querySelector(
                        "#special-request"
                    ).value.trim(),

                order:
                    orderItems

            };


            localStorage.setItem(
                "midnightBloomReservation",
                JSON.stringify(reservation)
            );


            /* Confirmation */

            reservationForm.innerHTML = `

                <div class="reservation-success">

                    <p class="section-label">
                        MIDNIGHT BLOOM
                    </p>

                    <h2>
                        Your table is
                        <span>waiting.</span>
                    </h2>

                    <p>
                        Thank you, ${name}.
                        Your reservation request has been
                        saved successfully.
                    </p>

                    <div class="reservation-summary">

                        <p>
                            <strong>Date:</strong>
                            ${date}
                        </p>

                        <p>
                            <strong>Time:</strong>
                            ${time}
                        </p>

                        <p>
                            <strong>Guests:</strong>
                            ${guests}
                        </p>

                    </div>

                    <a
                        href="../index.html"
                        class="primary-button">

                        Back to Home
                        <span>→</span>

                    </a>

                </div>

            `;

        }
    );

}