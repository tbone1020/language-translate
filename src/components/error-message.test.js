import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ErrorMessage from "./error-message";

describe('error message appearing', () => {
    let htmlContainer = null;
    
    beforeEach(()=> {
      htmlContainer = document.createElement("div");
      document.body.appendChild(htmlContainer);
    });

    afterEach(() => {
      unmountComponentAtNode(htmlContainer);
      htmlContainer.remove();
      htmlContainer = null;
    });

    it ('should not display an error message if errorMessage is empty', () => {
        const givenEmptyErrorMessage = "";

        act(() => {
            render(<ErrorMessage errorMessage={givenEmptyErrorMessage} />, htmlContainer);
        });

        expect(htmlContainer.querySelector('#error-message').textContent).toEqual('');
    });

    it ('should display the error when errorMessage is not empty', () => {
        const givenErrorMessage = "404 Error";

        act(() => {
            render(<ErrorMessage errorMessage={givenErrorMessage} />, htmlContainer);
        });

        expect(htmlContainer.querySelector('#error-message').textContent).toEqual('404 Error');
    });

});