/* =========================================
   Midnight Bloom Café
   Main JavaScript
========================================= */


/* =========================================
   1. ALWAYS START PAGE FROM TOP
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});


/* =========================================
   2. LOADING SCREEN
========================================= */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 1000);

    }

});


/* =========================================
   3. MOBILE NAVIGATION
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


    navigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =========================================
   4. HOME MENU CATEGORY FILTER
========================================= */

const menuCategories =
    document.querySelectorAll(
        ".menu-category"
    );


const menuCards =
    document.querySelectorAll(
        "#menu-preview .menu-card"
    );


menuCategories.forEach(
    function (categoryButton) {

        categoryButton.addEventListener(
            "click",
            function () {

                const selectedCategory =
                    categoryButton.dataset.category;


                menuCategories.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                categoryButton.classList.add(
                    "active"
                );


                menuCards.forEach(
                    function (card) {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            cardCategory ===
                            selectedCategory
                        ) {

                            card.classList.add(
                                "show"
                            );

                        } else {

                            card.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =========================================
   5. FULL MENU CATEGORY FILTER
========================================= */

const menuCategoryButtons =
    document.querySelectorAll(
        ".full-menu-category"
    );


const menuGroups =
    document.querySelectorAll(
        ".full-menu-grid"
    );


menuCategoryButtons.forEach(
    function (button) {

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


                button.classList.add(
                    "active"
                );


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

    }
);


/* =========================================
   6. HOME MENU CARDS → FULL MENU
========================================= */

const homeMenuCards =
    document.querySelectorAll(
        "#menu-preview .menu-card"
    );


homeMenuCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function (event) {

                /*
                 * Do not open menu page
                 * when Add to Order is clicked.
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

    }
);


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


document.body.appendChild(
    orderButton
);


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


document.body.appendChild(
    orderPanel
);


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
   8. SAVE ORDER
========================================= */

function saveOrder() {

    localStorage.setItem(
        "midnightBloomOrder",
        JSON.stringify(orderItems)
    );

}


/* =========================================
   9. RENDER ORDER
========================================= */

function renderOrder() {

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
                Number(item.price) *
                Number(item.quantity);


            total += itemTotal;


            totalQuantity +=
                Number(item.quantity);


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
                        $${Number(
                            item.price
                        ).toFixed(2)}
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
       MINUS BUTTONS
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
                        orderItems[index] &&
                        orderItems[index].quantity > 1
                    ) {

                        orderItems[index].quantity--;

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
       PLUS BUTTONS
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


                    if (
                        orderItems[index]
                    ) {

                        orderItems[index]
                            .quantity++;

                    }


                    saveOrder();

                    renderOrder();

                }
            );

        }
    );


    /* =====================================
       REMOVE ENTIRE ITEM
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
   10. ADD TO ORDER
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
                 * Prevent home card navigation.
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


                /* Button feedback */

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
   11. OPEN ORDER PANEL
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
   12. CLOSE ORDER PANEL
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
   RESERVATION FORM
========================================= */

const reservationForm =
    document.querySelector(".reservation-form");

if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            /* -----------------------------
               Get Form Values
            ----------------------------- */

            const name =
                document
                    .querySelector("#guest-name")
                    .value
                    .trim();

            const date =
                document
                    .querySelector("#reservation-date")
                    .value;

            const time =
                document
                    .querySelector("#reservation-time")
                    .value
                    .trim()
                    .toUpperCase();

            const guests =
                document
                    .querySelector("#guests")
                    .value;

            const specialRequest =
                document
                    .querySelector("#special-request")
                    .value
                    .trim();


            /* -----------------------------
               Required Fields
            ----------------------------- */

            if (!name || !date || !time || !guests) {

                alert(
                    "Please complete all required fields."
                );

                return;
            }


            /* -----------------------------
               Validate Date
            ----------------------------- */

            const selectedDate =
                new Date(date + "T00:00:00");

            const today = new Date();

            today.setHours(0, 0, 0, 0);


            if (selectedDate < today) {

                alert(
                    "Please select today or a future date."
                );

                return;
            }


            /* -----------------------------
               Validate Time Format
               Example: 07:30 PM
            ----------------------------- */

            const timePattern =
                /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;


            if (!timePattern.test(time)) {

                alert(
                    "Please enter a valid time, for example 07:30 PM."
                );

                document
                    .querySelector("#reservation-time")
                    .focus();

                return;
            }


            /* -----------------------------
               Convert Time
               12-hour → 24-hour
            ----------------------------- */

            const timeParts =
                time.split(" ");

            const hourMinute =
                timeParts[0];

            const period =
                timeParts[1];

            let [hour, minute] =
                hourMinute.split(":")
                    .map(Number);


            if (period === "AM" && hour === 12) {

                hour = 0;

            }

            else if (period === "PM" && hour !== 12) {

                hour += 12;

            }


            const totalMinutes =
                (hour * 60) + minute;


            /* -----------------------------
               Café Opening Hours
               08:00 AM → 12:00 AM
            ----------------------------- */

            const openingTime =
                8 * 60;

            const closingTime =
                24 * 60;


            if (
                totalMinutes < openingTime ||
                totalMinutes >= closingTime
            ) {

                alert(
                    "Please select a reservation time between 08:00 AM and 11:45 PM."
                );

                document
                    .querySelector("#reservation-time")
                    .focus();

                return;
            }


            /* -----------------------------
               Save Reservation
            ----------------------------- */

            const reservationData = {

                name: name,

                date: date,

                time: time,

                guests: guests,

                request: specialRequest

            };


            localStorage.setItem(
                "midnightBloomReservation",
                JSON.stringify(reservationData)
            );


            /* -----------------------------
               Go To Confirmation
            ----------------------------- */

            window.location.href =
                "confirmation.html";

        }
    );

}

/* =========================================
   14. INITIAL ORDER RENDER
========================================= */

renderOrder();

/* =========================================
   ORDER → CHECKOUT
========================================= */

const checkoutButton =
    document.querySelector(".checkout-button");

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (orderItems.length === 0) {

                alert(
                    "Your order is empty. Please add something first."
                );

                return;
            }

            window.location.href =
                "checkout.html";

        }
    );

}

/* =========================================
   CHECKOUT PAGE
========================================= */

const checkoutItemsContainer =
    document.querySelector("#checkout-items");

const checkoutTotalElement =
    document.querySelector("#checkout-total");


if (checkoutItemsContainer && checkoutTotalElement) {

    const savedOrder =
        JSON.parse(
            localStorage.getItem("midnightBloomOrder")
        ) || [];


    /* -----------------------------------------
       Empty Order
    ----------------------------------------- */

    if (savedOrder.length === 0) {

        checkoutItemsContainer.innerHTML = `
            <div class="checkout-empty">

                <p>
                    Your order is empty.
                </p>

                <span>
                    Please return to the menu
                    and add something first.
                </span>

            </div>
        `;

        checkoutTotalElement.textContent = "$0.00";

    }


    /* -----------------------------------------
       Show Saved Order
    ----------------------------------------- */

    else {

        let total = 0;

        checkoutItemsContainer.innerHTML = "";


        savedOrder.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            const checkoutItem =
                document.createElement("div");

            checkoutItem.className =
                "checkout-item";


            checkoutItem.innerHTML = `

                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <span>
                        $${item.price.toFixed(2)}
                        × ${item.quantity}
                    </span>

                </div>


                <strong class="checkout-item-price">
                    $${itemTotal.toFixed(2)}
                </strong>

            `;


            checkoutItemsContainer.appendChild(
                checkoutItem
            );

        });


        checkoutTotalElement.textContent =
            `$${total.toFixed(2)}`;

    }

}

/* =========================================
   PLACE ORDER
========================================= */

const placeOrderButton =
    document.querySelector("#place-order");

if (placeOrderButton) {

    placeOrderButton.addEventListener(
        "click",
        function () {

            const name =
                document
                    .querySelector("#order-name")
                    .value
                    .trim();

            const phone =
                document
                    .querySelector("#order-phone")
                    .value
                    .trim();

            const orderType =
                document
                    .querySelector("#order-type")
                    .value;


            /* -----------------------------
               Validate Customer Details
            ----------------------------- */

            if (!name || !phone || !orderType) {

                alert(
                    "Please complete your details before placing the order."
                );

                return;
            }


            /* -----------------------------
               Get Current Order
            ----------------------------- */

            const currentOrder =
                JSON.parse(
                    localStorage.getItem(
                        "midnightBloomOrder"
                    )
                ) || [];


            if (currentOrder.length === 0) {

                alert(
                    "Your order is empty. Please add something from the menu."
                );

                return;
            }


            /* -----------------------------
               Calculate Total
            ----------------------------- */

            let total = 0;

            currentOrder.forEach(function (item) {

                total +=
                    item.price * item.quantity;

            });


            /* -----------------------------
               Save Order Information
            ----------------------------- */

            const orderData = {

                name: name,

                phone: phone,

                orderType: orderType,

                items: currentOrder,

                total: total

            };


            localStorage.setItem(
                "midnightBloomCompletedOrder",
                JSON.stringify(orderData)
            );


            /* -----------------------------
               Go To Order Confirmation
            ----------------------------- */

            window.location.href =
                "order-confirmation.html";

        }
    );

}

/* =========================================
   ORDER CONFIRMATION PAGE
========================================= */

const confirmationItemsContainer =
    document.querySelector("#confirmation-items");

const confirmationName =
    document.querySelector("#confirmation-name");

const confirmationPhone =
    document.querySelector("#confirmation-phone");

const confirmationType =
    document.querySelector("#confirmation-type");

const confirmationTotal =
    document.querySelector("#confirmation-total");


if (
    confirmationItemsContainer &&
    confirmationName &&
    confirmationPhone &&
    confirmationType &&
    confirmationTotal
) {

    const completedOrder =
        JSON.parse(
            localStorage.getItem(
                "midnightBloomCompletedOrder"
            )
        );


    /* -----------------------------------------
       No Order Found
    ----------------------------------------- */

    if (!completedOrder) {

        confirmationItemsContainer.innerHTML = `
            <div class="checkout-empty">

                <p>
                    No recent order was found.
                </p>

                <span>
                    Please return to the menu and
                    place an order first.
                </span>

            </div>
        `;

    }


    /* -----------------------------------------
       Display Completed Order
    ----------------------------------------- */

    else {

        confirmationName.textContent =
            completedOrder.name;

        confirmationPhone.textContent =
            completedOrder.phone;

        confirmationType.textContent =
            completedOrder.orderType;


        confirmationItemsContainer.innerHTML =
            "";


        completedOrder.items.forEach(
            function (item) {

                const itemTotal =
                    item.price * item.quantity;


                const confirmationItem =
                    document.createElement("div");

                confirmationItem.className =
                    "confirmation-item";


                confirmationItem.innerHTML = `

                    <div class="confirmation-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <span>
                            $${item.price.toFixed(2)}
                            × ${item.quantity}
                        </span>

                    </div>

                    <strong class="confirmation-item-price">
                        $${itemTotal.toFixed(2)}
                    </strong>

                `;


                confirmationItemsContainer.appendChild(
                    confirmationItem
                );

            }
        );


        confirmationTotal.textContent =
            `$${completedOrder.total.toFixed(2)}`;

    }

}