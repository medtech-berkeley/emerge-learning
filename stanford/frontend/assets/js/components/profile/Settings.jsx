import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane'
import { refreshStudent } from "../../actions/LoadUserActions";

// CSRF TOKEN STUFF

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};

export class Settings extends React.Component {
	render() {
        return (
            <div>
                <Container>
            <h1>Update Profile</h1>
            <form method = "POST" action="/profile/update" encType="multipart/form-data">
                <CSRFToken />
                <div className="form-group">
                  <label >Full Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Full Name" defaultValue={this.props.student.name}/>
                </div>
                <div className="form-group">
                  <label >Location</label>
                  <input type="text" name="location" className="form-control" placeholder="Location" defaultValue={this.props.student.location}/>
                </div>
                <div className="form-group">
                  <label >Description</label>
                  <input type="text" name="description" className="form-control" placeholder="Description" defaultValue={this.props.student.description}/>
                </div>
                <div className="form-group">
                  <label >Profile Photo</label>
                  <input type="file" name="image" className="form-control"/>
                </div>
                <div className="form-check">
                  <input type="checkbox" name="subscribed_to_emails" className="form-check-input" defaultChecked={this.props.student.subscribed_to_emails}/>
                  <label className="form-check-label">Receive Emails from Emerge Learning</label>
                </div>
                <br />
                <button type="submit" className="btn btn-success">Update</button>
            </form>
            </Container>
            </div>
        )
	}
}

Settings.propTypes = {
};
