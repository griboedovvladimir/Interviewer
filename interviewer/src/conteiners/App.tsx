import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from "./login/Login-page";
import MainPage from "./main/Main-page";
import * as CONSTANTS from '../constants';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <section>
                    <Switch>
                        <Route path={CONSTANTS.MAIN_PAGE} component={MainPage}/>
                        <Route path={CONSTANTS.LOGIN_PAGE} component={LoginPage}/>
                        <Route path="/" component={LoginPage}/>
                    </Switch>
                </section>
            </BrowserRouter>
        );
    }
}

export default App;