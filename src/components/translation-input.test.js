import React from 'react';
import TranslationInput from './translation-input';
import { shallow } from 'enzyme';
import sinon from 'sinon';
 
describe('translation input textarea', () => {
    let spyUpdateMainFunction = null;
    let translationInputWrapper = null;

    beforeEach(() => {
        spyUpdateMainFunction = sinon.spy();
        translationInputWrapper = shallow(<TranslationInput updateMainState={spyUpdateMainFunction} />);
    });

    const testInputOnChange = (testMessage, expectedValue) => {
        it (testMessage, () => {
            translationInputWrapper.find('#translation-input').simulate('change', {
                preventDefault() {},
                target: { value: expectedValue } 
            });
    
            expect(spyUpdateMainFunction.calledOnce).toBe(true);
        });        
    }

    testInputOnChange('should activate translation button with valid JSON', '{"text":"Testing"}');
    testInputOnChange('should keep translation button disabled with invalid JSON', '{"text""Testing"}');
    testInputOnChange('should keep translation button disabled with empty object', '{}');
});