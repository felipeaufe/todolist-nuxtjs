<template>
    <section id="sidebar-logo">
        <img :src="logoImage" alt="Logo">
    </section>
</template>

<script>
    import ImgLogo from "assets/img/logo-light.png";

    export default {
        data(){
            return {
                logoImage: ImgLogo
            }
        }
    }
</script>

<style lang="sass">
    #sidebar-logo
        padding: 13px
        img
            width: 100%
</style>
