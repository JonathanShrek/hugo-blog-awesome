(() => {
    "use strict";
    const LS_THEME_KEY = "theme";
    const THEMES = {
        LIGHT: "light",
        DARK: "dark",
        AUTO: "auto",
    };

    const body = document.body;
    const config = body.getAttribute("data-theme");

    const getThemeState = () => {
        const lsState = localStorage.getItem(LS_THEME_KEY);
        if (lsState) return lsState;

        let state;
        switch (config) {
            case THEMES.DARK:
                state = THEMES.DARK;
                break;
            case THEMES.LIGHT:
                state = THEMES.LIGHT;
                break;
            case THEMES.AUTO:
            default:
                state = window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? THEMES.DARK
                    : THEMES.LIGHT;
                break;
        }
        return state;
    };

    const initTheme = (state) => {
        if (state === THEMES.DARK) {
            document.documentElement.classList.add(THEMES.DARK);
            document.documentElement.classList.remove(THEMES.LIGHT);
        } else if (state === THEMES.LIGHT) {
            document.documentElement.classList.remove(THEMES.DARK);
            document.documentElement.classList.add(THEMES.LIGHT);
        }
        updateThemeIcons(state);
    };

    const updateThemeIcons = (theme) => {
        const sunIcon = document.querySelector('.mode-sunny');
        const moonIcon = document.querySelector('.mode-moon');
        if (theme === THEMES.DARK) {
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        }
    };

    const toggleTheme = () => {
        const state = getThemeState();
        if (state === THEMES.DARK) {
            localStorage.setItem(LS_THEME_KEY, THEMES.LIGHT);
            initTheme(THEMES.LIGHT);
        } else {
            localStorage.setItem(LS_THEME_KEY, THEMES.DARK);
            initTheme(THEMES.DARK);
        }
    };

    window.addEventListener("DOMContentLoaded", () => {
        const modeToggle = document.getElementById("mode");
        modeToggle.addEventListener("click", toggleTheme);

        // Initialize theme based on stored or default state
        initTheme(getThemeState());
    });
})();
