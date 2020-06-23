import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import App from './App';
import TranslationInput from './components/translation-input';

describe('Translating user input', () => {
  let appComponent;

  beforeEach(() => {
    appComponent = new App({});
  });

  describe('HTML renders properly', () => {
    let HTMLContainer = null;
    
    beforeEach(()=> {
      HTMLContainer = document.createElement("div");
      document.body.appendChild(HTMLContainer);
    });

    afterEach(() => {
      unmountComponentAtNode(HTMLContainer);
      HTMLContainer.remove();
      HTMLContainer = null;
    });

    it ('should show translate button as disabled if user input is invalid', () => {
      act(() => {
        render(<App />, HTMLContainer);
      });

      expect(HTMLContainer.querySelector('.translate-button').disabled).toBe(true);
    });

    it ('should show translate button as enabled if user input is valid', () => {
      act(() => {
        render(<TranslationInput updateMainState={HTMLContainer.updateMainState}/>, HTMLContainer);
      });

      const givenTranslationInput = HTMLContainer.querySelector('#translation-input');

      givenTranslationInput.value = "{Text: 'Valid user input'}";
      
      expect(givenTranslationInput.disabled).toBe(false);
    });

    it ("should display the error when errorMessage isn't empty", () => {
      appComponent.state.errorMessage = "404 error";

      act(() => {
        render(<App />, HTMLContainer);
      });

      
      // console.log(HTMLContainer.querySelector('#error-message').textContent);
    });

  });

  describe('prepping users input for translation', () => {

    it ('should remove all "Count" keys from object', () => {
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

    it ('should create an array of translatable objects', () => {
      appComponent.state.userTypedInput = {
        "search": {
          "searchField": "Enter Postal Code / Zip Code",
          "subButton": "Find"
        },
        "autotext": [{
            "name": "hero_header",
            "val": "Find coffee near you"
          }, {
            "name": "sub-header",
            "val": "Make your selection below."
        }]
      }
  
      let whenSentForTranslation = appComponent.convertListToTranslateReadyObject(["search", "autotext"]);
      
      expect(whenSentForTranslation[0].text).toEqual("Enter Postal Code / Zip Code");
      expect(whenSentForTranslation[1].text).toEqual("Find");
      expect(whenSentForTranslation[2].text).toEqual("Find coffee near you");
      expect(whenSentForTranslation[3].text).toEqual("Make your selection below.");
    });

    it ('should return a translate object if an array is passed in', () => {
      appComponent.state.userTypedInput = {
        "autotext": [{
          "name": "hero_header",
          "val": "Find coffee near you"
        }, {
          "name": "sub-header",
          "val": "Make your selection below."
        }]
      }
  
      let whenTestArrayIsConverted = appComponent.convertCurrentObjectToTranslatableObject("autotext");
  
      expect(whenTestArrayIsConverted[0].text).toEqual("Find coffee near you");
      expect(whenTestArrayIsConverted[1].text).toEqual("Make your selection below.");
    });

    it ('should return a translate object if an object is passed in', () => {
      appComponent.state.userTypedInput = {
        "search": {
          "searchField": "Enter Postal Code / Zip Code",
          "subButton": "Find"
        }
      }
  
      let whenTestObjectIsConverted = appComponent.convertCurrentObjectToTranslatableObject("search");
      
      expect(whenTestObjectIsConverted[0].text).toEqual("Enter Postal Code / Zip Code");
      expect(whenTestObjectIsConverted[1].text).toEqual("Find");
    });

    it ('should divide an array into a multidimensional array', () => {
      const givenLongArrayList = [];
      for (let i = 0; i < 160; i++) {
        givenLongArrayList.push("Testing");
      }
  
      let whenArrayIsDivided = appComponent.separateTranslationsIntoChunks(givenLongArrayList);
      
      expect(whenArrayIsDivided[0].length).toEqual(100);
      expect(whenArrayIsDivided[1].length).toEqual(60);
    });
    
    it ('should check if text key has proper value', () => {
      let givenObject = {
        "testKeyNumber1": "Testing first object key",
        "testKeyNumber2": "Testing second object key"
      };
  
      let whenConvertedToTranslateObject = appComponent.convertValuesFromObjectToTranslateObject(givenObject);
      
      expect(whenConvertedToTranslateObject[0].text).toEqual('Testing first object key');
      expect(whenConvertedToTranslateObject[1].text).toEqual('Testing second object key');
    });

    it ('convertIndexValueFromArrayToTranslatableObject()', () => {
  
    });
  
    it ('should return the text "val"', () => {
      let givenObjectKey = "autotext";
  
      let whenKeyIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenObjectKey);
      
      expect(whenKeyIsPassedIn).toEqual("val");
    });
  
    it ('should return the text "name"', () => {
      let givenCountryKey = "country";
      let givenLangKey = "lang";
  
      let whenCountryIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenCountryKey);
      let whenLangIsPassedIn = appComponent.whichObjectKeyShouldBeUsed(givenLangKey);
      
      expect(whenCountryIsPassedIn).toEqual("name");
      expect(whenLangIsPassedIn).toEqual("name");
    });

  });

  describe('translating user input', () => {

  });

  describe('map translations back to user input', () => {
    
    it ('should flatten a multidimensional array', () => {
      const givenMultidimensionalArray = [["test", "test", "test"], ["test", "test", "test"], ["test", "test", "test"]];
      
      let whenArrayIsFlattened = appComponent.flattenTranslationsList(givenMultidimensionalArray);
      
      expect(whenArrayIsFlattened.length).toEqual(9);
    });

  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


});