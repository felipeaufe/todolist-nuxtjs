<template>
    <section id="board">
        <!-- Frames created -->
        <div class="frames-draggable" :key="_version">
            <draggable :list="frames" :animation="200" :move="checkMove(this)" ghost-class="ghost-card" group="frames"> 
                <Frame v-for="frame in frames" :frames="frames" :key="frame.id"
                    :frame="frame"
                />
            </draggable>
        </div>

        <!-- Add new Frame -->
        <div>
            <AddFrame/> 
        </div>

        <!-- Edit card modal -->
        <ModalCard ref="modal"/>

        <p id="saving">
            Salvando
            <i>.</i>
            <i>.</i>
            <i>.</i>
        </p>
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
                frames: [],
                _version: 0
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
            version (key) {
                // Force break reference
                let frames = JSON.parse(JSON.stringify(this.getFrames));

                this.sortFrames(frames);

                // Force element reload
                // ** This can be improved by applying only to the edited card;
                this._version = key;
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
        @media (min-width: 320px) and (max-width: 767px)
            padding-left: 5px
            height: calc(100vh - 90px)
        > .frames-draggable > div
            flex-direction: row
            display: flex    

        #saving
            opacity: 0
            position: absolute
            bottom: 20px
            right: 30px
            font-size: 18px
            font-weight: 600
            color: #3c0e6c
            pointer-events: none
            transition: opacity 0.2s ease-in-out
            &.show
                opacity: 1
            i
                animation-name: blink
                animation-duration: 1.4s
                animation-iteration-count: infinite
                animation-fill-mode: both
                &:nth-child(2)
                    animation-delay: .2s
                &:nth-child(3)
                    animation-delay: .4s
    @keyframes blink
        0%
            opacity: .2
        20%
            opacity: 1
        100%
            opacity: .2
</style>