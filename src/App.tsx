import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-output';
import LoadingIcon from './components/loading';
import HelpModel from './components/help-model'
import API from './components/api';
import './App.css';

interface IState {
  translationList: string;
  userTypedInput: Object;
  isValidJSON: boolean;
  isModelShowing: boolean;
  isTranslating: boolean; // isTranslating is better
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
      isTranslating: false,
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
      isTranslating: true
    }, () => {
      this.translateUserInput();
    });
  }

  translateUserInput(): void {
    let listWithoutCountKeys = this.filterOutCountKeysFromUserInput();
    let translateReadyObject = this.convertListToTranslateReadyeObject(listWithoutCountKeys);
    let listOfDividedTranslations = this.separateTranslationsIntoChunks(translateReadyObject);
    this.translateThenDisplay(listOfDividedTranslations);
  }

  filterOutCountKeysFromUserInput(): string[] {
    return Object.keys(this.state.userTypedInput).filter(key => key.indexOf('Count') === -1);
  }

  separateTranslationsIntoChunks(list: object[]): object[] {
    let copyOfTranslationList = [...list];
    const dividedTranslationList: any = [];
    while (copyOfTranslationList.length) {
      dividedTranslationList.push(copyOfTranslationList.splice(0, 100));
    }
    return dividedTranslationList;
  }

  convertListToTranslateReadyeObject(inputKeys: string[]): object[] {
    const finalTranslateReadyList: object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let translateReadyList = this.convertCurrentObjectToTranslatableObject(inputKeys[i]);
      finalTranslateReadyList.push.apply(finalTranslateReadyList, translateReadyList);
    }
    return finalTranslateReadyList;
  }

  convertCurrentObjectToTranslatableObject(key: string): object[] {
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

  translateThenDisplay(translationsList: object[]): void {
    let translatedList = this.translateList(translationsList);
    // this.reformatAndDisplayTranslations();
  }

  async translateList(translationList: object[]): Promise<object[]> {
    const translationsResults = await Promise.all(translationList.map(async list => {
      return await API.getTranslations(list, this.state.toLanguage).catch(errorMessage => {
        this.displayErrorMessage(errorMessage);
      });
    }));
    return translationsResults;
  }

  displayErrorMessage(message: string): void {
    this.setState({
      errorMessage: message,
      isTranslating: false
    })
  }

  reformatAndDisplayTranslations(translationsList: object[]): void {
    const combinedTranslations = this.flattenTranslationsList(translationsList);
    const translations = this.mapTranslationsBackToUserInput(combinedTranslations);
    this.setState({
      translationList: JSON.stringify(translations),
      isTranslating: false
    });
  }

  flattenTranslationsList(translationsList: object[]): object[] {
    const combinedTranslationList: any = [];
    for (let i = 0; i < translationsList.length; i++) {
      combinedTranslationList.push.apply(combinedTranslationList, translationsList[i]);
    }
    return combinedTranslationList;
  }

  mapTranslationsBackToUserInput(translationList: object[]): object {
    const copyOfUserInput = {...this.state.userTypedInput};
    for (let key in copyOfUserInput) {
      if (copyOfUserInput[key] instanceof Object) {
        this.combineTranslationsWithInput({key, copyOfUserInput, translationList});
      }
    }
    return copyOfUserInput;
  }

  combineTranslationsWithInput({key, copyOfUserInput, translationList}): void {
    let translationsForThisObjectKey = translationList.splice(0, Object.keys(copyOfUserInput[key]).length);

    for (let arrKey in copyOfUserInput[key]) {
      let listOfTranslations: any = translationsForThisObjectKey.shift();
      console.log(listOfTranslations);
      if (Array.isArray(copyOfUserInput[key])) {
        let targetKey = this.whichObjectKeyShouldBeUsed(key);
        copyOfUserInput[key][arrKey][targetKey] = listOfTranslations.translations[0].text;
      } else {
        copyOfUserInput[key][arrKey] = listOfTranslations.translations[0].text;
      }
    }
  }

  render() {
    const { isModelShowing, errorMessage, isValidJSON, isTranslating, translationList } = this.state;
    
    return (<main role="main">
      <Header updateMainState={this.updateMainState} isModelShowing={isModelShowing} />
      <section id="error-message">{errorMessage !== "" ? errorMessage : null}</section>
      <section id="translations-wrapper">
        <HelpModel updateMainState={this.updateMainState} shouldHelpModelShow={this.state.isModelShowing} />
        <TranslationInput updateMainState={this.updateMainState}/>
        <LoadingIcon isTranslating={isTranslating} />
        <TranslationOutput updateMainState={this.updateMainState} translationList={translationList} />
        <button onClick={this.setToLoadingThenTranslateUserInput} disabled={!isValidJSON} className="translate-button">Translate</button>
      </section>
    </main>);
  }
}
