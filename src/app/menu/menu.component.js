
export class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
    }

    render() {
        if(!document.querySelector('menu-el')) {
            this.shadow = this.attachShadow({mode: 'open'});
            fetch('./layouts/menu.html').then(resp => {
                resp.text().then(text => {
                    this.shadow.innerHTML = `<link rel="stylesheet" type="text/css" href = 'style.css'>` +text;
                    this.addEvents();
                    this.locate();
                });
            })
        }
    }

    addEvents() {
        this.shadow.addEventListener('click', this);

    }

    handleEvent(e) {
        if(e.target.id === 'logout'){
            localStorage.clear();
            document.location.href = "#login";
        }
        else if(e.target.id === 'main'){
            document.location.href = "#main";
        }
        else if(e.target.id === 'interview'){

        }
        else if(e.target.id === 'statistic'){

        }

    }

    locate() {
        if(new RegExp('#main\/?([\\w\\s]+)?').test(window.location.hash)){
            this.shadow.querySelector('#main').style.color=' #00857c';
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {

    }

    static get observedAttributes() {
        return ['visibility'];
    }

    disconnectedCallback() {

    }
}

