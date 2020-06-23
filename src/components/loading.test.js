import React from 'react';
import LoadingIcon from './loading';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from '@testing-library/react';
 
describe('in loading state', () => {
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
        act(() => {
            render(<LoadingIcon isTranslating={false} />, container);
        });

        const whenIsLoadingIsFalse = container.querySelector('.to-arrow > svg');
        
        expect(whenIsLoadingIsFalse.getAttribute('data-icon')).toEqual('arrow-right');
    });

    it ('displays spinning icon when isTranslating is true', () => {
        act(() => {
            render(<LoadingIcon isTranslating={true} />, container);
        });

        const whenIsLoadingIsTrue = container.querySelector('.to-arrow > svg');
        
        expect(whenIsLoadingIsTrue.getAttribute('data-icon')).toEqual('spinner');
    });

});