<template>
    <div class="frame">
        <div class="title">
            <div>
                <input type="text" v-model="title" @blur="onTitleBlur" placeholder="Adicionar outra lista">
                <!-- <p>
                    {{ column.title }}
                    <span>{{ column.tasks.length }}</span>
                </p> -->
                <div class="frame-menu" v-click-outside="outsideClick">
                    <a href="#" v-on:click="toggleMenu">
                        <i>...</i>
                    </a>
                    <aside :class="{ 'show': frame_menu } ">
                        <ul>
                            <li><a href="#" @click="newCard">Adicionar cartão</a></li>
                            <li><a href="#" @click="removeFrame">Remover lista</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
        <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
            
            <card v-for="(task) in column.tasks" :key="task.id" :task="task"></card>

            <a href="#" class="add-card" v-on:click="newCard">
                <i><svg height="426.66667pt" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg></i>
                Adicionar novo cartão
            </a>
        </draggable>
    </div>
</template>

<script>

    import draggable from "vuedraggable";
    import Card from "../card/Card";

    export default {
        data () {
            return {
                frame_menu: false,
                title: ""
            }
        },
        components: {
            draggable,
            Card,
        },
        props: {
            column: {
                type: Object,
                default: () => ({})
            }
        },
        mounted () {
            this.title =  this.column.title;
        },
        methods: {

            onTitleBlur(){
                if(this.title !== this.column.title && this.title.length){
                    this.column.title = this.title;
                    this.$store.commit('frame/updateFrame', this.column);   
                }
            },
            async removeFrame (){
                
                let messages = {
                    title: 'Apagar lista',
                    description: 'Deseja realmente apagar esta lista?',
                    btnYes: 'Sim',
                    btnNo: 'Agora não'
                };

                if(await this.$modalConfirm(messages)){
                    this.$store.dispatch('frame/removeFrame', this.column.id);
                }
            },

            updateFrame(){
                // Update frame...
            },

            toggleMenu() {
                this.frame_menu = !this.frame_menu;
            },

            outsideClick(event) {
                if(this.frame_menu){
                    this.toggleMenu();
                }
            },
            async newCard() {
                await this.$store.commit('card/newCard');
                this.$root.$emit('bv::show::modal', 'card-modal')
            },
        }
    }
</script>

<style lang="sass">
    .frame
        background-color: var(--frame-bg)
        border-radius: 6px
        padding: 10px 5fdpx
        margin: 0 8px
        padding: 0 13px 13px
        width: 280px
        .title
            >div
                display: flex
                align-items: center
                justify-content: space-between
                padding: 0 15px
                input
                    border: none
                    font-weight: 700
                    padding: 5px
                    margin: 10px -5px
                    color: var(--frame-title)
                    background: none
                    &:focus
                        background: white
                        
                p
                    font-weight: 700
                    margin-bottom: 5px
                    padding: 15px 0
                    color: var(--frame-title)

                    span
                        color: var(--frame-title-count)
                        font-weight: 500
                        margin-left: 2px
            .frame-menu
                position: relative
                z-index: 1
                > a
                    display: block
                    width: 30px
                    height: 30px
                    display: flex
                    align-items: center
                    justify-content: center
                    border-radius: 3px
                    font-weight: 700
                    color: var(--frame-title)
                    text-decoration: none
                    &:hover
                        background-color: var(--frame-hover)
                    i
                        line-height: 0
                        margin-top: -7px

                > aside
                    position: absolute
                    background-color: white
                    padding: 10px 0
                    border-radius: 5px
                    box-shadow: 0px 0px 10px -3px #00000066
                    width: 230px
                    left: 0
                    display: none
                    &.show
                        display: block
                    ul
                        margin: 0
                        padding: 0
                        list-style-type: none
                        li
                            padding: 3px 10px
                            &:hover
                                background-color: var(--frame-hover-light)
                            a
                                text-decoration: none
                                color: black
                                font-size: 15px
        > div
        .add-card
            text-decoration: none
            color: black
            width: 100%
            display: block
            padding: 5px
            color: var(--frame-color-light)
            &:hover
                background-color: var(--frame-hover)
                color: var(--frame-color)
                i svg path
                    fill: var(--frame-color)
            i
                svg
                    margin-bottom: 4px
                    width: 14px
                    height: auto
                    path
                        fill: var(--frame-color-light)
</style>