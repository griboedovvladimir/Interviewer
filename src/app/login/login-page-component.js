export class LoginPageComonent extends HTMLElement{
    constructor() {
        super();
       let shadow = this.attachShadow({mode: 'open'});
       let wrapper = document.createElement('div');
        fetch('./layouts/login-page.html').then(resp=>{
            resp.text().then(text=>{
                wrapper.innerHTML = text;
                shadow.appendChild(wrapper);
            });
        })
    }
}

