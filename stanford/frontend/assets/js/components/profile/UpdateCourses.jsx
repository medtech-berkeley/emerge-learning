import React from 'react';
import { Container, ListGroup, ListGroupItem, Row, Col, Input, Button, Alert } from 'reactstrap';
import Cookies from "js-cookie";
import 'regenerator-runtime/runtime'

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
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class UpdateCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            fetched: false,
            courses: [],
            public: []
        }
        this.getCourses = this.getCourses.bind(this)
        this.getPublicCourses = this.getPublicCourses.bind(this)
        // this.dropDown = this.dropDown.bind(this)
    };

    handleClick(item) {
        // console.log(item.question__id);
        this.setState({ selected: item })

    };

    async getCourses() {
        // var allCourses = await fetch('settings/listcourses/', {
        //     method: "POST", 
        //     mode: 'same-origin',
        //     headers: {
        //         'X-CSRFToken': csrftoken
        //     }
        // }).then(response => response.json());

        // var allCourses = await fetch("/api/students", window.getHeader)
        var lsCourses = await fetch("/api/courses", window.getHeader)
        // var jsonCourses = await allCourses.json();
        var jsonls = await lsCourses.json()
        this.setState({ courses: jsonls })
        // console.log(jsonls[0])
    }

    async getPublicCourses() {
        var publicCourses = await fetch('/api/publiccourses', window.getHeader)
        var publicjson = await publicCourses.json()
        this.setState({ public: publicjson })
        console.log(publicjson)
    }
    // dropDown(){
    //     var options = [];
    //     for(var i = 0; i <= this.state.courses.length; i++){
    //         options.push(<option value = {this.state.courses[i].code}> {this.state.courses[i].name} </option>)
    //     }
    //     return options;
    // }

    render() {
        if (!this.state.fetched) {
            (async () => { this.getCourses(); })();
            (async () => { this.getPublicCourses(); })();
            this.state.fetched = true;
        }
        return (
            <center className=".d-inline-block">
                <Container>
                    <form method="POST" action='/settings/addcourse/'>
                        <CSRFToken />
                        Add Course Access Code:
                        <br />
                        <input name="access_code" type="text" />
                        <button type="submit">Submit</button>
                    </form>
                </Container>
                <br/>
                <Container>
                    <form method="POST" action='/settings/removecourse/'>
                        <CSRFToken />
                        Remove Course:
                        <br />
                        <select name="access_code" type="text">
                            {this.state.courses.map((e, key) => {
                                return <option key={key} value={e.code}>{e.name}</option>
                            })}
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </Container>
                <br/>
                <br/>
                <Container>
                    <ListGroup>
                        <ListGroupItem header="Header 1" variant="primary">
                            <Row>
                                <Col>
                                    <b>
                                        Public Course Name
                                    </b>
                                </Col>
                                <Col>
                                    <b>
                                        Course Access Code
                                    </b>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {this.state.public.map((e, key) => {
                            return (
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            {e.name}
                                        </Col>
                                        <Col>
                                            {e.code}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </Container>
                {/* <Container>
                    {allCourses}
                </Container>  */}

            </center>
        );
    }
}
