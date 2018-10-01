import * as CONSTANTS from '../constants';
let singletonInstance:any = null;

export class AuthorizationService{
    public authorization = false;
    constructor(){
        if (!singletonInstance) {
            singletonInstance = this;
        }
        return singletonInstance;
    }
    public authorizate(token:string){
        this.authorization = true;
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY,token)
    }
    public checkAuthorization(){
        return !!(this.authorization || localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY));
    }
    public logout(){
        if(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY)){
            localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY)
        }
        this.authorization = false;
    }

}