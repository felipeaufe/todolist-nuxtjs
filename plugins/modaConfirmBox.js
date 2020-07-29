export default (context, inject) => {

    /**
     * Modal to style the window.confirm
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {string} btnYes 
     * @param {string} btnNo 
     */
    function confirm (title, description, btnYes, btnNo) {
        if(typeof arguments[0] === "object"){
            description = arguments[0].description;
            btnYes = arguments[0].btnYes;
            btnNo = arguments[0].btnNo;
            title = arguments[0].title;
        }

        return this.$bvModal.msgBoxConfirm(description || 'Deseja continuar?', {
            title: title || 'Confirmação',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: btnYes || 'Sim',
            cancelTitle: btnNo || 'Não',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          });
    }
    inject('modalConfirm', confirm);
  }