import React from 'react';
import LoadingIcon from './loading';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from '@testing-library/react';
 
describe('loading state', () => {
    let htmlContainer = null;
    
    beforeEach(() => {
      htmlContainer = document.createElement("div");
      document.body.appendChild(htmlContainer);
    });

    afterEach(() => {
      unmountComponentAtNode(htmlContainer);
      htmlContainer.remove();
      htmlContainer = null;
    });

    it ('displays arrow icon when isTranslating is false', () => {
        const givenIsTranslatingIsFalse = false;
        const arrowIcon = '.to-arrow > .fa-arrow-right';

        act(() => {
            render(<LoadingIcon isTranslating={givenIsTranslatingIsFalse} />, htmlContainer);
        });
        
        expect(htmlContainer.querySelector(arrowIcon)).toBeTruthy();
    });

    it ('displays spinning icon when isTranslating is true', () => {
        const givenIsTranslatingIsTrue = true;
        const loadingIcon = '.to-arrow > .fa-spinner';

        act(() => {
            render(<LoadingIcon isTranslating={givenIsTranslatingIsTrue} />, htmlContainer);
        });
    
        expect(htmlContainer.querySelector(loadingIcon)).toBeTruthy();
    });

});