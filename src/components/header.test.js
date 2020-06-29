import React from "react";
import { shallow, mount, render } from 'enzyme';
import { act } from "react-dom/test-utils";
import Header from './header';


describe("showing header's content", () => {
    let htmlContainer = null;

    beforeEach(() => {
        htmlContainer = document.createElement('div');
        document.body.appendChild(htmlContainer);
    });
    
    afterEach(() => {
        unmountComponentAtNode(htmlContainer);
        htmlContainer.remove();
        htmlContainer = null;
    });

    it ('should have logo with logo image path', () => {
        const headerWrapper = shallow(<Header />);
        console.log(headerWrapper.find('#header-logo'));
        // expect(headerWrapper.find('').src).toEqual(expect.stringContaining(destinilogo));
    });

    it ('should show sub text next to logo', () => {
        expect(htmlContainer.querySelector('#logo-sub-text').textContent).toEqual(" translator");
    });    

    it('Should render header logo and question mark icon', () => {
        expect(htmlContainer.querySelector('#help-icon > .fa-question-circle')).toBeTruthy();
    });
})
