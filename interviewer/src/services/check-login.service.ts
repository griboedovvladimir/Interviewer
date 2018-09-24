
export class CheckLoginService{
    constructor(){

    }
    public checkUser(name: string ,pass: string){
        let body = {name,pass};
        return fetch('http://localhost:4000/authorization',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)})
    }
}