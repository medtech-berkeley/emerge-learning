import React from 'react';
import { render } from 'react-dom';
import { Button, Col, Container, Row, Table } from 'reactstrap';

export class FeedbackSummary extends React.Component {
    componentDidMount() {
        this.props.getFeedbackSummary();
    }

    constructor(props) {
        super(props);
        this.state = {selected: null}
    }

    handleClick(item){
        // console.log(item.question__id);
        this.setState({selected: item})

    }

    render() {
        return ( 
            <Container>
            <h2 style={{textAlign:"center"}}>Feedback</h2>
            <Row>
            <Col>
            <Table bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Question</th> 
                <th>Feedback Count</th>
            </tr>
            </thead>
            <tbody>
            {
                this.props.feedback && this.props.feedback.map(function(item) {
                    return (
                        <tr onClick={() => this.handleClick(item)}>
                        <td>{item.question__id}</td>
                        <td>{item.question__text}</td>
                        <td>{item.count}</td>
                        </tr>
                )
                }.bind(this))
            }
            </tbody>
            </Table>
            </Col>
            <Col>
            <h3>{this.state.selected && "Question " + this.state.selected.question__id + ": " + this.state.selected.question__text}</h3>
            {this.state.selected ? 
                this.state.selected.question__feedback.map(function(item) {
                    return(
                    <li>"{item['text']}" - {item['time']} - {item['student']}</li>
                    )
                }.bind(this))
                :
                <p>Click a question to see its feedback!</p>
            }
            </Col>
            </Row>
            </Container>
        )
    }
}