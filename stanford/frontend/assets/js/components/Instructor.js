import React from 'react';
import { render } from 'react-dom';
import { Button, Jumbotron } from 'reactstrap';

export class Instructor extends React.Component {

    render() {
        return ( 
            <div>
                <Jumbotron>
                <h1 className="display-3" > Welcome to a Terrible Instructor JS file </h1> 
                <p className="lead" > This is a simple mock up. </p> 
                <hr className="my-2" />
                <p> Two file - upload links are below. First is questions, second is categories. </p> 
                <p className="lead">
                    <Button outline color="success" size="sm">
                        <form action="/" >
                            <input type="file" name="fileone" accept=".csv" />
                            <input type="submit" />
                        </form>
                    </Button> 
                    {   } 
                    <Button outline color="success" size="sm" >
                        <form action="/">
                            <input type="file" name="filetwo" accept=".csv" />
                            <input type="submit" />
                        </form>
                    </Button>  
                </p>
                </Jumbotron>
                <br/>
            </div>
        )
    }
}
