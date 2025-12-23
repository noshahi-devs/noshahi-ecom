// ---------------------- ALL ITEMS / SHEIN / PRODUCT CHECKS ----------------------
const allItems = document.getElementById("allItemsCheck");
const sheinCheck = document.getElementById("sheinCheck");
const prodCheck = document.getElementById("vcProdCheck");

allItems.addEventListener("change", function () {
    sheinCheck.checked = this.checked;
    prodCheck.checked = this.checked;
});

sheinCheck.addEventListener("change", function () {
    allItems.checked = this.checked;
    prodCheck.checked = this.checked;
});

prodCheck.addEventListener("change", function () {
    allItems.checked = this.checked;
    sheinCheck.checked = this.checked;
});

// timer Estimate -------------------

function startTimer(container) {
    let timeLeft = parseInt(container.dataset.time); // get initial time from data attribute

    let timerBox = container.querySelector('.timerBox');
    let estimatedBox = container.querySelector('.estimatedBox');
    let vcPrice = container.querySelector('.vc-new-price');

    function formatTime(sec) {
        let hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
        let mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        let secs = String(sec % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    timerBox.textContent = formatTime(timeLeft);

    let countdown = setInterval(() => {
        timeLeft--;
        timerBox.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerBox.textContent = "00:00:00";
            estimatedBox.style.textDecoration = "line-through";
            vcPrice.textContent = "$13.00";
        }
    }, 1000);
}

// Start all timers on page
document.querySelectorAll('.timer-card').forEach(card => {
    startTimer(card);
});

// del box
document.getElementById("vcDeleteProd").addEventListener("click", () => {
    document.getElementById("vcProductBox").style.display = "none";
});



// ---------------------- QTY DROPDOWN ----------------------
const arrow = document.getElementById("vcQtyArrow");
const list = document.getElementById("vcDropdownList");
const qtyValue = document.getElementById("vcQtyValue");

for (let i = 1; i <= 20; i++) {
    let div = document.createElement("div");
    div.innerText = i;
    div.onclick = () => {
        qtyValue.innerText = i;
        list.style.display = "none";
    };
    list.appendChild(div);
}

arrow.onclick = () => {
    list.style.display = list.style.display === "block" ? "none" : "block";
};


// ---------------------- FAVORITE HEART ----------------------
const favBtn = document.getElementById("vcFavBtn");
const favIcon = document.getElementById("vcFavIcon");
const favText = document.getElementById("vcFavText");

let fav = false;

favBtn.onclick = () => {
    fav = !fav;

    if (fav) {
        favIcon.classList.replace("fa-regular", "fa-solid");
        favIcon.classList.add("filled");
    } else {
        favIcon.classList.replace("fa-solid", "fa-regular");
        favIcon.classList.remove("filled");
    }
};
