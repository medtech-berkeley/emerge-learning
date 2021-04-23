import React from 'react';
import PropTypes from "prop-types";
import { Container, Form, Row, Input, Label, FormGroup, Button} from 'reactstrap';
import Cookies from "js-cookie";
import {RichEditor} from './RichTextEditor';

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class WhatsappSender extends React.Component {
    componentWillMount() {
        console.log('Mounting');
        this.props.refreshInstructorCourses();
    }    

    render() {
        return (
            <center className=".d-inline-block">
                <Container>
                    <Form method="POST" action="/instructor/send_whatsapp/">
                        <CSRFToken />
                        <FormGroup>
                            <Label for="exampleSelect">Courses</Label>
                            <Input type="select" name="select" id="exampleSelect" multiple>
                                {
                                this.props.instructor_courses.map((course) =>
                                    <option value={course.id}>{course.name}</option>
                                )
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Message</Label>
                            <Input type="textarea" name="message" />
                        </FormGroup>
                        <Button color="success">Submit</Button>
                    </Form>
                </Container>
            </center>
        );
    }
}

WhatsappSender.propTypes = {
    refreshInstructorCourses: PropTypes.func,
    instructor_courses: PropTypes.array
};
