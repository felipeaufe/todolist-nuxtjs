
export const state = () => ({
    frames: [],

    version: 0,
})

export const actions = {
    async initialize({commit}){
        console.warn("initialize")
        let res = await this.$axios.get("/frames");
        try{
            commit('initialize', res.data.data);
        }catch(err){
            console.error("initialize", err);
            commit('initialize', []);
        }
    },

    async removeFrame ({commit}, frame_id) {
        let res = await this.$axios.delete("/frame/" + frame_id);
        console.log("res", res)
        try{
            if(res.data.return_code === 1){
                commit('removeFrame', frame_id);
            }else{
                console.error(res.data.data.message)
            }
        }catch(err){
            console.error(err);
        }
    },

    async addFrame ({commit}, frame) {
        let res = await this.$axios.post("/frame", {
            "title": frame.title,
            "order": frame.order
        });

        try{
            if(res.data.return_code === 1){
                commit('addFrame', res.data.data);
            }else{
                console.error(res.data.data.message)
            }
        }catch(err){
            console.error(err);
        }
    },

    async updateFrame ({commit}, frame) {
        let res = await this.$axios.put("/frame", {
            "id": frame.id,
            "title": frame.title,
            "order": frame.order
        });

        try{
            if(res.data.return_code === 1){
                commit('updateFrame', res.data.data);
            }else{
                console.error(res.data.data.message)
            }
        }catch(err){
            console.error(err);
        }
    },

    async updateAll ({commit}) {
        
    },
}

export const mutations = {
    reset(state) {
        state.title       = "";
        state.description = "";
        state.id          = "";
        state.open        = true;
    },

    addFrame (state, frame) {
        state.frames.push(frame);
        state.version = this.$newVersion();
    },

    removeFrame (state, frame_id) {
        state.frames.forEach((frame, index)=>{
            if(frame.id === frame_id){
                state.frames.splice(index, 1);
                state.version = this.$newVersion();
            }
        })
    },

    updateFrame (state, newFrame) {
        state.frames.forEach((frame, index)=>{
            if(frame.id === newFrame.id){
                state.frames[index].title = newFrame.title;
                state.frames[index].order = newFrame.order;

                // state.version = this.$newVersion();
            }
        });
    },

    initialize (state, frames) {
        state.frames = frames;
        state.version = this.$newVersion();
    }
}

export const getters = {
    getFrames (state) {
        return state.frames
    },

    getLength (state) {
        return state.frames.length;
    }
}
export const setters = {}