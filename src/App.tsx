import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-output';
import LoadingIcon from './components/loading';
import HelpModel from './components/help-model'
import mockTranslation from './data/mockTranslation.json';
import { getTranslations } from './components/helper';
import './App.css';

interface IState {
  translationList: string;
  userTypedInput: Object;
  isValidJSON: boolean;
  isModelShowing: boolean;
  isLoading: boolean;
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
      isLoading: true
    }, () => {
      this.translateUserInput();
    })
  }

  translateUserInput(): void {
    let arrayOfpropertiesWithoutCounts = this.filterOutCountsFromUserInput();
    let arraySeparatedInHalf = this.splitListInHalf(arrayOfpropertiesWithoutCounts);
    this.translate(this.convertToTranslatableObject(arraySeparatedInHalf[0]), this.convertToTranslatableObject(arraySeparatedInHalf[1]));
  }

  filterOutCountsFromUserInput(): string[] {
    return Object.keys(this.state.userTypedInput).filter(key => key.indexOf('Count') === -1);
  }

  splitListInHalf(list: string[]): string[][] {
    let halfwayPoint = Math.ceil(list.length / 2);
    return [list.slice(0, halfwayPoint), list.slice(halfwayPoint, list.length)];
  }
  
  convertToTranslatableObject(inputKeys: string[]): object[] {
    const finalTranslateReadyList: object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let translateReadyList = this.determineIfCurrentPropertyIsAnArrayOrObjects(inputKeys[i]);
      finalTranslateReadyList.push.apply(finalTranslateReadyList, translateReadyList);
    }
    return finalTranslateReadyList;
  }

  determineIfCurrentPropertyIsAnArrayOrObjects(key: string): object[] {
    if (Array.isArray(this.state.userTypedInput[key])) {
      return this.convertValuesFromArrayToTranslateObject(key, this.state.userTypedInput[key]);
    } else {
      return this.convertValuesFromObjectToTranslateObject(this.state.userTypedInput[key]);
    }
  }

  convertValuesFromArrayToTranslateObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = this.whichObjectKeyShouldBeUsed(key);
    return objectList.map(objectIndex => ({ "text": objectIndex[targetObjectKey]}))
  }

  whichObjectKeyShouldBeUsed(key: string): string {
    return (key === "autotext") ? "val" : "name";
  }
  
  convertValuesFromObjectToTranslateObject(translationSection: object): object[] {
    return Object.keys(translationSection).map(key => ({"text": translationSection[key]}));
  }

  async translate(firstTranslateList: object[], secondTranslateList: object[]): Promise<void> {
    let firstTranslationSet = await getTranslations(firstTranslateList);
    let secondTranslationSet = await getTranslations(secondTranslateList);
    this.checkForAnyErrorsInResponse(firstTranslationSet, secondTranslationSet);
  }

  checkForAnyErrorsInResponse(firstTranslationSet, secondTranslationSet): void {
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
      errorMessage: message
    })
  }

  reformatTranslationsThenDisplay(firstTranslationsList: object[], secondTranslationsList: object[]): void {
    const combinedTranslations = this.combineBothSetsOfTranslations(firstTranslationsList, secondTranslationsList);
    console.log(combinedTranslations);
    // const translations = this.addTranslationsToCopyOfUserInput(combinedTranslations);
    // this.setState({
    //   translationList: JSON.stringify(translations),
    //   isLoading: false
    // });
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
        copyOfUserInput[key][arrKey][targetKey] = listOfTranslations.text;
      } else {
        copyOfUserInput[key][arrKey] = listOfTranslations.text;
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
        <TranslationOutput translationList={translationList} />
        <button onClick={this.setToLoadingThenTranslateUserInput} disabled={!isValidJSON} className="translate-button">
          {isValidJSON === true ? "Translate" : "Not Valid JSON"}
        </button>
      </section>
    </main>);
  }
}
