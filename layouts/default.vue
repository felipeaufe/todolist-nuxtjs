<template>
    <!-- <div id="layout" :data-theme="getTheme || theme"> -->
    <div id="layout">
        <main>
            <Header />
            <Nuxt />
        </main>
        <Sidebar />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                theme: ''
            }
        },
        beforeCreate() {
            this.$store.commit('theme/initialise');
        },
        computed: {
            ...mapGetters("theme", [
                "getTheme",
            ])
        },
        watch: {
            getTheme() {
                document.body.setAttribute("data-theme", this.getTheme)
            }
        },
        mounted(){
            // Force update on DOM
            document.body.setAttribute("data-theme", this.getTheme)
        }
    }
</script>
<style lang="sass">
    @import '../assets/sass/main'
    #layout
        display: grid        
        grid-template: 	"sidebar main"
        grid-template-columns: max-content
        @media (min-width: 320px) and (max-width: 767px)
            position: relative

        main
            grid-area: main
            width: calc(100vw - 56px)
            @media (min-width: 320px) and (max-width: 767px)
                width: 100vw
</style>
