import React from "react";
import MainDashboardApi from "./containers/MainDashboardApi"
import 'whatwg-fetch';
import {NavBar} from "./components/NavBar";
import history from "./history";

export class App extends React.Component {
    render() {
        return (<div>
                    <NavBar>
                        <Router history={history}>
                            <Route exact={true} path="/">
                                <MainDashboardApi />
                            </Route>
                        </Router>
                    </NavBar>
                </div>);
    }
}