import { defaultThemes } from './data/defaultThemes.js';

export class Theme {
    constructor() {
        this.themes = defaultThemes;
        this.currentTheme = defaultThemes[0];
        this.currentThemeEl = null;
        this.themeListContainerEl = document.getElementById('themes-list');

        this.actionbuttons = {
            create: document.getElementById('create-theme-btn'),
            import: document.getElementById('import-themes-btn'),
            export: document.getElementById('export-theme-btn')
        };
    }

    init(callback) {

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

            const backgroundColor2 = document.createElement('div');
            backgroundColor2.className = 'theme-color';
            backgroundColor2.style.backgroundColor = theme.backgroundColor2;
            themeColorsEl.appendChild(backgroundColor2);

            const borderColor = document.createElement('div');
            borderColor.className = 'theme-color';
            borderColor.style.backgroundColor = theme.borderColor;
            themeColorsEl.appendChild(borderColor);

            const schemaBackgroundColor = document.createElement('div');
            schemaBackgroundColor.className = 'theme-color';
            schemaBackgroundColor.style.backgroundColor = theme.backgroundColor3;
            themeColorsEl.appendChild(schemaBackgroundColor);

            const deleteIcon = document.createElement('img');
            deleteIcon.className = 'theme-delete-icon'
            deleteIcon.setAttribute('src', 'src/images/delete.svg');

            const editIcon = document.createElement('img');
            editIcon.className = 'theme-edit-icon'
            editIcon.setAttribute('src', 'src/images/edit.svg');

            themeEl.appendChild(themeNameEl);
            themeEl.appendChild(themeColorsEl);
            themeEl.appendChild(editIcon);
            themeEl.appendChild(deleteIcon);
            this.themeListContainerEl.appendChild(themeEl);

            themeEl.addEventListener('click', callback);
        });

        // Set default theme.
        this.currentThemeEl = document.getElementById(defaultThemes[0].name);
        this.currentThemeEl.classList.add('active');
        
    }

    /*changeTheme(el, callback) {
        this.currentThemeEl.classList.remove('active');
        
        el.addEventListener('click', callback);
        el.classList.add('active');
    }*/

    getCurrentTheme() {
        return this.currentTheme;
    }

    setCurrentTheme(currentTheme) {
        this.currentTheme = currentTheme;
    }

    getCurrentThemeEl() {
        return this.getCurrentThemeEl;
    }

    setCurrentThemeEl(currentThemeEl) {
        this.currentThemeEl = currentThemeEl;
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
