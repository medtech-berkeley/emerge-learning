import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// TODO: add Link

export class NavBar extends React.Component {
    componentWillMount() {
      this.props.refreshStudent()
    }

    getClassListNavItem(pathname) {
      // console.log(this.props.pathname);
      if (pathname === this.props.page) {
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
            <li className={this.getClassListNavItem('dashboard')}>
              <Link className="nav-link" to="/dashboard" onClick={() => this.props.changePage('dashboard')}>Dashboard<span className="sr-only"></span></Link>
            </li>
            <li className={this.getClassListNavItem('profile')}>
            
              <Link className="nav-link" to="/dashboard/profile" onClick={() => this.props.changePage('profile')}>Profile</Link>
            </li>
            <li className={this.getClassListNavItem('settings')}>
              <Link className="nav-link" to="/dashboard/settings" onClick={() => this.props.changePage('settings')}>Settings</Link>
            </li>
            {this.props.user.profile_type != 'STUD' ? 
              <li className={this.getClassListNavItem('instructor')}>
                <Link className="nav-link" to="/dashboard/instructor/" onClick={() => this.props.changePage('instructor')}>Instructor</Link>
              </li> : null}          
              </ul>
          </div>
          <form method="post" action="/logout/" className="navbar-right form-inline my-2 my-lg-0">
              <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} />
              <button type="submit" className="btn logout-btn btn-outline-success">Log Out</button>
          </form>
        </nav>
        </div>);
    }
}

NavBar.propTypes = {
  user: PropTypes.object,
  refreshStudent: PropTypes.func,
  changePage: PropTypes.func,
  page: PropTypes.string
};