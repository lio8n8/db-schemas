import { defaultThemes } from './data/defaultThemes.js';
import { LocalStorageManager } from './LocalStorageManager.js';

export class Theme {
    constructor() {
        this.themes = defaultThemes;
        this.currentTheme = defaultThemes[0];
        this.currentThemeEl = null;
        this.themeListContainerEl = document.getElementById('themes-list');
        this.customThemes = [];

        this.actionbuttons = {
            create: document.getElementById('create-theme-btn'),
            import: document.getElementById('import-themes-btn'),
            export: document.getElementById('export-theme-btn')
        };

        LocalStorageManager.init(JSON.stringify(this.themes), this.currentTheme);
    }

    init(callback) {

        defaultThemes.forEach(theme => this.render(theme, callback));

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

    add(theme, callback) {
        this.validate(theme);
        this.themes.push(theme);
        this.render(theme, callback);
    }

    edit(themeId) {
        const createThemeWindowEl = document.getElementById('create-theme-window');
        const windowWrapperEl = document.getElementById('window-wrapper');

        windowWrapperEl.style.visibility = 'visible';
        createThemeWindowEl.style.display = 'flex';
    }

    save() {

    }

    validate(theme) {

    }

    render(theme, callback) {
        const themeEl = document.createElement('div');
        themeEl.className = 'theme';
        themeEl.id = theme.name;

        const themeViewEl = document.createElement('div');
        themeViewEl.id = theme.name;
        themeViewEl.className = 'theme-view';

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
        deleteIcon.id = theme.name;

        const editIcon = document.createElement('img');
        editIcon.className = 'theme-edit-icon'
        editIcon.setAttribute('src', 'src/images/edit.svg');
        editIcon.id = theme.name;

        themeViewEl.appendChild(themeNameEl);
        themeViewEl.appendChild(themeColorsEl);

        themeEl.appendChild(themeViewEl);
        themeEl.appendChild(editIcon);
        themeEl.appendChild(deleteIcon);
        this.themeListContainerEl.appendChild(themeEl);

        themeViewEl.addEventListener('click', event => {
            // TODO: Check if theme was changed.
            this.updateActiveTheme(event);
            callback();
        });
        deleteIcon.addEventListener('click', () => alert('Not yet implemented!'));
        editIcon.addEventListener('click', event => {
            alert('Not yet implemented!')

            // this.edit(event.target.id);
        });
    }

    updateActiveTheme(event) {
        if (this.currentThemeEl) {
            this.currentThemeEl.classList.remove('active');
        }
        this.currentTheme = this.themes.find(t => t.name == event.target.id);
        this.setCurrentThemeEl(event.target);
        event.target.classList.add('active');
    }
}
