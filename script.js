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

        window.edemAnimationsReady = true;

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

            // Riavvia le animazioni dopo il cambio lingua
        if (window.edemAnimationsReady) {

            // HERO: testi e pulsanti
            document.querySelectorAll(".hero-content > *").forEach(function(el) {
                el.style.animation = "none";
                void el.offsetWidth;
                el.style.animation = "";
            });

            // HERO: zoom dello sfondo
            var hero = document.querySelector(".hero");
            if (hero) {
                hero.classList.remove("hero-restart");
                void hero.offsetWidth;
                hero.classList.add("hero-restart");
            }

            // Altre sezioni: ripristina le animazioni
            document.querySelectorAll(".scroll-reveal").forEach(function(el) {
                el.classList.remove("is-visible");
            });

            if (window.edemRevealObserver) {
                document.querySelectorAll(".scroll-reveal").forEach(function(el) {
                    window.edemRevealObserver.observe(el);
                });
            }
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            setLanguage(btn.getAttribute("data-lang"));
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
        ".image-section-content, " +
        ".food-card, " +
        ".dish-card, " +
        ".restaurant-photos img, " +
        ".mobile-float-photo, " +
        ".visit-photo img, " +
        ".lithos-photo img, " +
        ".masonry-item, " +
        ".olympos-gallery img, " +
        ".social-content, " +
        ".social-award"
    );

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

        window.edemRevealObserver = observer;

        revealElements.forEach(function(el) {
            el.classList.add("scroll-reveal");
            observer.observe(el);
        });
    }

});
