import React from 'react';
import TranslationOutput from './translation-output';
import { shallow, mount, render } from 'enzyme';

describe ('translation output textarea', () => {

    it ('should pass props correctly', () => {
        const givenOutputWrapper = shallow(<TranslationOutput translationList={"{'test':'test translation prop}"}  />);

        expect(givenOutputWrapper.instance().props.translationList).toEqual("{'test':'test translation prop}");
    });

    it ('should update the App components state', () => {
        const givenMockFunction = jest.fn();
        const event = {
            preventDefault() {},
            target: { value: 'de' } 
        };

        const givenOutputWrapper = shallow(<TranslationOutput updateMainState={givenMockFunction} />);

        givenOutputWrapper.find('select').simulate('change', event);
        
        // console.log(givenMockFunction);
        expect(givenMockFunction).toBeCalledWith();
    });


});