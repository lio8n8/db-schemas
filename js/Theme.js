import { defaultThemes } from './defaultThemes.js';

export class Theme {
    constructor() {
        this.themes = defaultThemes;
        this.currentTheme = defaultThemes[0];
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
