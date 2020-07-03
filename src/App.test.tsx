import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App';
import TranslationInput from './components/translation-input';

describe('translating user input', () => {
  let appWrapper = null;

  beforeEach(() => {
    appWrapper = shallow(<App />);
  });

  describe('preparing users input for translation', () => {
    
    it ('should remove all "Count" keys from object', () => {
      appWrapper.setState({
        countryCount: 10,
        langCount: 5,
        autotextCount: 20,
      })
      
      let filteredObject = appWrapper.instance().filterOutCountKeysFromUserInput();
      
      expect(filteredObject.hasOwnProperty('countryCount')).toEqual(false);
      expect(filteredObject.hasOwnProperty('langCount')).toEqual(false);
      expect(filteredObject.hasOwnProperty('autotextCount')).toEqual(false);
    });
    
    it ('should create an array of translatable objects', () => {
      appWrapper.setState({
        userTypedInput: {
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
      });
  
      let whenSentForTranslation = appWrapper.instance().convertListToTranslateReadyObject(["search", "autotext"]);
      
      expect(whenSentForTranslation[0].text).toEqual("Enter Postal Code / Zip Code");
      expect(whenSentForTranslation[1].text).toEqual("Find");
      expect(whenSentForTranslation[2].text).toEqual("Find coffee near you");
      expect(whenSentForTranslation[3].text).toEqual("Make your selection below.");
    });

    it ('should return a translate object if an array is passed in', () => {
      appWrapper.setState({
        userTypedInput: {
          "autotext": [{
            "name": "hero_header",
            "val": "Find coffee near you"
          }, {
            "name": "sub-header",
            "val": "Make your selection below."
          }]
        }
      });

      let whenTestArrayIsConverted = appWrapper.instance().convertCurrentObjectToTranslatableObject("autotext");
  
      expect(whenTestArrayIsConverted[0].text).toEqual("Find coffee near you");
      expect(whenTestArrayIsConverted[1].text).toEqual("Make your selection below.");
    });

    it ('should return a translate object if an object is passed in', () => {
      appWrapper.setState({
        userTypedInput: {
          "search": {
            "searchField": "Enter Postal Code / Zip Code",
            "subButton": "Find"
          }
        }
      });
  
      let whenTestObjectIsConverted = appWrapper.instance().convertCurrentObjectToTranslatableObject("search");
      
      expect(whenTestObjectIsConverted[0].text).toEqual("Enter Postal Code / Zip Code");
      expect(whenTestObjectIsConverted[1].text).toEqual("Find");
    });

    it ('should divide an array into a multidimensional array', () => {
      const givenLongArrayList = [];
      for (let i = 0; i < 160; i++) {
        givenLongArrayList.push("Testing");
      }
  
      let whenArrayIsDivided = appWrapper.instance().separateTranslationsIntoChunks(givenLongArrayList);
      
      expect(whenArrayIsDivided[0].length).toEqual(100);
      expect(whenArrayIsDivided[1].length).toEqual(60);
    });

    it ('should check if text key has proper value', () => {
      let givenObject = {
        "testKeyNumber1": "Testing first object key",
        "testKeyNumber2": "Testing second object key"
      };
  
      let whenConvertedToTranslateObject = appWrapper.instance().convertValuesFromObjectToTranslateObject(givenObject);
      
      expect(whenConvertedToTranslateObject[0].text).toEqual('Testing first object key');
      expect(whenConvertedToTranslateObject[1].text).toEqual('Testing second object key');
    });
  
    it ('should return the text "val"', () => {
      let givenObjectKey = "autotext";
  
      let whenKeyIsPassedIn = appWrapper.instance().whichObjectKeyShouldBeUsed(givenObjectKey);
      
      expect(whenKeyIsPassedIn).toEqual("val");
    });
  
    it ('should return the text "name"', () => {
      let givenCountryKey = "country";
      let givenLangKey = "lang";
  
      let whenCountryIsPassedIn = appWrapper.instance().whichObjectKeyShouldBeUsed(givenCountryKey);
      let whenLangIsPassedIn = appWrapper.instance().whichObjectKeyShouldBeUsed(givenLangKey);
      
      expect(whenCountryIsPassedIn).toEqual("name");
      expect(whenLangIsPassedIn).toEqual("name");
    });
    
  });

  describe('map translations back to user input', () => {

    beforeEach(() => {
      appWrapper.setState({
        userTypedInput: {
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
      })
    });

    it ('should flatten a multidimensional array', () => {
      const givenMultidimensionalArray = [["test", "test", "test"], ["test", "test", "test"], ["test", "test", "test"]];
      
      let whenArrayIsFlattened = appWrapper.instance().flattenTranslationsList(givenMultidimensionalArray);
      
      expect(whenArrayIsFlattened.length).toEqual(9);
    });

    it ('should set errorMessage state', () => {
      appWrapper.instance().displayTranslationsIfSuccessful({
        response: "Error with API",
        isSuccessful: false
      });

      expect(appWrapper.state().errorMessage).toEqual('Error with API');
    });

    it ('should map translations back to user input', () => {
      const givenResponse = [
        [
          {"translations": [{"text": "Translations 1"}]},
          {"translations": [{"text": "Translations 2"}]}
        ], [
          {"translations": [{"text": "Translations 3"}]},
          {"translations": [{"text": "Translations 4"}]}
        ]
      ];

      appWrapper.instance().displayTranslationsIfSuccessful({
        response: givenResponse,
        isSuccessful: true
      });

      const parsedTranslations = JSON.parse(appWrapper.state().translationList);

      expect(parsedTranslations.search.searchField).toEqual('Translations 1');
      expect(parsedTranslations.search.subButton).toEqual('Translations 2');
    });

  });
  
});