import React from 'react';
import { render } from 'react-dom';
import { Button, Container, Row } from 'reactstrap';

export class FeedbackSummary extends React.Component {
    componentDidMount() {
        this.props.getFeedbackSummary();
    }

    constructor(props) {
        super(props);
        
    }

    render() {
        return ( 
            <div>
            {
                this.props.feedback && this.props.feedback.map((item) => (
                    <div>
                    <p>{item.question.text}</p>
                    <p>{item.count}</p>
                    </div>
                ))
            }
            </div>
        )
    }
}
