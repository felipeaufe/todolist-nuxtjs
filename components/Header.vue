<template>
    <b-navbar id="header" toggleable="sm">
    <!-- <b-navbar id="header" toggleable="sm" type="light" variant="light"> -->
        <b-navbar-toggle target="nav-text-collapse" @click="openSidebar"></b-navbar-toggle>

        <b-navbar-brand>
            <Logo/>
            <p>Ootz - Teste de habilidade</p>
        </b-navbar-brand>
    </b-navbar>
</template>

<script>
    import Logo from './Logo';

    export default {
        components: {
            Logo,
        },
        methods: {
            // Just work in mobile
            // Also can be made with Vuex
            openSidebar () {
                let sidebar = document.querySelector("#sidebar");
                if(sidebar){
                    if(sidebar.classList.contains("opened"))
                        sidebar.classList.remove("opened");
                    else
                        sidebar.classList.add("opened");
                }
            }
        }
    }
</script>

<style lang="sass">
    #header
        background-color: var(--nav-bg)
        @media (min-width: 320px) and (max-width: 767px)
            display: flex
            flex-direction: row
            flex-wrap: nowrap
            height: 57px
        #logo
            display: none
            width: 30px
            padding: 0
            height: auto
            margin-right: 15px
            @media (min-width: 320px) and (max-width: 767px)
                display: block
        .navbar-brand
            display: flex
            align-items: center
            color: var(--nav-color)
            p
                margin-bottom: 0
            @media (min-width: 320px) and (max-width: 767px)
                margin-right: auto
                margin-left: 15px
                p
                    margin-bottom: 0
                    white-space: pre-wrap
                    line-height: 1
        .navbar-text
            color: var(--nav-color)
</style>