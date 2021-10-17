export class LocalStorageManager {

    static DB_SCHEMAS_THEMES_ITEM = 'dbSchemasThemes';
    static CURRENT_THEME_ITEM = 'currentTheme';
    static localStorage = window.localStorage;

    constructor() {

    }

    static init(themes, currentTheme) {
        if (!localStorage.getItem(this.DB_SCHEMAS_THEMES_ITEM)) {
            localStorage.setItem(this.DB_SCHEMAS_THEMES_ITEM, themes || []);
        }

        if (localStorage.getItem(this.CURRENT_THEME_ITEM)) {
            setItem(this.DB_SCHEMAS_THEMES_ITEM, currentTheme);
        }
    }

    static addTheme(theme) {
        try {
            const themes = JSON.parse(localStorage.getItem(this.DB_SCHEMAS_THEMES_ITEM));
            themes.push(theme);
            this.localStorage.setItem(this.DB_SCHEMAS_THEMES_ITEM, JSON.stringify(themes));
        } catch (e) {
            console.error(e);
        }
    }

    static removeTheme(id) {

    }
}
