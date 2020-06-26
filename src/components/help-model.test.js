import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HelpModel from "./help-model";

describe ('help model', () => {
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

    it ('should not display help model or overlay when shouldHelpModelShow is false', () => {
        act(() => {
            render(<HelpModel shouldHelpModelShow={false} />, htmlContainer);
        });

        const whenHelpModelIsHidden = htmlContainer.querySelector('#help-model');
        const whenHelpModelOverlayIsHidden = htmlContainer.querySelector('#model-overlay');
        
        expect(whenHelpModelIsHidden.getAttribute('class')).toEqual('hidden');
        expect(whenHelpModelOverlayIsHidden.getAttribute('class')).toEqual('hidden');
    });

    it ('should display help model and overlay when shouldHelpModelShow is true', () => {
        act(() => {
            render(<HelpModel shouldHelpModelShow={true} />, htmlContainer);
        });

        const whenHelpModelIsShowing = htmlContainer.querySelector('#help-model');
        const whenHelpModelOverlayIsShowing = htmlContainer.querySelector('#model-overlay');
        
        expect(whenHelpModelIsShowing.getAttribute('class')).toEqual('fadein transition');
        expect(whenHelpModelOverlayIsShowing.getAttribute('class')).toEqual('fadein transition');

    });
});