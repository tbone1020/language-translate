import React from 'react';
import API from './api';

describe('translating user input', () => {
    
    describe('translating user input', () => {

    });

    describe('retrieving mock translations', () => {
        const whenRetreivingMockTranslations = API.getMockTranslations().then(data => {
            expect(data.response[0][0].translations[0].text).toEqual('Produits américains');
        });
    });

    describe('options block', () => {

        it ('should have the body in the options object', () => {
            const givenTestBodyObject = {"text":"Testing"};
    
            const whenRetrievingOptionsObject = API.getAPIReqestOptions(givenTestBodyObject);
    
            expect(whenRetrievingOptionsObject.body).toEqual('{"text":"Testing"}');
        });
    
        it ('should have headers object', () => {
            const givenTestBodyObject = {"text":"Testing"};
    
            const givenHeadersObject = API.getAPIReqestOptions(givenTestBodyObject);
    
            expect(givenHeadersObject.headers).toBeTruthy();
        });
    
        it ('should be a POST request', () => {
            const givenTestBodyObject = {"text":"Testing"};
    
            const givenHeadersObject = API.getAPIReqestOptions(givenTestBodyObject);
    
            expect(givenHeadersObject.method).toEqual('POST');
        });

    })
});