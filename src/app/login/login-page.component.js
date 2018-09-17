import {guid} from "../helpers/guid";

const USER_DATA = [
    {
        name: "j.doe",
        password: "123456789",
        rights: "user",
        token: ""
    },
    {
        name: "m.smith",
        password: "123456789",
        rights: "admin",
        token: ""
    }
];
const LS_KEY = 'INTERVIEWER_TOKEN';

export class LoginPageComonent extends HTMLElement {
    constructor() {
        super();
        this.usersData = USER_DATA;
        this.shadow = '';
        this.render();
    }

    render() {
        document.body.innerHTML = '';
        this.shadow = this.attachShadow({mode: 'open'});
        fetch('./layouts/login-page.html').then(resp => {
            resp.text().then(text => {
                let styles = `<link rel="stylesheet" type="text/css" href = 'style.css'>`;
                this.shadow.innerHTML = text + styles;
                this.addEvents();
            });
        })
    }

    addEvents() {
        this.shadow.addEventListener('click', this);
    }

    handleEvent(e) {
        if (e.target.type === 'submit') {
            if (this.formCheck()) {
                document.location.href = "#main";
                this.remove();
            }
        }
    }

    formCheck() {
        let formElems = this.shadow.querySelector('form').elements;
        let userModel = {
            name: '',
            password: ''
        };
        let check = false;

        for (let i = 0; i < formElems.length; i++) {
            if (formElems[i].id === 'loginName') {
                userModel.name = formElems[i].value;
            }
            else if (formElems[i].id === 'loginPassword') {
                userModel.password = formElems[i].value
            }
        }

        this.usersData.forEach((i) => {
            if (i.name === userModel.name && i.password === userModel.password) {
                localStorage.setItem(LS_KEY,guid());
                check = true;
            }
        });
        return check;
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click',this);
    }
}

