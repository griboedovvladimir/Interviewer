
export class ModalWindowComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
    }

    render() {
        this.shadow = this.attachShadow({mode: 'open'});
        fetch('./layouts/modal-window.html').then(resp => {
            resp.text().then(text => {
                this.shadow.innerHTML = text + `<link rel="stylesheet" type="text/css" href = 'style.css'>`;
                this.addEvents();
            });
        })
    }

    addEvents() {

    }

    handleEvent(e) {


    }

    disconnectedCallback() {

    }
}

