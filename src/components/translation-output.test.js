import React from 'react';
import TranslationOutput from './translation-output';
import renderer from 'react-test-renderer';
import { act } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";

describe ('translation output textarea', () => {
    let htmlContainer = null;
    let translationOutput = null;

    beforeEach(() => {
        htmlContainer = document.createElement('div');
        document.body.appendChild(htmlContainer);
        translationOutput = new TranslationOutput({});
    });
    
    afterEach(() => {
        unmountComponentAtNode(htmlContainer);
        htmlContainer.remove();
        htmlContainer = null;
    });

    describe('the translation output', () => {
        it ('should render input text area', () => {
            act(() => {
                render(<TranslationOutput />, htmlContainer);
            });

            expect(htmlContainer.querySelector('.textarea-wrapper > textarea')).toBeTruthy();
        });

    });

});