import React from "react";
import MainDashboardApi from "./containers/MainDashboardApi"
import 'whatwg-fetch';
import {NavBar} from "./components/NavBar";
import history from "./history";
import {Router, Route, Switch} from "react-router-dom";
import UserDashboardApi from "./containers/UserDashboardApi";
import Quiz from "./containers/Quiz";
import Settings from "./containers/SettingsContainer";
import {startTime} from "./actions/Actions";
import Instructor from "./containers/InstructorContainer"

export class App extends React.Component {
    componentDidMount(){
      window.store.dispatch(startTime())
    }

    render() {
        return (<div>
                    <Router history={history}>
                        <div>
                        <NavBar pathname={history.location.pathname}/>
                            <div className="content-area">
                                <Route exact={true} path="/dashboard" component={MainDashboardApi}/>
                                <Route path="/dashboard/profile" component={UserDashboardApi}/>
                                <Route path="/dashboard/settings" component={Settings}/>
                                <Route path="/dashboard/instructor" component={Instructor}/>
                                <Route path="/dashboard/quiz/:quizId" component={Quiz}/>
                            </div>
                        </div>
                    </Router>
                </div>);
    }
}
