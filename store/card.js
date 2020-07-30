
export const state = () => ({
    title: "",
    description: "",
    frame_id: "",
    order: true,
    open: true,
    id: null,
    
    version: 0,
})

export const actions = {
    removeCard ({commit, dispatch}, card) {
        return new Promise( async (resolve) => {
            let res = await this.$axios.delete("/todo/" + card.id);
            try{
                if(res.data.return_code === 1){
                    dispatch('frame/removeCard', card, {root:true});
                    commit('reset');
                    resolve(true);
                }else{
                    console.error(res.data.data.message)
                    resolve(false);
                }
            }catch(err){
                console.error(err);
                resolve(false);
            }
        });
    },

    addCard ({commit, dispatch, state}, frame) {
        return new Promise( async (resolve) => {
            let res = await this.$axios.post("/todo", {
                "title":        frame.title,
                "description":  frame.description,
                "frame_id":     state.frame_id,
                "open":         state.open,
                "order":        state.order,
            });

            try{
                if(res.data.return_code === 1){
                    dispatch('frame/addCard', res.data.data, {root:true});
                    commit('reset');
                    resolve(true);
                }else{
                    console.error(res.data.data.message)
                    resolve(false);
                }
            }catch(err){
                console.error(err);
                resolve(false);
            }
        });
    },

    updateCard ({commit, dispatch}, card) {
        return new Promise( async (resolve)=>{
            let res = await this.$axios.put("/todo", {
                id:          card.id,
                title:       card.title,
                description: card.description,
                open:        card.open,
                frame_id:    card.frame_id,
                order:       card.order,
            });

            try{
                if(res.data.return_code === 1){
                    dispatch('frame/updateCard', res.data.data, {root:true});
                    commit('reset');
                    resolve(true)
                }else{
                    console.error(res.data.data.message)
                    resolve(false)
                }
            }catch(err){
                console.error(err);
                resolve(false)
            }
        })
    },

    async updateCollection ({commit}, cards) {
        let hasError = false,
            message = "";

        for (const card of cards) {
            let res = await this.$axios.put("/todo", {
                id:          card.id,
                frame_id:    card.frame_id,
                title:       card.title,
                description: card.description,
                open:        card.open,
                order:       card.order,
            });

            if(res.data.return_code !== 1){
                hasError = true;   
                message = res.data.data.message;
            }
        }

        if(hasError){
            console.error(`Update Collection Error: ${message}`);
        }
    }
}

export const mutations = {
    newCard (state, frame) {
        return new Promise((resolve) => {
            state.title       = "Novo cartão";
            state.description = "";
            state.frame_id    = frame.id;
            state.open        = true;
            state.order       = frame.card_order || 0;
            
            resolve()
        })
    },

    editCard (state, card) {
        return new Promise((resolve) => {
            
            state.title       = card.title;
            state.description = card.description;
            state.frame_id    = card.frame_id;
            state.open        = card.open;
            state.order       = card.order;
            state.id          = card.id;
            
            state.version = this.$newVersion();
            resolve()
        })
    },

    reset(state) {
        state.title       = "";
        state.description = "";
        state.frame_id    = "";
        state.order       = "";
        state.id          = null
        state.open        = true;
    },
}

export const getters = {
    getCard (state) {
        return {
            title:       state.title,
            description: state.description,
            frame_id:    state.frame_id,
            order:       state.order,
            open:        state.open,
            id:          state.id,
        };
    }
}