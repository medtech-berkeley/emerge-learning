import React from 'react';
import PropTypes from "prop-types";
import { UncontrolledAlert } from 'reactstrap';

export class MessageBox extends React.Component {
    render() {
        let streamToColor = {
            "message": "success",
            "error": "danger"
        };
        
        let messages = this.props.messages;
        let limit = this.props.limit;
        
        let getMessages = () => {
            return messages.slice(-limit);
        }

        return (<div>
            {
                getMessages().map(
                    (message, i) => 
                    <UncontrolledAlert color={streamToColor[message.stream]} key={Math.max(0, messages.length - limit) + i}>
                        {message.message}
                    </UncontrolledAlert>
                )
            }
        </div>);
    }
}

MessageBox.propTypes = {
    messages: PropTypes.array,
    limit: PropTypes.number
};

MessageBox.defaultProps = {
    limit: Infinity
}