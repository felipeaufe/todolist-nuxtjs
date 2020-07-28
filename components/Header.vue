<template>
    <b-navbar id="header" toggleable="sm">
    <!-- <b-navbar id="header" toggleable="sm" type="light" variant="light"> -->
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>Ootz</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
            <b-nav-text>- Teste de habilidade</b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {}
</script>

<style lang="sass">
    #header
        background-color: var(--nav-bg)
        .navbar-brand,
        .navbar-text
            color: var(--nav-color)
</style>