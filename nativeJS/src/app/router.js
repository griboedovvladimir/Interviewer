import {LoginPageComonent} from "./login/login-page.component";
import {MainPageComponent} from "./main/main-page.component";
import {InterviwPageComponent} from "./iterview/inetrview-page.component";
import {PersonStatisticPageComponent} from "./person-statistic/person-statistic-page.component";

export class Router {
    constructor() {
        window.addEventListener('hashchange', this.rout, false);
        window.addEventListener('load', () => {
            this.rout();
        }, false);
        customElements.define('main-el', MainPageComponent);
        customElements.define('login-el', LoginPageComonent);
        customElements.define('interview-el', InterviwPageComponent);
        customElements.define('person-statistic-el', PersonStatisticPageComponent);
    }

    rout() {
        switch (location.hash) {
            case '':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
            case '#main':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('menu-el'));
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
            case `#main/interview/${document.location.hash.split('/')[2]}`:
                if(document.querySelector('.statistic'))document.querySelector('.statistic').remove();
                if (!document.querySelector('menu-el')) {
                    document.body.appendChild(document.createElement('menu-el'));
                }
                if (document.querySelector('main-el')) {
                    document.querySelector('main-el').remove();
                    document.querySelector('modal-el').remove();
                }
                let interview = document.createElement('interview-el');
                interview.setAttribute('person-id', document.location.hash.split('/')[2]);
                document.body.appendChild(interview);
                break;
            case `#main/statistic/${document.location.hash.split('/')[2]}`:
                if (!document.querySelector('menu-el')) {
                    document.body.appendChild(document.createElement('menu-el'));
                }
                if (document.querySelector('main-el')) {
                    document.querySelector('main-el').remove();
                    document.querySelector('modal-el').remove();
                }
                if(document.querySelector('.statistic'))document.querySelector('.statistic').remove();
                if(document.querySelector('interview-el'))document.querySelector('interview-el').remove();
                let stat = new PersonStatisticPageComponent;
                break;
            case '#login':
                if (localStorage.getItem('INTERVIEWER_TOKEN')) {
                    document.location.href = "#main";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('main-el'));
                }
                else {
                    document.location.href = "#login";
                    document.body.innerHTML = '';
                    document.body.appendChild(document.createElement('login-el'));
                }
                break;
        }
    }
}


