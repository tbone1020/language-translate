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

    it ('should activate translation button with valid JSON', () => {
        translationInputWrapper.find('#translation-input').simulate('change', {
            preventDefault() {},
            target: { value: '{"text":"Testing"}' } 
        });

        expect(spyUpdateMainFunction.calledOnce).toBe(true);
    });

    it ('should keep translation button disabled with invalid JSON', () => {
        translationInputWrapper.find('#translation-input').simulate('change', {
            preventDefault() {},
            target: { value: '{"text""Testing"}' } 
        });

        expect(spyUpdateMainFunction.calledOnce).toBe(true);
    });

    it ('should keep translation button disabled with empty object', () => {
        translationInputWrapper.find('#translation-input').simulate('change', {
            preventDefault() {},
            target: { value: '{}' } 
        });

        expect(spyUpdateMainFunction.calledOnce).toBe(true);
    });
});