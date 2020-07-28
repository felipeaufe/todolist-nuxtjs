<template>
    <div class="card" @click="editCard">
        <div class="info">
            <p class="todo-title">{{task.title}}</p>
            <div class="todo-footer">
                <ul v-if="task.description">
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
            task: {
                type: Object,
                default: () => ({})
            },
        },
        computed: {
            badgeColor() {
                const mappings = {
                    Design: "purple",
                    "Feature Request": "teal",
                    Backend: "blue",
                    QA: "green",
                    default: "teal"
                };
                return mappings[this.task.type] || mappings.default;
            }
        },
        methods: {
            async editCard() {
                await this.$store.commit('card/editCard', this.task);
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
        // margin: 0 10px 10px
        padding: 15px
        cursor: pointer
        display: flex
        flex-direction: row
        &:hover
            a.edit
                opacity: 1
        p.todo-title
            font-size: 15px
            line-height: 1.2
            margin-bottom: 0
        .todo-footer
            ul
                margin: 0
                width: 16px
                height: 20px
                padding: 0
                list-style-type: none
                li
                    background-color: var(--frame-hover)
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
</style>