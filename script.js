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
});
