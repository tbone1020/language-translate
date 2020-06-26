import React from 'react';
import TranslationInput from './translation-input';
import * as TestRenderer from 'react-test-renderer'; 
import { act } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";
 
describe('translation input textarea', () => {
    let htmlContainer = null;
    let translationInput = null;

    beforeEach(() => {
        htmlContainer = document.createElement('div');
        document.body.appendChild(htmlContainer);
        translationInput = new TranslationInput({});
    });
    
    afterEach(() => {
        unmountComponentAtNode(htmlContainer);
        htmlContainer.remove();
        htmlContainer = null;
    });

    describe('the translation input', () => {
        it ('should render input text area', () => {
            act(() => {
                render(<TranslationInput />, htmlContainer);
            });

            expect(htmlContainer.querySelector('.textarea-wrapper > textarea')).toBeTruthy();
        });
        

        it ('should return true if JSON is valid', () => {
            const givenValidJSON = JSON.stringify({"test": "Testing"});

            let whenValidJSONisTested = translationInput.isValidJSON(givenValidJSON);
            
            expect(whenValidJSONisTested).toEqual(true);
        });

        it ('should return true if JSON is valid', () => {
            const givenInvalidJSON = "test";

            let whenValidJSONisTested = translationInput.isValidJSON(givenInvalidJSON);
            
            expect(whenValidJSONisTested).toEqual(false);
        });
    });
});