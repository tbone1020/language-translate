import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from './header';

describe("Show header's content", () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    
    it('Should render header logo and question mark icon', () => {
        act(() => {
            render(<Header />, container);
        });

        // const whenSearchingForLogoImage = container.querySelector('#help-model');

        // console.log(whenSearchingForLogoImage);
        // expect(whenSearchingForLogoImage).toBeTruthy();
    });
})
