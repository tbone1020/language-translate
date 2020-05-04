import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-output';
import LoadingIcon from './components/loading';
import HelpModel from './components/help-model'
import { getTranslations } from './components/api';
import './App.css';

interface IState {
  translationList: string;
  userTypedInput: Object;
  isValidJSON: boolean;
  isModelShowing: boolean;
  isLoading: boolean; // isTranslating is better
  errorMessage: string;
  toLanguage: string
}

export default class App extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      translationList: "",
      userTypedInput: "",
      isValidJSON: false,
      isModelShowing: false,
      isLoading: false,
      errorMessage: "",
      toLanguage: 'fr'
    }
    this.updateMainState = this.updateMainState.bind(this);
    this.setToLoadingThenTranslateUserInput = this.setToLoadingThenTranslateUserInput.bind(this);
  }

  updateMainState(newState: object): void {
    this.setState(newState);
  }

  setToLoadingThenTranslateUserInput(): void {
    this.setState({
      isLoading: false
    }, () => {
      this.translateUserInput();
    });
  }

  translateUserInput(): void {
    let arrayOfpropertiesWithoutCounts = this.filterOutCountKeysFromUserInput();
    let translateReadyObject = this.convertToTranslatableObject(arrayOfpropertiesWithoutCounts);
    this.translate(translateReadyObject);
  }

  filterOutCountKeysFromUserInput(): string[] {
    return Object.keys(this.state.userTypedInput).filter(key => key.indexOf('Count') === -1);
  }

  convertToTranslatableObject(inputKeys: string[]): object[] {
    const finalTranslateReadyList: object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let translateReadyList = this.determineIfCurrentPropertyIsAnArrayOrObject(inputKeys[i]);
      finalTranslateReadyList.push.apply(finalTranslateReadyList, translateReadyList);
    }
    return finalTranslateReadyList;
  }

  determineIfCurrentPropertyIsAnArrayOrObject(key: string): object[] {
    if (Array.isArray(this.state.userTypedInput[key])) {
      return this.convertIndexValueFromArrayToTranslatableObject(key, this.state.userTypedInput[key]);
    } else {
      return this.convertValuesFromObjectToTranslateObject(this.state.userTypedInput[key]);
    }
  }

  convertIndexValueFromArrayToTranslatableObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = this.whichObjectKeyShouldBeUsed(key);
    return objectList.map(objectIndex => ({ "text": objectIndex[targetObjectKey]}))
  }

  whichObjectKeyShouldBeUsed(key: string): string {
    return (key === "autotext") ? "val" : "name";
  }

  convertValuesFromObjectToTranslateObject(translationSection: object): object[] {
    return Object.keys(translationSection).map(key => ({"text": translationSection[key]}));
  }

  translate(translationsList: object[]): void {
    let listOfDividedTranslations = this.divideTranslateList(translationsList);
    let translatedList = listOfDividedTranslations.map(translatableList => {
      return getTranslations(translatableList, this.state.toLanguage).catch(error => {
        this.setState({ errorMessage: error });
      });
    });
    // this.displayTranslations(firstTranslationSet, secondTranslationSet); */
  }

  divideTranslateList(list: object[]): object[] {
    let divideNumber = this.numberOfAPICallsRequired(list);
    let copyOfTranslationList = [...list];
    const dividedTranslationList: any = [];
    while (copyOfTranslationList.length) {
      dividedTranslationList.push(copyOfTranslationList.splice(0, Math.ceil(list.length / divideNumber)));
    }
    return dividedTranslationList;
  }

  numberOfAPICallsRequired(list: object[]): number {
    return Math.ceil(JSON.stringify(list).length / 4500);
  }

  displayTranslations(firstTranslationSet: any, secondTranslationSet: any): void {
    if (typeof firstTranslationSet === "string") {
      this.displayErrorMessage(firstTranslationSet);
    } else if (typeof secondTranslationSet === "string") {
      this.displayErrorMessage(secondTranslationSet);
    } else {
      this.reformatTranslationsThenDisplay(firstTranslationSet, secondTranslationSet);
    }
  }

  displayErrorMessage(message: string): void {
    this.setState({
      errorMessage: message,
      isLoading: false
    })
  }

  reformatTranslationsThenDisplay(firstTranslationsList: object[], secondTranslationsList: object[]): void {
    const combinedTranslations = this.combineBothSetsOfTranslations(firstTranslationsList, secondTranslationsList);
    const translations = this.addTranslationsToCopyOfUserInput(combinedTranslations);
    this.setState({
      translationList: JSON.stringify(translations),
      isLoading: false
    });
  }

  combineBothSetsOfTranslations(firstSet: object[], secondSet: object[]): object[] {
    firstSet.push.apply(firstSet, secondSet);
    return firstSet;
  }

  addTranslationsToCopyOfUserInput(translationList: object[]): object {
    const copyOfUserInput = {...this.state.userTypedInput};
    for (let key in copyOfUserInput) {
      if (copyOfUserInput[key] instanceof Object) {
        this.combineTranslationsWithCopy({key, copyOfUserInput, translationList});
      }
    }
    return copyOfUserInput;
  }

  combineTranslationsWithCopy({key, copyOfUserInput, translationList}): void {
    let translationsForThisObjectKey = translationList.splice(0, Object.keys(copyOfUserInput[key]).length);
    for (let arrKey in copyOfUserInput[key]) {    
      let listOfTranslations: any = translationsForThisObjectKey.shift();
      if (Array.isArray(copyOfUserInput[key])) {
        let targetKey = this.whichObjectKeyShouldBeUsed(key);
        copyOfUserInput[key][arrKey][targetKey] = listOfTranslations.translations[0].text;
      } else {
        copyOfUserInput[key][arrKey] = listOfTranslations.translations[0].text;
      }
    }
  }

  render() {
    const { isModelShowing, errorMessage, isValidJSON, isLoading, translationList } = this.state;
    
    return (<main role="main">
      <Header updateMainState={this.updateMainState} isModelShowing={isModelShowing} />
      <section id="error-message">{errorMessage !== "" ? errorMessage : null}</section>
      <section id="translations-wrapper">
        <HelpModel updateMainState={this.updateMainState} shouldHelpModelShow={this.state.isModelShowing} />
        <TranslationInput updateMainState={this.updateMainState}/>
        <LoadingIcon isLoading={isLoading} />
        <TranslationOutput updateMainState={this.updateMainState} translationList={translationList} />
        <button onClick={this.setToLoadingThenTranslateUserInput} disabled={!isValidJSON} className="translate-button">Translate</button>
      </section>
    </main>);
  }
}
