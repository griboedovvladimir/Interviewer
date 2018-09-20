import {StoreService} from "../shared/store.service";

export class InterviwPageComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
        this.interviewerData = new StoreService().getInterviewData();
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
        for(let int of this.interviewerData){
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

