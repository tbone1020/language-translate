import React from 'react';
import TranslationOutput from './translation-output';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe ('translation output textarea', () => {

    it ('should add text to textarea value', () => {
        const givenOutputWrapper = shallow(<TranslationOutput translationList={"test translation prop"}/>);

        expect(givenOutputWrapper.find('#translation-output').html()).toContain('test translation prop');
    });

    it ('should update the App components state', () => {
        const spyUpdateMainState = sinon.spy();

        const givenOutputWrapper = shallow(<TranslationOutput translationList={""}  updateMainState={spyUpdateMainState} />);

        givenOutputWrapper.find('#language-dropdown').simulate('change', {
            preventDefault() {},
            target: { value: 'de' } 
        });
        
        expect(spyUpdateMainState.calledOnce).toBeTruthy();
    });

});