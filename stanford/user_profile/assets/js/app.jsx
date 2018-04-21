import React from "react";
import UserDashboard from "./containers/UserDashboard"
import 'whatwg-fetch';

export class App extends React.Component {
    render() {
        return <UserDashboard />;
    }
}
