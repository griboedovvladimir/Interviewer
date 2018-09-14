
export class LoginPage{
    constructor(){

    }
    render(){
        fetch('./layouts/login-page.html').then(resp=>{
            resp.text().then(text=>{
                document.body.innerHTML = text;
            });
        })
    }
}