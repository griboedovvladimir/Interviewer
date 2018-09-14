import '../styles/style.less';
import {Router} from './router';
import {LoginPage} from "./login/login-page";
import {LoginPageComonent} from "./login/login-page-component";

// new LoginPage().render();

customElements.define('my-el', LoginPageComonent);
document.body.appendChild(document.createElement('my-el'));

