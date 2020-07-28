<template>
    <div id="layout" :data-theme="getTheme || theme">
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
        mounted(){
            // Force update on DOM
            document.querySelector("#layout").setAttribute("data-theme", this.getTheme)
        }
    }
</script>
<style lang="sass">
    @import '../assets/sass/main'
    #layout
        display: grid        
        grid-template: 	"sidebar main"
        grid-template-columns: max-content

        main
            grid-area: main
</style>
