import * as CONSTANTS from '../constants'

export class APICallService{
    public getInterview(){
        return  fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH,{
            method:'GET'}).then(req => req.json());
    }
    public removeInterview(id:string){
        return  fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH + '/' + id,{
            method:'DELETE'});
    }
    public addInterview(interview:any){
        return  fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(interview)})
    }
}