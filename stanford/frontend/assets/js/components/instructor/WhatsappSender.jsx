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
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            message: ''
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(this);
    //     console.log(this.state.number)
    //     console.log(this.state.message)
    //     const message = new URLSearchParams({
    //         number: 'whatsapp:+1' + this.state.number,
    //         message: this.state.message
    //     })
    //     console.log(message)
    //     fetch('/instructor/send_whatsapp/', {
    //         method: 'POST',
    //         body: message
    //     }).then(function(response) {
    //         console.log(response)
    //     })
    // }
    render() {
        return (
            <center className=".d-inline-block">
                <Container>
                    <form method="POST" action="/instructor/send_whatsapp/">
                    <CSRFToken />
                        Phone Number: 
                        <input type="tel" value={this.state.value} name="number" onChange={this.handleChange}/>
                        <br/>
                        Message:
                        <br/>
                        <textarea type="text" value={this.state.value} name="message" onChange={this.handleChange} rows="4" cols="50"/>
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
