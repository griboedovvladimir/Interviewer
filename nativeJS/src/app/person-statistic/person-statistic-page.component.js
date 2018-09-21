import {StoreService} from "../shared/store.service";
import {chart} from './../chart'

export class PersonStatisticPageComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.interviewerData = new StoreService().getInterviewData();
        this.render();
    }

    render() {
        if (!document.querySelector('interview-el')) {
            this.shadow = document.createElement('div');
            this.shadow.classList.add('statistic');
            this.personId = document.location.hash.split('/')[2];
            fetch('./layouts/person-statistic-page.html').then(resp => {
                resp.text().then(text => {
                    this.shadow.innerHTML = text;
                    this.renderBreadcrumbs(this.personId);
                    this.addEvents();
                    document.body.appendChild(this.shadow);
                    chart();
                });
            })
        }
    }

    renderBreadcrumbs(id) {
        for (let int of this.interviewerData) {
            if (int.id.toString() === this.personId.toString()) {
                this.shadow.querySelector('#nameChip').innerHTML = int.name;
                this.shadow.querySelector('#levelChip').innerHTML = 'D' + int.level;
            }
        }
    }

    addEvents() {
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {
        if (e.target.id === 'interview') {
            document.location.href = `#main/interview/${this.personId}`;
        }

    }

    disconnectedCallback() {

    }
}

