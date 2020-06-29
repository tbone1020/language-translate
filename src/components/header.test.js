import React from "react";
import destinilogo from '../images/destinilogo.svg';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from './header';


describe("showing header's content", () => {
    let htmlContainer = null;

    beforeEach(() => {
        htmlContainer = document.createElement('div');
        document.body.appendChild(htmlContainer);

        act(() => {
            render(<Header />, htmlContainer);
        });
    });
    
    afterEach(() => {
        unmountComponentAtNode(htmlContainer);
        htmlContainer.remove();
        htmlContainer = null;
    });

    it ('should show logo on text in header', () => {
        expect(htmlContainer.querySelector('#header-logo > img').src).toEqual(expect.stringContaining(destinilogo));
    });

    it ('should show sub text next to logo', () => {
        expect(htmlContainer.querySelector('#logo-sub-text').textContent).toEqual(" translator");
    });    
    
    it('Should render header logo and question mark icon', () => {
        expect(htmlContainer.querySelector('#help-icon > .fa-question-circle')).toBeTruthy();
    });
})
