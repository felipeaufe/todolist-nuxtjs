<template>
    <section>
        <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button> -->
        <b-modal ref="card-modal" id="card-modal" centered>

            <!-- Header -->
            <template v-slot:modal-header="{ }">
                <!-- Title -->
                <div class="input-group">
                    <i class="icon title">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="49.754px" height="49.754px" viewBox="0 0 49.754 49.754" style="enable-background:new 0 0 49.754 49.754;"
                            xml:space="preserve">
                            <path d="M45.362,0.578c-0.507-0.652-1.445-0.77-2.103-0.264c-0.653,0.507-0.772,1.449-0.267,2.104
                                c0.884,1.143,2.5,3.978,1.858,5.448c-0.432,0.99-2.023,1.335-3.284,1.449c-3.193,0.29-5.657,1.471-7.32,3.508
                                c-0.004,0.005-0.008,0.011-0.013,0.016c-1.117-0.582-2.43-0.97-3.483-0.97h-2.956c-1.655,0-3.949,0.949-5.121,2.121L2.639,34.025
                                c-1.172,1.172-1.172,3.07,0,4.242l10.606,10.607c1.172,1.172,3.071,1.172,4.243,0L42,24.362c1.172-1.172,1.172-3.071,0-4.242
                                l-5.416-5.416c0.001-0.001,0.001-0.002,0.002-0.003c1.135-1.378,2.902-2.184,5.253-2.397c3.01-0.274,4.95-1.366,5.766-3.245
                                C49.122,5.565,45.751,1.078,45.362,0.578z M35.166,22.712c-1.434,1.432-3.754,1.432-5.187,0c-1.432-1.433-1.432-3.754,0-5.186
                                c0.682-0.681,1.562-1.027,2.454-1.062c-0.534,2.028-0.363,3.711-0.352,3.82c0.086,0.767,0.733,1.331,1.487,1.331
                                c0.055,0,0.107-0.003,0.162-0.009c0.82-0.088,1.416-0.826,1.332-1.648c-0.002-0.018-0.097-1.049,0.179-2.341
                                C36.587,19.056,36.568,21.308,35.166,22.712z"/>
                        </svg>
                    </i>
                    <input type="text" v-model="title" name="" id="" placeholder="Insira um título para este carão...">
                </div>

                <!-- Close -->
                <i class="icon close" @click="close()">
                    <svg height="329pt" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                </i>
            </template>

            <!-- Body -->
            <template v-slot:default="">
                <div class="input-group">
                    <i class="icon text">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </i>
                    <textarea name="" v-model="description" id="" placeholder="Adicione uma descrição mais detalhada..." cols="30" rows="10"></textarea>
                </div>
            </template>
                
            <!-- Footer -->
            <template v-slot:modal-footer="{}">

                <div>
                    <b-button size="sm" variant="none" class="btn-outline-light remove" @click="removeCard()">
                        <i class="icon trash">
                            <svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/></g></svg>
                        </i>
                    </b-button>
                </div>
                <div>
                    <b-button size="sm" variant="danger" class="btn-light" @click="close()">
                        Sair
                    </b-button>

                    <b-button size="sm" variant="success" @click="save()" :disabled="disabled">
                        Salvar
                    </b-button>
                </div>

            </template>
        </b-modal>
    </section>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        data ()  {
            return {
                title: "",
                description: "",
                frame_id: "",
                open: true,
                disabled: true,
                id: null,
            }
        },
        computed: {
            ...mapState("card", [
                "version",
            ]),
            ...mapGetters("card", [
                "getCard",
            ]),
        },
        watch: {
            /**
             * Ensures that values are always consulted.
             */
            version () {
                this.title        = this.getCard.title;
                this.description  = this.getCard.description;
                this.frame_id     = this.getCard.frame_id;
                this.open         = this.getCard.open;
                this.id           = this.getCard.id;
            },
            title (newValue, oldValue) {
                this.disabled = this.enableButton(this.getCard.title, newValue);
            },
            description (newValue, oldValue ) {
                this.disabled = this.enableButton(this.getCard.description, newValue);
            },
        },
        methods: {
            close () {
                // Reset after fade-out;
                setTimeout(()=>{
                    this.reset();
                },200);

                this.$refs['card-modal'].hide()
            },
            async save () {
                //  Update card
                
                if(this.id){
                    let res = await this.$store.dispatch('card/updateCard', {
                        title: this.title,
                        description: this.description,
                        open: this.open,
                        id: this.id,
                    });
                }
                
                // New card
                else{
                    this.$store.dispatch('card/addCard', {
                        title: this.title,
                        description: this.description,
                        frame_id: this.frame_id,
                        open: this.open
                    });
                }
                
                this.close();
            },
            async removeCard (){
                
                let messages = {
                    title: 'Apagar cartão',
                    description: 'Deseja realmente apagar este cartão?',
                    btnYes: 'Sim',
                    btnNo: 'Agora não'
                };

                if(await this.$modalConfirm(messages)){
                    let res = await this.$store.dispatch('card/removeCard', {
                        id: this.id,
                        frame_id: this.frame_id,
                    });
                    if(res){
                        this.close();
                        this.reset();
                    }
                }
            },
            reset () {
                this.title = "";
                this.description = "";
                this.frame_id = "";
                this.open = "";
                this.id = "";
            },
            enableButton(newValue, defaultValue){
                if(defaultValue === newValue){
                    return true;
                }
                
                return false;
            }
        }
    }
</script>

<style lang="sass">
    #card-modal
        padding: 10px
        input
            font-weight: 600
            font-size: 18px
        input,
        textarea
            width: 100%
            height: 40px
            border: none

        textarea
            min-height: 81px

        .input-group
            display: grid
            grid-template-columns: 25px calc(100% - 40px)
        i.icon
            display: flex
            align-items: center
            justify-content: flex-start
            &.title
                svg
                    width: 20px
                    height: auto
                    path
                        fill: #585858
            &.text
                align-items: flex-start
                padding-top: 9px
                ul
                    margin: 0
                    width: 16px
                    height: 20px
                    padding: 0
                    list-style-type: none
                    li
                        background-color: #585858
                        height: 2px
                        margin-bottom: 1px
                        &:last-of-type
                            width: 13px
        .modal-header
            align-items: center
            i.icon.close
                cursor: pointer
                svg
                    width: 14px
                    height: auto
        .modal-footer
            justify-content: space-between
            button
                padding: 8px 20px
                &.btn-success
                    margin-left: 10px
                &.remove
                    padding-left: 15px
                    padding-right: 15px
                    border: none
                    &:hover
                        .icon.trash svg path
                            fill: black
                    .icon 
                        &.trash
                            svg
                                width: 20px
                                height: auto
                                path
                                    fill: gray
</style>