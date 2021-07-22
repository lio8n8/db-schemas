import { defaultThemes } from './defaultThemes.js';

export class Theme {
    constructor() {
        this.themes = defaultThemes;
        this.currentTheme = defaultThemes[0];
        this.themeListContainerEl = document.getElementById('themes-list');

        this.init();
    }

    init() {

        defaultThemes.forEach(theme => {
            const themeEl = document.createElement('div');
            themeEl.className = 'theme';
            themeEl.id = theme.name;
            const themeNameEl = document.createElement('span');
            themeNameEl.textContent = theme.name;

            const themeColorsEl = document.createElement('div');
            themeColorsEl.className = 'theme-colors';

            // Colors.
            const backgroundColor = document.createElement('div');
            backgroundColor.className = 'theme-color';
            backgroundColor.style.backgroundColor = theme.backgroundColor;
            themeColorsEl.appendChild(backgroundColor);

            const borderColor = document.createElement('div');
            borderColor.className = 'theme-color';
            borderColor.style.backgroundColor = theme.borderColor;
            themeColorsEl.appendChild(borderColor);


            themeEl.appendChild(themeNameEl);
            themeEl.appendChild(themeColorsEl);
            this.themeListContainerEl.appendChild(themeEl);
        });

        let defaultTheme = document.getElementById(defaultThemes[0].name);
        defaultTheme.classList.add('active');
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemes() {
        return this.themes;
    }

    add(theme) {

    }

    save() {

    }

    validate(theme) {

    }

    render() {

    }
}
