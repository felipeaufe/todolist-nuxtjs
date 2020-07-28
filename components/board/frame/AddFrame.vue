<template>
    <div class="add-frame">
        <input type="text" v-model="title" placeholder="Adicionar nova lista"/>
        <button class="btn btn-success" @click="addFrame">Adicionar</button>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                title: ""
            }
        },
        computed: {
            ...mapGetters("frame", [
                "getLength",
            ]),
        },
        methods: {
            addFrame () {
                if(!this.title.length){
                    return;
                }

                let length = this.getLength;

                this.$store.dispatch('frame/addFrame', {
                    title: this.title,
                    order: length
                });

                this.title = "";
            },
        }
    }
</script>

<style lang="sass">
    .add-frame
        background-color: var(--frame-bg)
        border-radius: 6px
        padding: 10px 5fdpx
        margin: 0 8px
        padding: 0 13px 13px
        width: 280px
        display: flex
        flex-direction: column
        align-items: flex-start
        input
            border: none
            font-weight: 700
            padding: 5px
            margin: 10px -5px
            color: var(--frame-title)
            background: none
            &:focus
                background: white
                ~ button
                    display: block
        button
            display: none
            &:hover
                display: block

</style>