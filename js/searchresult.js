
//================ header tooltip =================
// USER TOOLTIP 
const userWrapper = document.querySelector(".user-menu-wrapper");
const userTooltip = document.querySelector(".user-tooltip-box");

userWrapper.addEventListener("mouseenter", () => {
    userTooltip.style.display = "flex";
});

userWrapper.addEventListener("mouseleave", (e) => {
    if (!userWrapper.contains(e.relatedTarget)) {
        userTooltip.style.display = "none";
    }
});


// GLOBE TOOLTIP 
const menuWrapper = document.querySelector(".currency-menu-wrapper");
const tooltip = document.querySelector(".currency-tooltip-box");

menuWrapper.addEventListener("mouseenter", () => {
    menuWrapper.classList.add("active");
});

menuWrapper.addEventListener("mouseleave", (e) => {
    if (!menuWrapper.contains(e.relatedTarget)) {
        menuWrapper.classList.remove("active");
    }
});


// CART TOOLTIP 
const cartWrapper = document.querySelector(".cart-wrapper");
const cartTooltip = document.querySelector(".cart-tooltip-box");

cartWrapper.addEventListener("mouseenter", () => {
    cartWrapper.classList.add("active");
});

cartWrapper.addEventListener("mouseleave", (e) => {
    if (!cartWrapper.contains(e.relatedTarget)) {
        cartWrapper.classList.remove("active");
    }
});



// COLOR FILTER LOGIC
document.querySelectorAll(".color-item").forEach(item => {
    item.addEventListener("click", function () {
        const input = this.querySelector("input");
        input.checked = !input.checked;
        const value = input.value;

        if (input.checked) addChip(value);
        else removeChip(value, true);
    });
});

// SIZE FILTER LOGIC
document.querySelectorAll(".size").forEach(item => {
    item.addEventListener("click", function () {
        const input = this.querySelector("input");
        input.checked = !input.checked;
        const value = input.value;

        if (input.checked) addChip(value);
        else removeChip(value, true);
    });
});

// COLLAPSIBLE COLOR SECTION
document.querySelectorAll(".options").forEach(section => {
    const header = section.previousElementSibling.querySelector("i");
    header.addEventListener("click", function () {
        section.classList.toggle("collapsed");

        if (section.classList.contains("collapsed")) {
            this.classList.replace("fa-minus", "fa-plus");
        } else {
            this.classList.replace("fa-plus", "fa-minus");
        }
    });
});



// ================ sidebar setup =================

// COLLAPSIBLE MENU
document.querySelectorAll('.menu-section h3').forEach(header => {
    header.addEventListener('click', function () {
        const section = this.parentElement;
        const icon = this.querySelector("i");

        section.classList.toggle("collapsed");

        if (section.classList.contains("collapsed")) {
            icon.classList.replace("fa-minus", "fa-plus");
        } else {
            icon.classList.replace("fa-plus", "fa-minus");
        }
    });
});

// FILTER LOGIC
let currentRadioChip = null;

function updateClearAllVisibility() {
    const chipCount = document.querySelectorAll(".filter-chip").length;
    const clearBtn = document.getElementById("clearAll");
    clearBtn.style.display = chipCount > 0 ? "block" : "none";
}

// Input change listener
document.querySelectorAll(".item-option input").forEach(input => {
    input.addEventListener("change", function () {
        const type = this.dataset.type;
        const value = this.value;

        if (type === "checkbox") {
            if (this.checked) addChip(value);
            else removeChip(value, true);
        } else if (type === "radio") {
            if (currentRadioChip) removeChip(currentRadioChip, true);
            addChip(value);
            currentRadioChip = value;
        }
    });
});

function addChip(text) {
    const container = document.getElementById("selectedFilters");
    if (document.getElementById("chip-" + text)) return;

    const chip = document.createElement("div");
    chip.className = "filter-chip";
    chip.id = "chip-" + text;
    chip.innerHTML = `${text} <span class="chip-close" onclick="removeChip('${text}', true)">×</span>`;

    container.appendChild(chip);
    updateClearAllVisibility();
}

function removeChip(text, uncheck = false) {
    const chip = document.getElementById("chip-" + text);
    if (chip) chip.remove();

    if (uncheck) {
        document.querySelectorAll(".item-option input").forEach(input => {
            if (input.value === text) input.checked = false;
        });
    }

    if (currentRadioChip === text) currentRadioChip = null;
    updateClearAllVisibility();
}

// Clear All
document.getElementById("clearAll").onclick = function () {
    document.getElementById("selectedFilters").innerHTML = "";
    document.querySelectorAll(".item-option input").forEach(input => input.checked = false);
    currentRadioChip = null;
    updateClearAllVisibility();
};





// SUBMENU
document.querySelectorAll(".toggle-sub").forEach(btn => {
    btn.addEventListener("click", function () {

        const subMenu = this.parentElement.querySelector(".sub-menu");
        const icon = this.querySelector("i");

        if (!subMenu) return;

        subMenu.classList.toggle("collapsed");

        if (subMenu.classList.contains("collapsed")) {
            icon.classList.replace("fa-minus", "fa-plus");
        } else {
            icon.classList.replace("fa-plus", "fa-minus");
        }
    });
});

// COLOR FILTER LOGIC
document.querySelectorAll(".color-item input").forEach(input => {
    input.addEventListener("change", function () {
        const value = this.value;
        if (this.checked) addChip(value);
        else removeChip(value, true);
    });
});

// COLLAPSIBLE COLOR SECTION
document.querySelectorAll(".options").forEach(section => {
    const header = section.parentElement.querySelector("h3 span i");
    header.addEventListener("click", function () {
        section.classList.toggle("collapsed");
        if (section.classList.contains("collapsed")) {
            this.classList.replace("fa-minus", "fa-plus");
        } else {
            this.classList.replace("fa-plus", "fa-minus");
        }
    });
});

// ================= FILTER LOGIC rang =================
let currentRangeChip = null;

// Add chip
function addChip(text) {
    const container = document.getElementById("selectedFilters");
    if (document.getElementById("chip-" + text)) return;

    const chip = document.createElement("div");
    chip.className = "filter-chip";
    chip.id = "chip-" + text;
    chip.innerHTML = `${text} <span class="chip-close" onclick="removeChip('${text}')">×</span>`;
    container.appendChild(chip);

    updateClearAllVisibility();
}

// Remove chip
function removeChip(text, uncheck = true) {
    const chip = document.getElementById("chip-" + text);
    if (chip) chip.remove();

    if (uncheck) {
        document.querySelectorAll(".item-option input").forEach(input => {
            if (input.value === text) input.checked = false;
        });
    }

    if (currentRangeChip === text) currentRangeChip = null;
    updateClearAllVisibility();
}

// Show/hide Clear All button
function updateClearAllVisibility() {
    const chipCount = document.querySelectorAll(".filter-chip").length;
    document.getElementById("clearAll").style.display = chipCount > 0 ? "block" : "none";
}

// Clear All button
document.getElementById("clearAll").onclick = function () {
    document.getElementById("selectedFilters").innerHTML = "";
    document.querySelectorAll(".item-option input").forEach(input => input.checked = false);
    currentRangeChip = null;

    removeRangeChip();
    updateClearAllVisibility();
};

// Radio & Checkbox logic
document.querySelectorAll(".item-option input").forEach(input => {
    input.addEventListener("change", function () {
        const type = this.dataset.type;
        const value = this.value;

        if (type === "checkbox") {
            if (this.checked) addChip(value);
            else removeChip(value);
        } else if (type === "radio") {
            if (currentRangeChip) removeChip(currentRangeChip);
            addChip(value);
            currentRangeChip = value;
        }
    });
});

// ================= RANGE SLIDER =================
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const minLabel = document.getElementById("min-label");
const maxLabel = document.getElementById("max-label");

// Update slider labels and chip
function updateRangeLabels() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if (minVal > maxVal - 50) minVal = maxVal - 50;
    if (maxVal < minVal + 50) maxVal = minVal + 50;

    minRange.value = minVal;
    maxRange.value = maxVal;

    minLabel.textContent = "$" + minVal;
    maxLabel.textContent = "$" + maxVal;

    updateRangeChip(minVal, maxVal);
}

// Create/update price range chip
function updateRangeChip(minVal, maxVal) {
    const container = document.getElementById("selectedFilters");
    const text = `$${minVal} - $${maxVal}`;

    let chip = document.getElementById("chip-price-range");
    if (chip) {
        chip.querySelector(".chip-text").textContent = text;
    } else {
        chip = document.createElement("div");
        chip.className = "filter-chip";
        chip.id = "chip-price-range";
        chip.innerHTML = `<span class="chip-text">${text}</span> <span class="chip-close" onclick="removeRangeChip()">×</span>`;
        container.appendChild(chip);
    }

    updateClearAllVisibility();
}

// Remove range chip and reset sliders
function removeRangeChip() {
    const chip = document.getElementById("chip-price-range");
    if (chip) chip.remove();

    minRange.value = 0;
    maxRange.value = 6062;
    minLabel.textContent = "$0";
    maxLabel.textContent = "$6062";
}

// Event listeners
minRange.addEventListener("input", updateRangeLabels);
maxRange.addEventListener("input", updateRangeLabels);


//view more hidden

document.getElementById("viewMoreBtn").addEventListener("click", function () {
    let hiddenItems = document.querySelectorAll("#menuList .hidden-item");

    hiddenItems.forEach(item => {
        item.style.display = "block";
    });

    // View More button hide kar do
    this.style.display = "none";
});


// view more size checkbox
const btn = document.getElementById("viewMoreBtn-size");
const morecol1 = document.getElementById("hidecol1-size");
const morecol2 = document.getElementById("hidecol2-size");

btn.addEventListener("click", function () {
    morecol1.style.display = "block";
    morecol2.style.display = "block";
    btn.style.display = "none";
});

// view more details checkbox
const btn2 = document.getElementById("viewMoreBtn-details");
const more = document.getElementById("hide-details");

btn2.addEventListener("click", function () {
    more.style.display = "block";
    btn2.style.display = "none";
});

//view more pattern type checkbox
const btn3 = document.getElementById("viewMoreBtn-pattern");
const morepattern = document.getElementById("hide-pattern");

btn3.addEventListener("click", function () {
    morepattern.style.display = "block";
    btn3.style.display = "none";
});


//recommended-dropdown

// JS: allow click select & keyboard support
(function () {
    const sortBox = document.getElementById('sortBox');
    const opts = document.querySelectorAll('.dropdown .opt');
    const selected = document.getElementById('selectedValue');

    opts.forEach(opt => {
        opt.addEventListener('click', e => {
            const v = opt.getAttribute('data-value');
            selected.textContent = v;
            // close dropdown by toggling class (CSS also handles hover)
            sortBox.classList.remove('open');
            sortBox.setAttribute('aria-expanded', 'false');
        });
    });

    // Keep dropdown open on keyboard focus, toggle with Enter
    sortBox.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sortBox.classList.toggle('open');
            const expanded = sortBox.classList.contains('open');
            sortBox.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        } else if (e.key === 'Escape') {
            sortBox.classList.remove('open');
            sortBox.setAttribute('aria-expanded', 'false');
        }
    });

    // optional: when clicking outside close the open dropdown
    document.addEventListener('click', (e) => {
        if (!sortBox.contains(e.target)) {
            sortBox.classList.remove('open');
            sortBox.setAttribute('aria-expanded', 'false');
        }
    });

    // make options keyboard-focusable
    opts.forEach((o, i) => o.setAttribute('tabindex', 0));
    opts.forEach(o => {
        o.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                o.click();
            }
        });
    });
})();

// timer Estimate -------------------

function startTimer(container) {
    let timeLeft = parseInt(container.dataset.time); // get initial time from data attribute

    let timerBox = container.querySelector('.timerBox');
    let estimatedBox = container.querySelector('.estimatedBox');

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
            estimatedBox.style.display = "none";
        }
    }, 1000);
}

// Start all timers on page
document.querySelectorAll('.timer-card').forEach(card => {
    startTimer(card);
});


const side_bar = document.getElementById("sidebar");
    const footer = document.getElementById("footer");

    window.addEventListener("scroll", () => {
        let sidebarBottom = side_bar.getBoundingClientRect().bottom;
        let footerTop = footer.getBoundingClientRect().top;

        // If sidebar is touching the footer → remove sticky
        if (sidebarBottom >= footerTop){
            side_bar.classList.add("not-sticky");
        } else {
            side_bar.classList.remove("not-sticky");
        }
    });

    let lastScroll = 0;
    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        let current = window.scrollY;

        if(current > lastScroll){
            header.classList.add("hide");   // scroll down → hide header
        }else{
            header.classList.remove("hide"); // scroll up → show header
        }

        lastScroll = current;
    });
