document.addEventListener("DOMContentLoaded", function () {
    console.log("Edem Garden Restaurant website loaded.");

    var buttons = document.querySelectorAll(".language-switcher button");

    function setLanguage(lang) {
        var dict = translations[lang];
        if (!dict) {
            return;
        }

            document.documentElement.setAttribute("lang", lang === "gr" ? "el" : lang);

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-alt");
            if (dict[key] !== undefined) {
                el.setAttribute("alt", dict[key]);
            }
        });

        buttons.forEach(function (btn) {
            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active-lang");
            } else {
                btn.classList.remove("active-lang");
            }
        });

        try {
            localStorage.setItem("edemGardenLang", lang);
        } catch (e) {
            /* localStorage not available, ignore */
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var lang = btn.getAttribute("data-lang");
    
            try {
                localStorage.setItem("edemGardenLang", lang);
            } catch (e) {
                // localStorage non disponibile
            }
    
            window.location.reload();
        });
    });

    var savedLang = null;
    try {
        savedLang = localStorage.getItem("edemGardenLang");
    } catch (e) {
        /* localStorage not available, ignore */
    }

    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
    } else {
        setLanguage("en");
    }

    // ---------- SCROLL ANIMATIONS ----------

const revealElements = document.querySelectorAll(
    ".section h2, " +
    ".intro, " +
    ".eyebrow:not(.hero .eyebrow):not(.image-section-content .eyebrow), " +
    ".dishes-intro h3, " +
    ".dishes-subtitle, " +
    ".olympos-section h2, " +
    ".image-section-content, " +
    ".quote-section, " +
    ".food-card, " +
    ".dish-card, " +
    ".restaurant-photos img, " +
    ".mobile-float-photo, " +
    ".visit-photo img, " +
    ".visit-details > div, " +
    ".visit-hours, " +
    ".visit-text .action-buttons, " +
    ".lithos-text > p:not(.intro):not(.eyebrow), " +
    ".lithos-details > div, " +
    ".lithos-text .action-buttons, " +
    ".lithos-photo img, " +
    ".masonry-item, " +
    ".olympos-gallery img, " +
    ".social-content, " +
    ".social-award"
);
    
// ---------- CURTAIN REVEAL: INGRESSO ----------

const entranceImage = document.querySelector(
    '.image-section-image img[src="images/ingresso-1.jpg"]'
);

if (entranceImage) {
    entranceImage.classList.add("curtain-reveal");
}
    if ("IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach(function(el) {
            el.classList.add("scroll-reveal");
            observer.observe(el);
        });
        
        // Osserva la fotografia dell'ingresso
            if (entranceImage) {
            observer.observe(entranceImage);
            }
    }

});
