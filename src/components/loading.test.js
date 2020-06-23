import React from 'react';
import LoadingIcon from './loading';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from '@testing-library/react';
 
describe('loading state', () => {
    let container = null;
    
    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it ('displays arrow icon when isTranslating is false', () => {
        const givenIsTranslatingIsFalse = false;
        const arrowIcon = '.to-arrow > .fa-arrow-right';

        act(() => {
            render(<LoadingIcon isTranslating={givenIsTranslatingIsFalse} />, container);
        });
        
        expect(container.querySelector(arrowIcon)).toBeTruthy();
    });

    it ('displays spinning icon when isTranslating is true', () => {
        const givenIsTranslatingIsTrue = true;
        const loadingIcon = '.to-arrow > .fa-spinner';

        act(() => {
            render(<LoadingIcon isTranslating={givenIsTranslatingIsTrue} />, container);
        });
    
        expect(container.querySelector(loadingIcon)).toBeTruthy();
    });

});