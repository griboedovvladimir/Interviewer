import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LoginPage} from "./login/Login-page";


class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <section>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/" component={LoginPage}/>
                    </Switch>
                </section>
            </BrowserRouter>
        );
    }
}

export default App;