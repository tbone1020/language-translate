import React from "react";
import { shallow } from 'enzyme';
import ErrorMessage from "./error-message";

describe('error message appearing', () => {

    it ('should not display an error message if errorMessage is empty', () => {
        const givenEmptyErrorMessage = "";

        const whenComponentHasNoErrorMessage = shallow(<ErrorMessage errorMessage={givenEmptyErrorMessage} />);

        expect(whenComponentHasNoErrorMessage.find('#error-message').text()).toEqual('');
    });

    it ('should display the error when errorMessage is not empty', () => {
        const givenEmptyErrorMessage = "404 Error";

        const whenComponentHasErrorMessage = shallow(<ErrorMessage errorMessage={givenEmptyErrorMessage} />);

        expect(whenComponentHasErrorMessage.find('#error-message').text()).toEqual('404 Error');
    });

});