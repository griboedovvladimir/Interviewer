import {LoginPageComonent} from "./login/login-page.component";
import {MainPageComponent} from "./main/main-page.component";

export class Router {
    constructor() {
        window.addEventListener('hashchange', this.rout, false);
        window.addEventListener('load', () => {
          this.wrapper =  document.body.innerHTML = '';
            this.rout();
        }, false);
        customElements.define('main-el', MainPageComponent);
        customElements.define('login-el', LoginPageComonent);
    }

    rout() {
        switch (location.hash) {
            case '':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
            case '#main':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
            case `#main/${document.location.hash.split('/')[1]}`:

                break;
            case '#login':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    this.wrapper='';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
        }
    }
}


