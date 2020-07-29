<template>
    <section id="board">
        <!-- Frames created -->
        <draggable :list="frames" :animation="200" :move="checkMove(this)" ghost-class="ghost-card" group="frames"> 
            <Frame v-for="frame in frames" :frames="frames" :key="frame.id"
                :frame="frame"
            />
        </draggable>

        <!-- Add new Frame -->
        <div>
            <AddFrame/> 
        </div>

        <!-- Edit card modal -->
        <ModalCard ref="modal"/>
    </section>
</template>

<script>
    import Frame from "./frame/Frame";
    import AddFrame from "./frame/AddFrame";
    import draggable from "vuedraggable";
    import ModalCard from "./card/ModalCard";

    import { mapState, mapGetters } from 'vuex'

    import { debounce } from '../../heplers/debounce'

    export default {
        components: {
            draggable,
            ModalCard,
            AddFrame,
        },
        data() {
            return {
                frames: []
            };
        },
        computed: {
            ...mapState("frame", [
                "version",
            ]),
            ...mapGetters("frame", [
                "getFrames",
            ]),
        },
        watch: {
            /**
             * Ensures that values are always consulted.
             */
            version () {
                // Force break reference
                let frames = JSON.parse(JSON.stringify(this.getFrames));

                this.sortFrames(frames);
            }
        },
        methods: {
            checkMove (evt) {
                let frames = this.frames.filter( (frame, index) => {
                    let storeFrame = this.getFrames.find(( _frame ) => frame.id === _frame.id);
                    if(index !== storeFrame.order) {
                        frame.order = index;
                        return frame;
                    }
                });

                this.$store.dispatch('frame/updateCollection', frames);
            },

            sortFrames(frames){
                this.frames = frames.sort(function(a, b) {
                    var keyA = a.order,
                        keyB = b.order;
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
        },
        mounted () {
            this.$store.dispatch('frame/initialize');
        },
        created() {
            this.checkMove = debounce(this.checkMove, 2000);
        },
    }
</script>

<style lang="sass">
    #board
        padding: 25px
        height: calc(100vh - 56px)
        overflow: scroll
        display: flex
        align-items: flex-start
        > div
            flex-direction: row
            display: flex        
</style>