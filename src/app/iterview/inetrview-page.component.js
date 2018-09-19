import {INTERVIEW_DATA} from "../shared/INTERVIEW_DATA";

export class InterviwPageComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
    }

    render() {
        if(!document.querySelector('interview-el')) {
            this.shadow = this.attachShadow({mode: 'open'});
            this.personId = '';
            fetch('./layouts/interview-page.html').then(resp => {
                resp.text().then(text => {
                    this.shadow.innerHTML = `<link rel="stylesheet" type="text/css" href = 'style.css'>` +text;
                    this.renderBreadcrumbs(this.personId);
                    this.addEvents();
                });
            })
        }
    }

    renderBreadcrumbs(id){
        for(let int of INTERVIEW_DATA){
            if(int.id.toString() === id.toString()){
                this.shadow.querySelector('#nameChip').innerHTML = int.name;
                this.shadow.querySelector('#levelChip').innerHTML = 'D' + int.level;
            }
        }
}

    addEvents() {

    }

    handleEvent(e) {


    }


    attributeChangedCallback(name, oldValue, newValue) {
this.personId = newValue;
    }

    static get observedAttributes() {
        return ['person-id'];
    }

    disconnectedCallback() {

    }
}

