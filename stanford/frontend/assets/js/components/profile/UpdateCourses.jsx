import React from 'react';
import { Container, Row } from 'reactstrap';
import Cookies from "js-cookie";


const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class UpdateCourses extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {selected: null}
    };
    
    handleClick(item){
        // console.log(item.question__id);
        this.setState({selected: item})
    
    };

    allCourses = fetch('/settings/listcourses/', {method:"POST"}).then(response => response.json()).then(data => {return data})
    

    render() {
        return (
            <center className=".d-inline-block">
                <Container>
                    <form method="POST" action='/settings/addcourse/'>
                    <CSRFToken />
                        Add Course Access Code: 
                        <br/>
                        <input name="access_code" type="text"/>
                    </form>
                </Container>
                <Container>
                    <form method="POST" action='/settings/removecourse/'>
                    <CSRFToken />
                        Remove Course Access Code: 
                        <br/>
                        <input name="access_code" type="text"/>
                    </form>
                </Container>
                {/* <Container>
                    {allCourses}
                </Container>  */}

            </center>
        );
    }
}
