import React from 'react';
import LoadingIcon from './loading';
import { shallow } from 'enzyme';

describe('loading icon', () => {

    it ('displays arrow icon when isTranslating is false', () => {
        const whenIsLoadingIsFalse = shallow(<LoadingIcon isTranslating={false} />);
        
        expect(whenIsLoadingIsFalse.html().indexOf('fa-arrow-right') !== -1).toBe(true);
    });

    it ('displays spinning icon when isTranslating is true', () => {
        const whenIsLoadingIsTrue = shallow(<LoadingIcon isTranslating={true} />);
    
        expect(whenIsLoadingIsTrue.html().indexOf('fa-spinner') !== -1).toBe(true);
    });

});