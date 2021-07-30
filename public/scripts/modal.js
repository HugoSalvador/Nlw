export default function Modal() {

    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)


    function open() {
    //Funcionalidade para abrir o modal    
        modalWrapper.classList.add("active")
    }


    function close(){
    //Funcionalidade para remover a classe active da modal
    modalWrapper.classList.remove("active")
    }

    return {
        open,
        close
    }
}