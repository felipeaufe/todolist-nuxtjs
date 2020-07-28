export const state = () => ({
    name: ""
})

export const mutations = {
    // Change theme
    change (state, newTheme) {
        state.name = newTheme;
        console.warn("CHANGE: ", state.name)
        if (process.browser) {
            window.localStorage.setItem('theme', newTheme);
        }
    },

    // Initialise a default theme if not was defined
    initialise (state) {
        if (process.browser) {
            let _theme = window.localStorage.getItem('theme');
            state.name = _theme || "light-theme";;
        }
    }
}

export const getters = {
    getTheme (state) {
        return state.name;
    }
}