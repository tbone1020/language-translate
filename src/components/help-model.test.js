import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HelpModel from "./help-model";

describe ('help model', () => {
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

    it ('should not display help model or overlay when shouldHelpModelShow is false', () => {
        act(() => {
            render(<HelpModel shouldHelpModelShow={false} />, container);
        });

        const whenHelpModelIsHidden = container.querySelector('#help-model');
        const whenHelpModelOverlayIsHidden = container.querySelector('#model-overlay');
        
        expect(whenHelpModelIsHidden.getAttribute('class')).toEqual('hidden');
        expect(whenHelpModelOverlayIsHidden.getAttribute('class')).toEqual('hidden');
    });

    it ('should display help model and overlay when shouldHelpModelShow is true', () => {
        act(() => {
            render(<HelpModel shouldHelpModelShow={true} />, container);
        });

        const whenHelpModelIsShowing = container.querySelector('#help-model');
        const whenHelpModelOverlayIsShowing = container.querySelector('#model-overlay');
        
        expect(whenHelpModelIsShowing.getAttribute('class')).toEqual('fadein transition');
        expect(whenHelpModelOverlayIsShowing.getAttribute('class')).toEqual('fadein transition');

    });
});