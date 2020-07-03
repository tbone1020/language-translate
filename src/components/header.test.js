import React from "react";
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Header from './header';


describe("showing header's content", () => {

    it ('should render the logo and', () => {        
        const givenHeaderWrapper = shallow(<Header/>);

        expect(givenHeaderWrapper.find('#header-logo').html()).toEqual('<h1 id="header-logo"><img src="destinilogo.svg" alt="destini logo"/><span id="logo-sub-text"> translator</span></h1>');
    });

    it ('should render help icon', () => {
        const givenHeaderWrapper = shallow(<Header/>);
        
        expect(givenHeaderWrapper.find('#help-icon').html().indexOf('svg-inline--fa fa-question-circle') !== -1).toBe(true);
    });

    it ('should open help model when help icon is clicked', () => {
        const spyUpdateMainState = sinon.spy();

        const headerComponent = shallow(<Header isModelShowing={false} updateMainState={spyUpdateMainState}/>);

        headerComponent.find('#help-icon').simulate('click');

        expect(spyUpdateMainState.calledOnce).toBeTruthy();
    });

});
