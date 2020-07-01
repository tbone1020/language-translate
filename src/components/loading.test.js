import React from 'react';
import LoadingIcon from './loading';
import { shallow } from 'enzyme';
 
describe('loading state', () => {

    it ('displays arrow icon when isTranslating is false', () => {
        const whenIsLoadingIsFalse = shallow(<LoadingIcon isTranslating={false} />);
        
        expect(whenIsLoadingIsFalse.find('.fa-arrow-right')).toBeTruthy();
    });

    it ('displays spinning icon when isTranslating is true', () => {
        const whenIsLoadingIsTrue = shallow(<LoadingIcon isTranslating={true} />);
    
        expect(whenIsLoadingIsTrue.find('.fa-spinner')).toBeTruthy();
    });

});