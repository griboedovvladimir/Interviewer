import * as CONSTANTS from '../constants'

export class CheckLoginService{
    constructor(){

    }
    public checkUser(name: string ,pass: string){
        let body = {name,pass};
        return fetch(CONSTANTS.API_HOST + CONSTANTS.LOGGED_API_PATH,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)})
    }
}