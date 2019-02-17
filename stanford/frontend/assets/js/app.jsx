import React from "react";
import MainDashboardApi from "./containers/MainDashboardApi"
import 'whatwg-fetch';
import NavBarApi from "./containers/NavBarApi";
import history from "./history";
import {Router, Route, Switch} from "react-router-dom";
import UserDashboardApi from "./containers/UserDashboardApi";
import Quiz from "./containers/Quiz";
import Settings from "./containers/SettingsContainer";
import {startTime, changePage} from "./actions/Actions";
import Instructor from "./containers/InstructorContainer"
import {ComingSoon} from "./components/dashboard/ComingSoon.jsx"
// import {DemoPage} from "./components/dashboard/DemoPage.jsx"

 history.listen(
     location => {
        window.store.dispatch(changePage(location.pathname));
    }
 )

export class App extends React.Component {
    componentDidMount(){
      window.store.dispatch(startTime());
      window.store.dispatch(changePage(history.location.pathname));
      window.react_history = history;
    }

    render() {
        return (<div>
                    <Router history={history}>
                        <div>
                        <NavBarApi/>
                            <div className="content-area">
                                <Route exact={true} path="/dashboard" component={window.coming_soon ? ComingSoon : MainDashboardApi}/>
                                <Route path="/dashboard/profile" component={UserDashboardApi}/>
                                <Route path="/dashboard/settings" component={Settings}/>
                                <Route path="/dashboard/instructor" component={Instructor}/>
                                <Route path="/dashboard/quiz/:quizId" component={Quiz}/>
{/*                                <Route path="/dashboard/demo" component={DemoPage}/>
*/}                            </div>
                        </div>
                    </Router>
                </div>);
    }
}
