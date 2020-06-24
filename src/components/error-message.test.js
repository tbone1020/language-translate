import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ErrorMessage from "./error-message";

describe('error happening', () => {
    let HTMLContainer = null;
    
    beforeEach(()=> {
      HTMLContainer = document.createElement("div");
      document.body.appendChild(HTMLContainer);
    });

    afterEach(() => {
      unmountComponentAtNode(HTMLContainer);
      HTMLContainer.remove();
      HTMLContainer = null;
    });

    it ('should not display an error message if errorMessage is empty', () => {
        const givenEmptyErrorMessage = "";

        act(() => {
            render(<ErrorMessage errorMessage={givenEmptyErrorMessage} />, HTMLContainer);
        });

        expect(HTMLContainer.querySelector('#error-message').textContent).toEqual('');

    });

    it ('should display the error when errorMessage is not empty', () => {
        const givenErrorMessage = "404 Error";

        act(() => {
            render(<ErrorMessage errorMessage={givenErrorMessage} />, HTMLContainer);
        });

        expect(HTMLContainer.querySelector('#error-message').textContent).toEqual('404 Error');
    });

});