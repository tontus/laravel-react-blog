import React from 'react';
import ReactDOM from 'react-dom';
import {Alert} from "react-bootstrap";

function Example() {
    return (

            [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
            ].map((variant, idx) => (
            <Alert key={idx} variant={variant}>
                This is a {variant} alert—check it out!
            </Alert>
            ))

    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
