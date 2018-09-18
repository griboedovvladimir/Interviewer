
export class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
    }

    render() {
        this.shadow = this.attachShadow({mode: 'open'});
        fetch('./layouts/menu.html').then(resp => {
            resp.text().then(text => {
                this.shadow.innerHTML = text + `<link rel="stylesheet" type="text/css" href = 'style.css'>`;
                this.addEvents();
                this.locate();
            });
        })
    }

    addEvents() {
        this.shadow.addEventListener('click', this);

    }

    handleEvent(e) {
        if(e.target.id === 'logout'){
            localStorage.clear();
            document.location.href = "#login";
        }
    }

    locate() {
        if(window.location.hash === '#main'){
            this.shadow.querySelector('#main').style.color=' #00857c';
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {

    }

    static get observedAttributes() {
        return ['visibility'];
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this);
    }
}

