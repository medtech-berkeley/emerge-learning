import React from "react";
import MainDashboardApi from "./containers/MainDashboardApi"
import 'whatwg-fetch';
import {NavBar} from "./components/NavBar";
import history from "./history";
import {Router, Route, Switch} from "react-router-dom";
import UserDashboardApi from "./containers/UserDashboardApi";

export class App extends React.Component {
    render() {
        return (<div>
                    <Router history={history}>
                        <div>
                            <NavBar/>
                            <Route exact={true} path="/" component={MainDashboardApi}/>
                            <Route path="/profile" component={UserDashboardApi}/>
                            <Route path="/quiz/:quizId" component={Quiz}/>
                        </div>
                    </Router>
                </div>);
    }
}