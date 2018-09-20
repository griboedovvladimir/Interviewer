import {INTERVIEW_DATA} from "../shared/INTERVIEW_DATA";
import {material} from '../material';

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
            fetch('style.css').then(resp => {resp.text().then(text => {
                this.shadow.innerHTML = this.shadow.innerHTML + `<style>${text}</style>`;
                fetch('./layouts/interview-page.html').then(resp => {
                    resp.text().then(text => {
                        this.shadow.innerHTML = this.shadow.innerHTML + text;
                        this.renderBreadcrumbs(this.personId);
                        this.addEvents();
                    });
                })
            })})
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
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {

        if (e.target.id === 'nameChip') {
            document.location.href = `#main/statistic/${this.personId}`;
        }
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

