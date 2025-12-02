//headre & footer

// === USER TOOLTIP ===
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


// === GLOBE TOOLTIP ===
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


// Get all thumbnails
const thumbs = document.querySelectorAll(".thumb img");
const mainImage = document.getElementById("mainImage");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", function () {

    // Set main image to clicked thumbnail image
    mainImage.src = this.src;

    // Remove active class from all thumbnails
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));

    // Add active class to clicked image's parent
    this.parentElement.classList.add("active");
  });
});

// --- Quantity Selector Logic ---
document.querySelector(".qty-box").addEventListener("click", (e) => {
  const input = document.querySelector(".qty-input");
  let currentQty = parseInt(input.value);

  if (e.target.textContent === "+") {
    input.value = currentQty + 1;
  } else if (e.target.textContent === "-" && currentQty > 1) {
    input.value = currentQty - 1;
  }
  let cartCount = 0;

  cartCount = currentQty;
});

// --- Size Selection Logic --- 
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// --- Color Selection Logic (UPDATED to also change main image src) ---
const mainImageElement = document.getElementById("mainImage");

document.querySelectorAll(".color-item").forEach(cl => {
  cl.addEventListener("click", () => {
    document.querySelectorAll(".color-item").forEach(c => c.classList.remove("active"));
    cl.classList.add("active");

    const imgElement = cl.querySelector('img');
    const placeholderDiv = cl.querySelector('.image-placeholder');
    let selectedImageSrc = null;

    if (imgElement && imgElement.src) {
      selectedImageSrc = imgElement.src;
    }

    // Use the selected image source or fall back to the main black image if needed
    if (selectedImageSrc) {
      mainImageElement.src = selectedImageSrc;
    } else {
      // For placeholder colors (Dark Wash, Blue), revert to the default main image
      mainImageElement.src = "uploaded:work3.PNG-8bdda14e-ca16-497a-aa9e-40788dd187d7";
    }

  });
});

// header move oper

let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  let current = window.scrollY;

  if (current > lastScroll) {
    header.classList.add("hide");   // scroll down → hide header
  } else {
    header.classList.remove("hide"); // scroll up → show header
  }

  lastScroll = current;
});


/* ---------- Size buttons & dropdown sync ---------- */
const sizeBtns = document.querySelectorAll('.size-btn');
const sizeSelect = document.getElementById('sizeSelect');
function clearSizes() { sizeBtns.forEach(b => b.classList.remove('selected')); }
sizeBtns.forEach(b => { b.addEventListener('click', () => { clearSizes(); b.classList.add('selected'); sizeSelect.value = b.dataset.size; }); });
sizeSelect.addEventListener('change', () => { clearSizes(); const v = sizeSelect.value; sizeBtns.forEach(b => { if (b.dataset.size === v) b.classList.add('selected'); }); });

/* ---------- Favourite toggle ---------- */
const favBtn = document.getElementById('favBtn');
const favIcon = document.getElementById('favIcon');
let fav = false;
favBtn.addEventListener('click', () => { fav = !fav; favIcon.className = fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'; favIcon.style.color = fav ? '#000' : '#111'; });

/* ---------- Accordion Collapse Plus Minus ---------- */
document.querySelectorAll('.acc-row').forEach(row => {
  row.addEventListener('click', () => {
    const id = row.dataset.acc;
    const content = document.getElementById(id);
    const isOpen = content.style.display === 'block';
    document.querySelectorAll('.acc-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.acc-row .plus').forEach(p => p.textContent = '+');
    if (!isOpen) { content.style.display = 'block'; row.querySelector('.plus').textContent = '-'; }
  });
});


// SWITCH COUNTRY → CHANGE FIRST COLUMN HEADING
document.querySelectorAll(".country-select").forEach(item => {
  item.addEventListener("click", function () {
    const selected = this.innerText;
    document.getElementById("countryBtn").innerText = selected + " Size";
    document.getElementById("countryCol").innerText = selected;
  });
});

// TABS
const tabProduct = document.getElementById("tabProduct");
const tabBody = document.getElementById("tabBody");
const productTab = document.getElementById("productTab");
const bodyTab = document.getElementById("bodyTab");

tabProduct.onclick = () => {
  tabProduct.classList.add("active");
  tabBody.classList.remove("active");
  productTab.style.display = "block";
  bodyTab.style.display = "none";
};

tabBody.onclick = () => {
  tabBody.classList.add("active");
  tabProduct.classList.remove("active");
  productTab.style.display = "none";
  bodyTab.style.display = "block";
};

//next previous images

const thumbButtons = document.querySelectorAll('.c-thumb');
const mainImg = document.getElementById('mainImage');
let currentIndex = 0;

// --- Thumbnail Click Logic ---
thumbButtons.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    updateMainImage();
  });
});

// --- Prev Button ---
document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + thumbButtons.length) % thumbButtons.length;
  updateMainImage();
});

// --- Next Button ---
document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % thumbButtons.length;
  updateMainImage();
});

// --- Update Function (Best Practice) ---
function updateMainImage() {
  const imgPath = thumbButtons[currentIndex].dataset.img;
  mainImg.src = imgPath;

  thumbButtons.forEach(t => t.classList.remove('active'));
  thumbButtons[currentIndex].classList.add('active');
}

// ===== HOVER CART MODAL CONTROL tool tip =====

const hoverCartBtn = document.getElementById("hoverCartBtn");
const hoverCartModal = document.getElementById("hoverCartModal");
const hoverClose = document.querySelector(".hover-close");

// Hover open
hoverCartBtn.addEventListener("mouseenter", () => {
  hoverCartModal.style.display = "block";
});

// Hover close when leaving
hoverCartBtn.addEventListener("mouseleave", () => {
  hoverCartModal.style.display = "none";
});

// Close button inside modal
hoverClose.addEventListener("click", () => {
  hoverCartModal.style.display = "none";
});

//Globe Modal
//count product with cart icon
let cartCount = 0;
let cartQtyValue = 0;

// ===== HOVER MODAL CART FUNCTIONALITY =====

const hoverMain = document.getElementById("hoverMain");
const hoverAllCheck = document.getElementById("hoverAllCheck");
const hoverProdCheck = document.getElementById("hoverProdCheck");
const hoverProductBox = document.getElementById("hoverProductBox");
const hoverTotalPrice = document.getElementById("hoverTotalPrice");
const hoverProdPrice = document.getElementById("hoverProdPrice");
const hoverDeleteProd = document.getElementById("hoverDeleteProd");
const iconCartQty = document.getElementById("iconCartQty");
const hoverCartQty = document.getElementById("hoverCartQty");
const hoverQtyArrow = document.getElementById("hoverQtyArrow");
const hoverQtyValue = document.getElementById("hoverQtyValue");
const hoverDropdownList = document.getElementById("hoverDropdownList");
const hoverUnitPrice = 10.00;
// Populate Qty Dropdown
for (let i = 1; i <= 10; i++) {
  let div = document.createElement("div");
  div.textContent = i;
  div.onclick = function () {
    hoverQtyValue.textContent = i;
    hoverCartQty.textContent = i;
    hoverDropdownList.style.display = "none";
    hoverTotalPrice.textContent = "$" + (hoverUnitPrice * i).toFixed(2);
    iconCartQty.textContent = i;
  };
  hoverDropdownList.appendChild(div);
}

// Qty dropdown toggle
hoverQtyArrow.onclick = function () {
  hoverDropdownList.style.display = hoverDropdownList.style.display === "block" ? "none" : "block";
  hoverQtyArrow.textContent = hoverQtyArrow.textContent === "▼" ? "▲" : "▼";
};

// Update checkboxes
function hoverUpdateAll() {
  if (!hoverMain.checked || !hoverAllCheck.checked) {
    hoverProdCheck.checked = false;
    hoverProdPrice.style.visibility = "hidden";
    hoverTotalPrice.textContent = "$0.00";
    hoverCartQty.textContent = "0";
    iconCartQty.textContent = "0";   // <-- ADD HERE
  } else {
    hoverProdCheck.checked = true;
    hoverProdPrice.style.visibility = "visible";
    hoverTotalPrice.textContent = "$" + (hoverUnitPrice * parseInt(hoverQtyValue.textContent)).toFixed(2);
    hoverCartQty.textContent = hoverQtyValue.textContent;
    iconCartQty.textContent = hoverQtyValue.textContent;   // <-- ADD HERE
  }
}


hoverMain.addEventListener("change", hoverUpdateAll);
hoverAllCheck.addEventListener("change", hoverUpdateAll);

// Delete product
hoverDeleteProd.onclick = function () {
  hoverProductBox.style.display = "none";
  hoverTotalPrice.textContent = "$0.00";
  hoverCartQty.textContent = "0";
  let currentQty = parseInt(iconCartQty.textContent);
  currentQty = currentQty > 1 ? currentQty - 1 : 0;

  // Update both modal qty & icon badge
  hoverQtyValue.textContent = currentQty;
  hoverCartQty.textContent = currentQty;
  iconCartQty.textContent = currentQty;

  // Update total price
  hoverTotalPrice.textContent = "$" + (hoverUnitPrice * currentQty).toFixed(2);

  // Hide product box if qty=0
  if (currentQty === 0) {
    hoverProductBox.style.display = "none";
  }

};


function openHoverModal() {
  myModal.style.display = "block";
  startTimer();
}


// VIEW ADD TO CART MODEL

let Main = document.getElementById("Main");
let allCheck = document.getElementById("allCheck");
let prodCheck = document.getElementById("prodCheck");
let productBox = document.getElementById("productBox");
let totalPrice = document.getElementById("totalPrice");
let prodPrice = document.getElementById("prodPrice");
let deleteProd = document.getElementById("deleteProd");

let cartQty = document.getElementById("cartQty");
let qtyArrow = document.getElementById("qtyArrow");
let qtyValue = document.getElementById("qtyValue");
let dropdownList = document.getElementById("dropdownList");





let unitPrice = 10.00;

// --- Dropdown for cart modal ---
for (let i = 1; i <= 10; i++) {
  let divCart = document.createElement("div");
  divCart.textContent = i;
  divCart.onclick = function () {
    cartQtyValue = i;    // sync current value
    cartCount = i;       // badge sync
    updateCartState();   // update modals & badge

    // ✅ Input box update
    const input = document.querySelector(".qty-input");
    if (input) input.value = i;

    dropdownList.style.display = "none";
  };
  dropdownList.appendChild(divCart);
}

// --- Dropdown for hover modal ---
for (let i = 1; i <= 10; i++) {
  let divHover = document.createElement("div");
  divHover.textContent = i;
  divHover.onclick = function () {
    cartQtyValue = i;
    cartCount = i;
    updateCartState();

    // ✅ Input box update
    const input = document.querySelector(".qty-input");
    if (input) input.value = i;

    hoverDropdownList.style.display = "none";
  };
  hoverDropdownList.appendChild(divHover);
}


qtyArrow.onclick = function () {
  dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
  qtyArrow.textContent = qtyArrow.textContent === "▼" ? "▲" : "▼";
};

function updateAll() {
  if (!Main.checked || !allCheck.checked) {
    prodCheck.checked = false;
    prodPrice.style.visibility = "hidden";
    totalPrice.textContent = "$0.00";
    cartQty.textContent = "0";
  } else {
    prodCheck.checked = true;
    prodPrice.style.visibility = "visible";
    totalPrice.textContent = "$" + (unitPrice * parseInt(qtyValue.textContent)).toFixed(2);
    cartQty.textContent = qtyValue.textContent;
  }
}

Main.addEventListener("change", updateAll);
allCheck.addEventListener("change", updateAll);

deleteProd.onclick = function () {
  productBox.style.display = "none";
  totalPrice.textContent = "$0.00";
  cartQty.textContent = "0";
};


// Close button
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});

// Modal background par click → close
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
});

let myModal = document.getElementById("myModal");
let modalBox = document.querySelector("#myModal .modal-content");
let closeBtn = document.querySelector("#myModal .close");

let hideTimer = null;

// === OPEN MODAL ===


// === TIMER START ===
function startTimer() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    myModal.style.display = "none";
  }, 1000);
}



// === CHECK IF MOUSE IS INSIDE modal-content ===
function isCursorInsideContent(e) {
  let box = modalBox.getBoundingClientRect();
  return (
    e.clientX > box.left &&
    e.clientX < box.right &&
    e.clientY > box.top &&
    e.clientY < box.bottom
  );
}

// === STOP TIMER WHEN CURSOR ENTERS modal-content AREA ===
myModal.addEventListener("mousemove", function (e) {
  if (isCursorInsideContent(e)) {
    clearTimeout(hideTimer);
  } else {
    startTimer();
  }
});


function addToCart() {
  // 1️⃣ Current quantity from input box
  const input = document.querySelector(".qty-input");
  let currentQty = parseInt(input.value);

  // 2️⃣ Cart count ko current quantity se set karo
  cartCount = currentQty;

  // 4️⃣ Sync karo cartQtyValue
  cartQtyValue = cartCount;

  // 5️⃣ Update sab modal aur badge
  updateCartState();

  // 6️⃣ Show modals
  let modal = document.getElementById("myModal");
  if (modal) modal.style.display = "block";
  hoverProductBox.style.display = "block"; // hover modal ka product box
  hoverProductBox.style.display = "flex";
  productBox.style.display = "block";
  productBox.style.display = "flex";

  startTimer();
}



deleteProd.onclick = function () {
  if (cartCount > 0) cartCount--;
  if (cartQtyValue > 0) cartQtyValue--;

  // Update sab modals & icon
  updateCartState();

  // Agar qty 0 ho → product card hide karo
  if (cartQtyValue === 0) {
    productBox.style.display = "none";
  }
};



// === CLOSE BUTTON ===
closeBtn.addEventListener("click", () => {
  myModal.style.display = "none";
  clearTimeout(hideTimer);
});

function updateCartState() {
  // Cart icon badge
  document.getElementById("iconCartQty").textContent = cartCount;

  // Hover modal
  if (document.getElementById("hoverQtyValue")) {
    document.getElementById("hoverQtyValue").textContent = cartQtyValue;
    document.getElementById("hoverCartQty").textContent = cartQtyValue;
    document.getElementById("hoverTotalPrice").textContent = "$" + (unitPrice * cartQtyValue).toFixed(2);
  }

  // Cart modal
  if (document.getElementById("qtyValue")) {
    document.getElementById("qtyValue").textContent = cartQtyValue;
    document.getElementById("cartQty").textContent = cartQtyValue;
    document.getElementById("totalPrice").textContent = "$" + (unitPrice * cartQtyValue).toFixed(2);
  }

  // ✅ Input box ko bhi update kar do
  const input = document.querySelector(".qty-input");
  if (input) input.value = cartQtyValue;
}


for (let i = 1; i <= 10; i++) {
  let divHover = document.createElement("div");
  divHover.textContent = i;
  divHover.onclick = function () {
    cartQtyValue = i;
    cartCount = i;  // badge sync
    updateCartState();
    hoverDropdownList.style.display = "none";
  };
  hoverDropdownList.appendChild(divHover);

  let divCart = divHover.cloneNode(true);
  divCart.onclick = function () {
    cartQtyValue = i;
    cartCount = i;  // badge sync
    updateCartState();
    dropdownList.style.display = "none";
  };
  dropdownList.appendChild(divCart);
}

hoverDeleteProd.onclick = deleteProd.onclick = function () {
  if (cartCount > 0) cartCount--;
  if (cartQtyValue > 0) cartQtyValue--;
  updateCartState();

  if (cartQtyValue === 0) {
    if (hoverProductBox) hoverProductBox.style.display = "none";
    if (productBox) productBox.style.display = "none";
  }
};



deleteProd.onclick = function () {
  if (cartCount > 0) cartCount--;
  if (cartQtyValue > 0) cartQtyValue--;
  updateCartState();

  if (cartQtyValue === 0) hoverProductBox.style.display = "none";
  if (cartQtyValue === 0) productBox.style.display = "none";
};











