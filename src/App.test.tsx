import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Translating user input', () => {
  let appComponent;

  beforeEach(() => {
    appComponent = new App({});
  });

  it('should remove all "Count" keys from object', () => {
    appComponent.state.userTypedInput = {
      countryCount: 10,
      langCount: 5,
      autotextCount: 20,
    }
    
    let filteredObject = appComponent.filterOutCountKeysFromUserInput();
    
    expect(filteredObject.hasOwnProperty('countryCount')).toEqual(false);
    expect(filteredObject.hasOwnProperty('langCount')).toEqual(false);
    expect(filteredObject.hasOwnProperty('autotextCount')).toEqual(false);
  });

  it('should divide an array into a multidimensional array', () => {
    const givenLongArrayList = [];
    for (let i = 0; i < 160; i++) {
      givenLongArrayList.push("Testing");
    }

    let whenArrayIsDivided = appComponent.separateTranslationsIntoChunks(givenLongArrayList);
    
    expect(whenArrayIsDivided[0].length).toEqual(100);
    expect(whenArrayIsDivided[1].length).toEqual(60);
  });

  it ('should convert to translate ready object', () => {

  });



  it('should return the text "val"', () => {
    let givenObjectKey = "autotext";

    let whenKeyIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenObjectKey);
    
    expect(whenKeyIsPassedIn).toEqual("val");
  });

  it('should return the text "name"', () => {
    let givenCountryKey = "country";
    let givenLangKey = "lang";

    let whenCountryIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenCountryKey);
    let whenLangIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenLangKey);
    
    expect(whenCountryIsPassedIn).toEqual("name");
    expect(whenLangIsPassedIn).toEqual("name");
  });

  it('should flatten a multidimensional array', () => {
    const givenMultidimensionalArray = [["test", "test", "test"], ["test", "test", "test"], ["test", "test", "test"]];
    
    let whenArrayIsFlattened = appComponent.flattenTranslationsList(givenMultidimensionalArray);
    
    expect(whenArrayIsFlattened.length).toEqual(9);
  });

  it ('should check if object key equals "text"', () => {
    let givenObject = {"testObjectKey": "Testing object"}

    let whenConvertedToTranslateObject = appComponent.convertValuesFromObjectToTranslateObject(givenObject);

    expect(whenConvertedToTranslateObject[0].hasOwnProperty('text')).toEqual(true);
  });

  it ('should check if text key has proper value', () => {
    let givenObject = {"test": "Testing first object key"};

    let whenConvertedToTranslateObject = appComponent.convertValuesFromObjectToTranslateObject(givenObject);
    
    expect(whenConvertedToTranslateObject[0].text).toEqual('Testing first object key');
  });

});