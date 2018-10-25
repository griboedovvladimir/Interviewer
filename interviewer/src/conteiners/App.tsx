import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from "./login/Login-page";
import MainPage from "./main/Main-page";
import * as CONSTANTS from '../constants';
import AdministrationPage from './admistration/Administration-page';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <section>
                    <div id ="app" >Button</div>
                    <Switch>
                        <Route path={CONSTANTS.MAIN_PAGE} component={MainPage}/>
                        <Route path={CONSTANTS.LOGIN_PAGE} component={LoginPage}/>
                        <Route path={CONSTANTS.ADMINISTRATION_PAGE} component={AdministrationPage} />
                        <Route path="/" component={LoginPage}/>
                    </Switch>
                </section>
            </BrowserRouter>
        );
    }
}

export default App;