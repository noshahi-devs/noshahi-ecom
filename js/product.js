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


    // ===== CART TOOLTIP =====
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

        if(current > lastScroll){
            header.classList.add("hide");   // scroll down → hide header
        }else{
            header.classList.remove("hide"); // scroll up → show header
        }

        lastScroll = current;
    });


/* ---------- Size buttons & dropdown sync ---------- */
  const sizeBtns = document.querySelectorAll('.size-btn');
  const sizeSelect = document.getElementById('sizeSelect');
  function clearSizes(){ sizeBtns.forEach(b => b.classList.remove('selected')); }
  sizeBtns.forEach(b => { b.addEventListener('click', () => { clearSizes(); b.classList.add('selected'); sizeSelect.value = b.dataset.size; }); });
  sizeSelect.addEventListener('change', () => { clearSizes(); const v = sizeSelect.value; sizeBtns.forEach(b => { if (b.dataset.size === v) b.classList.add('selected'); }); });