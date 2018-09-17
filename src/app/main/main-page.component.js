import {INTERVIEW_DATA} from "./INTERVIEW_DATA";
import {ModalWindowComponent} from "./modal-window/modal-window.component";

export class MainPageComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = '';
        this.render();
        this.interviewData = INTERVIEW_DATA;
    }

    render() {
        document.body.innerHTML = '';
        this.shadow = this.attachShadow({mode: 'open'});
        fetch('./layouts/main-page.html').then(resp => {
            resp.text().then(text => {
                this.shadow.innerHTML = text + `<link rel="stylesheet" type="text/css" href = 'style.css'>`;
                this.tableRender(this.interviewData);
                this.addEvents();
                customElements.define('modal-el', ModalWindowComponent);
                this.modal = document.createElement('modal-el');
                document.body.appendChild(this.modal);
            });
        })
    }

    addEvents() {
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {
        if (e.target.id === 'addBtn') {
            this.openModal();
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
                <i id="create" class="material-icons person-actions">create</i>
                <i id="delete" class="material-icons person-actions">delete</i></td>`;
            fragment.appendChild(tr);
        }
        this.shadow.querySelector('tbody').appendChild(fragment);
    }

    openModal() {
    }

    disconnectedCallback() {

    }
}

