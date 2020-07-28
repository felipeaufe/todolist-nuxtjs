<template>
    <article id="sidebar">

        <section>
            <Logo/>
            <div class="menu">
                <ul>
                    <Theme/>
                </ul>
            </div>
        </section>

        <section>
            <a class="link profile" target="_blank" :href="profile.link" :alt="profile.alt">
                <i class="icon">
                    <svg x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <path style="fill:#FF3636;" d="M376.951,28.507h-0.899c-66.027,0-102.942,48.32-120.049,81.033
                            c-17.408-32.714-54.022-81.033-120.049-81.033h-1.199C63.324,29.108,3.792,90.032,0.191,167.164
                            c-4.503,94.538,70.937,158.164,183.782,254.204c19.509,16.807,40.218,34.515,62.126,53.423l9.905,8.703l9.905-8.703
                            c21.608-18.908,42.617-36.616,62.126-53.423c112.844-96.04,188.278-159.666,183.775-254.204
                            C508.206,90.031,448.381,29.107,376.951,28.507z"/>
                        <path style="fill:#F40000;" d="M511.808,167.164c4.503,94.538-70.93,158.164-183.775,254.204
                            c-19.509,16.807-40.518,34.515-62.126,53.423l-9.905,8.703V109.54c17.107-32.714,54.022-81.033,120.049-81.033h0.899
                            C448.381,29.107,508.206,90.031,511.808,167.164z"/>
                    </svg>
                </i>
            </a>
        </section>

    </article>
</template>

<script>
    import Logo from "../components/Logo";

    export default {
        components: {
            Logo
        },
        data () {
            return {
                profile: {
                    link: 'https://github.com/felipeaufe',
                    alt: 'Felipe - Github profile'
                }
            }
        }
    }
</script>

<style lang="sass">
    #sidebar
        grid-area: sidebar
        background-color: var(--sidebar-bg)
        width: 60px
        height: 100vh
        display: flex
        flex-direction: column
        justify-content: space-between
        section
            &:first-of-type
                padding-top: 8px
            .menu
                padding: 15px 0
                > ul
                    margin-bottom: 0
                    padding: 0
                    list-style-type: none
                    > li
                        height: 60px
                        > a
                            display: block
                            height: 100%
                            width: 100%
                            padding: 16px
                            &:hover
                                background-color: #ffffff0d
                            svg
                                width: 100%
                                height: auto

        a.link
            display: grid
            &.profile
                background-color: #ffffff0d
        i.icon
            padding: 13px
</style>