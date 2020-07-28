
export const state = () => ({
    title: "",
    description: "",
    frame_id: "",
    open: true,
    
    version: 0,
})

export const mutations = {
    newCard (state, frame_id) {
        return new Promise((resolve) => {
            state.title       = "Novo cartão";
            state.description = "";
            state.frame_id    = frame_id;
            state.open        = true;
            
            resolve()
        })
    },

    editCard (state, card) {
        return new Promise((resolve) => {
            
            state.title       = card.title;
            state.description = card.description;
            state.frame_id    = card.frame_id;
            state.open        = card.open;
            
            state.version = this.$newVersion();
            resolve()
        })
    },

    reset(state) {
        state.title       = "";
        state.description = "";
        state.frame_id    = "";
        state.open        = true;
    }
}

export const getters = {
    getCard (state) {
        return {
            title:       state.title,
            description: state.description,
            frame_id:    state.frame_id,
            open:        state.open,
        };
    }
}