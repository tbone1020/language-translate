import React from 'react';
import API from './api';

describe('API Call', () => {
    
    describe('translating user input', () => {

    });

    describe('retrieving options', () => {

        it ('should have the body property in the options object', () => {
            const givenTestBodyObject = {"text":"Testing"};
    
            const whenRetrievingOptionsObject = API.getAPIReqestOptions(givenTestBodyObject);
    
            expect(whenRetrievingOptionsObject.body).toEqual('{"text":"Testing"}');
        });
    
        it ('should have the headers object', () => {
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