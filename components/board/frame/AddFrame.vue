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
        background-color: var(--frame-bg-dark)
        border-radius: 6px
        padding: 10px 5fdpx
        margin: 0 8px
        padding: 0 13px
        width: 280px
        display: flex
        flex-direction: column
        align-items: flex-start
        transition: background-color 0.2s ease-in-out
        &:focus-within
            background-color: var(--frame-bg)
        input
            border: none
            font-weight: 700
            width: 100%
            padding: 5px
            margin: 10px -5px
            color: var(--frame-title)
            background: none
            cursor: pointer
            &:focus
                cursor: auto
                background: white
                ~ button
                    display: block
            &::-webkit-input-placeholder
                color: var(--frame-title)
            &:-moz-placeholder
                color: var(--frame-title)
            &::-moz-placeholder
                color: var(--frame-title)
            &:-ms-input-placeholder
                color: var(--frame-title)
            &::-ms-input-placeholder
                color: var(--frame-title)
            &::placeholder
                color: var(--frame-title)
        button
            display: none
            margin-bottom: 15px
            &:hover
                display: block

</style>