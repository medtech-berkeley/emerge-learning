import React from 'react';
import { Container, Row } from 'reactstrap';
import Cookies from "js-cookie";

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class EmailSender extends React.Component {

    render() {
        return (
            <center className=".d-inline-block">
                <Container>
                    <form method="POST" action="/instructor/send_email/">
                    <CSRFToken />
                        Subject:
                        <br/>
                        <input name="subject" type="text"/>
                        <br/>
                        Recipient:
                        <br/>
                        <input name="recipient" type="text"/>
                        <br/>
                        Message: 
                        <br/>
                        <textarea name="message" rows="15" columns="150">
                        </textarea>
                        <br/>
                        <input className="btn btn-success"  type="submit" />
                    </form>
                </Container>
            </center>
        );
    }
}
