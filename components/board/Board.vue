<template>
    <section id="board">
        <!-- Frames created -->
        <draggable :list="columns" :animation="200" :move="checkMove" ghost-class="ghost-card" group="columns"> 
            <Frame v-for="column in columns" :key="column.title"
                :column="column"
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

    export default {
        components: {
            draggable,
            ModalCard,
            AddFrame,
        },
        data() {
            return {
                columns: []
                // columns: [
                //     {
                //     title: "Backlog",
                //     tasks: [
                //         {
                //         id: 1,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         },
                //         {
                //         id: 2,
                //         title: "Provide documentation on integrations",
                //         date: "Sep 12"
                //         },
                //         {
                //         id: 3,
                //         title: "Design shopping cart dropdown",
                //         date: "Sep 9",
                //         type: "Design"
                //         },
                //         {
                //         id: 4,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         },
                //         {
                //         id: 5,
                //         title: "Test checkout flow",
                //         date: "Sep 15",
                //         type: "QA"
                //         }
                //     ]
                //     },
                //     {
                //     title: "In Progress",
                //     tasks: [
                //         {
                //         id: 6,
                //         title: "Design shopping cart dropdown",
                //         date: "Sep 9",
                //         type: "Design"
                //         },
                //         {
                //         id: 7,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         },
                //         {
                //         id: 8,
                //         title: "Provide documentation on integrations",
                //         date: "Sep 12",
                //         type: "Backend"
                //         }
                //     ]
                //     },
                //     {
                //     title: "Review",
                //     tasks: [
                //         {
                //         id: 9,
                //         title: "Provide documentation on integrations",
                //         date: "Sep 12"
                //         },
                //         {
                //         id: 10,
                //         title: "Design shopping cart dropdown",
                //         date: "Sep 9",
                //         type: "Design"
                //         },
                //         {
                //         id: 11,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         },
                //         {
                //         id: 12,
                //         title: "Design shopping cart dropdown",
                //         date: "Sep 9",
                //         type: "Design"
                //         },
                //         {
                //         id: 13,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         }
                //     ]
                //     },
                //     {
                //     title: "Done",
                //     tasks: [
                //         {
                //         id: 14,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         },
                //         {
                //         id: 15,
                //         title: "Design shopping cart dropdown",
                //         date: "Sep 9",
                //         type: "Design"
                //         },
                //         {
                //         id: 16,
                //         title: "Add discount code to checkout page",
                //         date: "Sep 14",
                //         type: "Feature Request"
                //         }
                //     ]
                //     }
                // ]
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

                console.log({ evt })
                let frame1 = evt.draggedContext.element;
                let frame2 = evt.relatedContext.element;

                frame1.order = evt.draggedContext.futureIndex;
                frame2.order = evt.draggedContext.index;

                this.$store.dispatch('frame/updateFrame', frame1);
                this.$store.dispatch('frame/updateFrame', frame2);
            },
            sortFrames(frames){
                this.columns = frames.sort(function(a, b) {
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

            // // Update all every 5 seconds
            // this.$nextTick(function () {
            //     window.setInterval(() => {
            //         this.$store.dispatch('frame/updateAll');
            //     },5000);
            // })
        }
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