import React from 'react';
import { Container, Row } from 'reactstrap';
import Cookies from "js-cookie";
import {RichEditor} from './RichTextEditor';

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class WhatsappSender extends React.Component {
    render() {
        return (
            <center className=".d-inline-block">
                <Container>
                    <form method="POST" action="/instructor/send_whatsapp/">
                    <CSRFToken />
                        Phone Number: 
                        <input type="tel" name="number"/>
                        <br/>
                        Message:
                        <br/>
                        <textarea type="text" name="message" rows="4" cols="50"/>
                        {/* <div style={{'width': '800px'}}>
                            <RichEditor inputName="message" />
                        </div> */}
                        <br/>
                        <input className="btn btn-success"  type="submit" />
                    </form>
                </Container>
            </center>
        );
    }
}
