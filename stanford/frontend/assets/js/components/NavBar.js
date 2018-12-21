import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import {Link} from "react-router-dom";
// TODO: add Link

export class NavBar extends React.Component {
    getClassListNavItem(pathname) {
      console.log(this.props.pathname);
      if (pathname === this.props.pathname) {
        return 'nav-item active';
      } else {
        return 'nav-item';
      }
    }

    render() {
        return (
          <div>
          <hr className="top-stripe"/>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" style={{"float": "left"}} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className={this.getClassListNavItem('/dashboard/')}>
              <a className="nav-link" href="/dashboard">Dashboard<span className="sr-only"></span></a>
            </li>
            <li className={this.getClassListNavItem('/dashboard/profile/')}>
              <a className="nav-link" href="/dashboard/profile">Profile</a>
            </li>
            <li className={this.getClassListNavItem('/dashboard/settings/')}>
              <a className="nav-link" href="/dashboard/settings">Settings</a>
            </li>
            <li className={this.getClassListNavItem('/dashboard/instructor/')}>
              <a className="nav-link" href="/dashboard/instructor/">Instructor</a>
            </li>            
              </ul>
          </div>
          <form action="/logout" className="navbar-right form-inline my-2 my-lg-0">
              <button type="submit" className="btn logout-btn btn-outline-success">Log Out</button>
          </form>
        </nav>
        </div>);
    }
}