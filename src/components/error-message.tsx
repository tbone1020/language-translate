import React from 'react';
import './error-message.css';

const ErrorMessage = ({errorMessage}) => {
    return (<section id="error-message">{errorMessage !== "" ? errorMessage : null}</section>);
}

export default ErrorMessage;