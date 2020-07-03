import React from 'react';
import API from './api';
jest.mock('./api');

describe('API call', () => {
    it ('can fetch from mock function', () => {
        API.getTranslations().then(response => {
            expect(response.text).toEqual('Test Translation');
        });
    });
});