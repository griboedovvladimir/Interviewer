import {StoreService} from "../../shared/store.service";

export class ModalWindowComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
        this.store = new StoreService();
    }

    render() {
        this.shadow = this.attachShadow({mode: 'open'});
        fetch('style.css').then(resp => {resp.text().then(text => {
            this.shadow.innerHTML = this.shadow.innerHTML + `<style>${text}</style>`;
            fetch('./layouts/main-modal-window.html').then(resp => {
                resp.text().then(text => {
                    this.shadow.innerHTML = this.shadow.innerHTML + text;
                    this.addEvents();
                });
            })
        })})
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
            this.store.setInterviewData(interviewModel);

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
            this.shadow.querySelector('.modal').classList.remove('main-modal-hidden');
            this.shadow.querySelector('.modal').classList.add('main-modal-active');
        }
        else if (newValue === 'hidden' && this.shadow.querySelector('.modal')) {
            this.shadow.querySelector('.modal').classList.remove('main-modal-active');
            this.shadow.querySelector('.modal').classList.add('main-modal-hidden');
        }
    }

    static get observedAttributes() {
        return ['visibility'];
    }

    disconnectedCallback() {
    }
}

