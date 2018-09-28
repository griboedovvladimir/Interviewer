import * as CONSTANTS from '../constants'

export class APICallService{
    public getInterview(){
        return  fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH,{
            method:'GET'}).then(req => req.json());
    }
}