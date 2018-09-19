import {INTERVIEW_DATA} from "../../shared/INTERVIEW_DATA";
import {MainPageComponent} from "../main-page.component";

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
                this.shadow.innerHTML = `<link rel="stylesheet" type="text/css" href = 'style.css'>` +text;
                this.addEvents();
            });
        })
    }

    addEvents() {
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {
        if (e.target.type === 'submit' && this.formChecker()) {
            let interviewModel =
                {
                    id: Date.now(),
                    name: '',
                    specialization: '',
                    level: 0,
                    date: new Date().toLocaleDateString('ru-RU', {
                        day : 'numeric',
                        month : 'numeric',
                        year : 'numeric'
                    }).split(' ').join('.'),
                    status: 'ok',
                };

            for (let el of this.shadow.querySelector('form').elements){
                if(el.id === 'interviewName'){
                    interviewModel.name = el.value;
                }
                else if(el.id === 'level'){
                    interviewModel.level = el.value;
                }
                else if(el.id === 'specialization'){
                    interviewModel.specialization = el.value;
                }
            }
            this.shadow.querySelector('form').reset();
            INTERVIEW_DATA.unshift(interviewModel);

            document.querySelector('main-el').remove();
            document.getElementById('overlay').remove();
            document.body.appendChild(document.createElement('main-el'));
        }
    }

    formChecker() {
        for (let el of this.shadow.querySelector('form').elements) {
            if (el.type !== 'submit' && !this.shadow.querySelector('form').checkValidity()) {
                return false;
            }
        }
        return true;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === 'visible') {
            this.shadow.querySelector('.modal').classList.remove('modal-hidden');
            this.shadow.querySelector('.modal').classList.add('modal-active');
        }
        else if (newValue === 'hidden' && this.shadow.querySelector('.modal')) {
            this.shadow.querySelector('.modal').classList.remove('modal-active');
            this.shadow.querySelector('.modal').classList.add('modal-hidden');
        }
    }

    static get observedAttributes() {
        return ['visibility'];
    }

    disconnectedCallback() {
    }
}

