<template>
    <div class="frame">
        <div class="title">
            <div>
                <input type="text" v-model="title" @keyup.enter="updateTitle" @blur="updateTitle" placeholder="Adicionar outra lista">
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
        <draggable :list="frame.todos" :animation="200" :move="checkMove" ghost-class="ghost-card" group="todos">
            
            <card v-for="(todo) in cards" :key="todo.id" :todo="todo"></card>

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
    import { mapGetters } from 'vuex'
    import { debounce } from '../../../heplers/debounce'

    export default {
        data () {
            return {
                frame_menu: false,
                cards: [],
                title: ""
            }
        },
        components: {
            draggable,
            Card,
        },
        props: {
            frames: {
                type: Array,
                default: () => ([])
            },
            frame: {
                type: Object,
                default: () => ({})
            }
        },
        mounted () {
            this.title =  this.frame.title;
        },
        methods: {
            debounce () {},
            checkMove (evt) {

                let cardsUpdate = []; // Just update position
                let cardsChange = []; // Change frame

                this.frames.forEach( (frame) => {
                    frame.todos.forEach( (card, index) => {
                        let _card = JSON.parse(JSON.stringify(card));
                        _card.order = index;
                        _card.frame_id = frame.id;

                        // Change frame?
                        if(card.frame_id !== frame.id){
                            _card.frame_id_old = card.frame_id;
                            cardsChange.push(_card)
                        }
                        
                        // Update position?
                        else if(card.order !== index){
                            cardsUpdate.push(_card);
                        }
                    })
                });
                console.log({ cardsUpdate, cardsChange });
                this.$store.dispatch('card/updateCollection', cardsUpdate.concat(cardsChange));
            },
            updateTitle(event){
                if(this.title !== this.frame.title && this.title.length){
                    this.frame.title = this.title;
                    this.$store.dispatch('frame/updateFrame', this.frame);   

                    if(event){
                        event.target.blur();
                    } 
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
                    this.$store.dispatch('frame/removeFrame', this.frame.id);
                }
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
                await this.$store.commit('card/newCard', {
                    id: this.frame.id,
                    card_order: this.frame.todos.length
                });
                this.$root.$emit('bv::show::modal', 'card-modal')
            },
            sortCards(cards){
                this.cards = cards.sort(function(a, b) {
                    var keyA = a.order,
                        keyB = b.order;
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
        },
        created() {
            this.checkMove = debounce(this.checkMove, 3000);
        },
        mounted () {
            this.sortCards(this.frame.todos)
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