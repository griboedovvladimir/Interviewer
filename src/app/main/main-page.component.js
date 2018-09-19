import {INTERVIEW_DATA} from "../shared/INTERVIEW_DATA";
import {ModalWindowComponent} from "./modal-window/modal-window.component";
import {MenuComponent} from "../menu/menu.component";

const MODAL = document.createElement('modal-el');
customElements.define('modal-el', ModalWindowComponent);
customElements.define('menu-el', MenuComponent);


export class MainPageComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
        this.interviewData = INTERVIEW_DATA;
    }

    render() {
        if (!document.querySelector('main-el')) {
            this.shadow = this.attachShadow({mode: 'open'});
            fetch('./layouts/main-page.html').then(resp => {
                resp.text().then(text => {
                    this.shadow.innerHTML = `<link rel="stylesheet" type="text/css" href = 'style.css'>` + text;
                    this.tableRender(this.interviewData);
                    this.addEvents();
                    this.modal = MODAL;
                    this.modal.setAttribute('visibility', 'hidden');
                    document.body.appendChild(this.modal);
                });
            })
        }
    }

    addEvents() {
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {
        if (e.target.id === 'addBtn') {
            this.openModal();
        }
        else if (e.target.id === 'edit') {
            document.location.href = `#main/interview/${e.target.parentNode.id}`
        }
        else if (e.target.id === 'view') {
            document.location.href = `#main/statistic/${e.target.parentNode.id}`
        }
        else if (e.target.id === 'delete') {
            e.target.parentNode.parentNode.remove();
            INTERVIEW_DATA.forEach((el, i, arr) => {
                if (el.id.toString() === e.target.parentNode.id) {
                    INTERVIEW_DATA.splice(i, 1)
                }
            });
        }
    }

    tableRender(data) {
        let fragment = document.createDocumentFragment();
        for (let interview of data) {
            let tr = document.createElement('tr');
            for (let i in interview) {
                if (i !== 'id') {
                    let td = document.createElement('td');
                    if (i === 'name') {
                        td.classList.add('mdl-data-table__cell--non-numeric')
                    }
                    td.innerHTML = interview[i];
                    tr.appendChild(td);
                }
            }
            tr.innerHTML = tr.innerHTML + `<td id="${interview.id}"><i id="view" class="material-icons person-actions">visibility</i>
                <i id="edit" class="material-icons person-actions">create</i>
                <i id="delete" class="material-icons person-actions">delete</i></td>`;
            fragment.appendChild(tr);
        }
        this.shadow.querySelector('tbody').appendChild(fragment);
    }

    openModal() {
        let that = this;
        let overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
        let removing = () => {
            overlay.removeEventListener('click', removing);
            overlay.remove();
            that.modal.setAttribute('visibility', 'hidden');
        };
        overlay.addEventListener('click', removing);
        this.modal.setAttribute('visibility', 'visible');
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this);
    }
}

