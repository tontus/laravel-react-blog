import React from 'react';
import ReactDOM from 'react-dom';
import {Alert, Card, Container} from "react-bootstrap";

function Example() {
    return (

            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            dfadf
                        </Card.Title>
                        <Card.Text>
                            fdsf
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>

    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
