import React from "react";
import { shallow } from 'enzyme'; 
import HelpModel from "./help-model";
import sinon from 'sinon';

describe ('help model', () => {

    it ('should not display help model or overlay when shouldHelpModelShow is false', () => {
        const helpWrapper = shallow(<HelpModel shouldHelpModelShow={false} />);

        const whenHelpModelIsHidden = helpWrapper.find('#help-model');
        const whenHelpModelOverlayIsHidden = helpWrapper.find('#model-overlay');
        
        expect(whenHelpModelIsHidden.hasClass('hidden')).toBeTruthy();
        expect(whenHelpModelOverlayIsHidden.hasClass('hidden')).toBeTruthy();
    });

    it ('should display help model and overlay when shouldHelpModelShow is true', () => {
        const helpWrapper = shallow(<HelpModel shouldHelpModelShow={true} />); 

        const whenHelpModelIsShowing = helpWrapper.find('#help-model');
        const whenHelpModelOverlayIsShowing = helpWrapper.find('#model-overlay');
        
        expect(whenHelpModelIsShowing.hasClass('fadein transition')).toBeTruthy();
        expect(whenHelpModelOverlayIsShowing.hasClass('fadein transition')).toBeTruthy();
    });

    it ('should call hideModel function when close button is clicked', () => {
        const spyUpdateMainState = sinon.spy();

        const helpModelComponent = shallow(<HelpModel updateMainState={spyUpdateMainState} shouldHelpModelShow={true} />);

        helpModelComponent.find('.close-model').simulate('click');
        
        expect(spyUpdateMainState.calledOnce).toBeTruthy();
    });

    it ('should call hideModel function when the background overlay is clicked', () => {
        const spyUpdateMainState = sinon.spy();

        const helpModelComponent = shallow(<HelpModel updateMainState={spyUpdateMainState} shouldHelpModelShow={true} />);

        helpModelComponent.find('#model-overlay').simulate('click');
        
        expect(spyUpdateMainState.calledOnce).toBeTruthy();
    });
});