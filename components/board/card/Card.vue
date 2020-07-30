<template>
    <div class="card" @click="editCard">
        <div class="card-closed" v-if="!todo.open">
            Finalizado
        </div>
        <div class="info">
            <p class="todo-title">{{todo.title}}</p>
            <div class="todo-footer">
                <ul v-if="todo.description">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        </div>
        <a class="edit" href="#">
            <i class="edit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px">
                    <polygon points="51.2,353.28 0,512 158.72,460.8   " data-original="#000000" class="active-path" data-old_color="#000000" fill="#6E6E6E"/><rect x="89.73" y="169.097" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -95.8575 260.3719)" width="353.277" height="153.599" data-original="#000000" class="active-path" data-old_color="#000000" fill="#6E6E6E"/><path d="M504.32,79.36L432.64,7.68c-10.24-10.24-25.6-10.24-35.84,0l-23.04,23.04l107.52,107.52l23.04-23.04    C514.56,104.96,514.56,89.6,504.32,79.36z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#6E6E6E"/>
                </svg>
            </i>
        </a>
    </div>
</template>

<script>

    export default {
        props: {
            todo: {
                type: Object,
                default: () => ({})
            },
        },
        computed: {
            
        },
        methods: {
            async editCard() {
                await this.$store.commit('card/editCard', this.todo);
                this.$root.$emit('bv::show::modal', 'card-modal')
            }
        }
    };
</script>

<style lang="sass" scoped>
    .card
        border: none
        box-shadow: 0px 0px 5px 0px #0000001f
        margin-bottom: 10px
        padding: 15px
        cursor: pointer
        display: flex
        flex-direction: row
        justify-content: space-between
        z-index: 1
        position: relative
        &:hover
            a.edit
                opacity: 1
        .card-closed
            position: absolute
            bottom: 0
            right: 0
            background-color: var(--card-open-color)
            font-size: 9px
            padding: 4px 9px
            border-top-left-radius: 5px
            color: white
            font-weight: 600
        p.todo-title
            color: var(--frame-title)
            font-size: 15px
            line-height: 1.2
            margin-bottom: 0
        .todo-footer
            margin-top: 20px
            ul
                margin: 0
                width: 16px
                height: 20px
                padding: 0
                list-style-type: none
                li
                    background-color: var(--card-text-color)
                    height: 2px
                    margin-bottom: 1px
                    &:last-of-type
                        width: 13px
        a.edit
            display: block
            opacity: 0
            height: min-content
            padding: 2px 5px 7px
            width: 35px
            height: 30px
            display: flex
            align-items: center
            justify-content: center
            border-radius: 3px
            &:hover
                background-color: var(--frame-hover)
            .edit-icon
                svg
                    width: 13px
                    height: auto
                    *
                        fill: var(--card-text-color)
</style>