import React from 'react';
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col, Input, Button, Alert } from 'reactstrap';
import { UncontrolledAlert } from 'reactstrap';
import { MessageBox } from '../ui-components/MessageBox';

export class UserManagement extends React.Component {
    componentWillMount() {
        this.props.refreshStudents();
    }    

    render() {
        return (<div>
            <MessageBox messages={this.props.messages} limit={1} />
            <ListGroup className="mb-3">
                {this.props.students.map((student, i) =>
                    <StudentListItem {...student}
                            updateProfileType={this.props.updateProfileType}
                            key={student.id} 
                    />
                )}
            </ListGroup>
            {/* <Button color="success">Select All</Button>
            <Button>Deselect All</Button> */}
        </div>);
    }
}

UserManagement.propTypes = {
    refreshStudents: PropTypes.func,
    updateProfileType: PropTypes.func,
    students: PropTypes.array
};


class StudentListItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            profile_type: this.props.profile_type
        };
    }

    render () {
        const { profile_type } = this.state;
        let selectRef = React.createRef();

        let onProfileChange = (newVal) => {
            this.setState({profile_type: newVal.target.value});
        }

        let handleSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.props.updateProfileType(this.props.id, selectRef.current.value);
        };

        return (
            <ListGroupItem className="user-elem">
                <form onSubmit={handleSubmit}>
                    <Row>
                        {/* <Col sm={1}>
                            <center>
                                <Input type="checkbox" />
                            </center>
                        </Col> */}
                        <Col sm={3}>
                            <img width="64" height="64" src={this.props.image} alt="Profile Image"/>
                        </Col>
                        <Col sm={4}>
                            {this.props.name}
                        </Col>
                        <Col sm={4}>
                            <Input type="select" value={profile_type} onChange={onProfileChange} innerRef={selectRef}>
                                <option value="STUD">Student</option>
                                <option value="INST">Instructor</option>
                                <option value="ADMN">Admin</option>
                            </Input>
                        </Col>
                        <Col sm={1}>
                            <Button>Save</Button>
                        </Col>
                    </Row>
                </form>
            </ListGroupItem>
        );
    }
}

StudentListItem.propTypes = {
    updateProfileType: PropTypes.func
}
