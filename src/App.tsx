import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-output';
import LoadingIcon from './components/loading';
import mockTranslation from './data/mockTranslation.json';
import './App.css';
import { throws } from 'assert';

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
      this.generateTranslateReadyObject(this.state.userTypedInput[inputKeys[i]]);
      let translateReadyList = (Array.isArray(this.state.userTypedInput[inputKeys[i]]))
        ? this.getArrayValuesAndConvertToTranslateObject(inputKeys[i], this.state.userTypedInput[inputKeys[i]])
        : this.convertObjectValuesToTranslateObject(this.state.userTypedInput[inputKeys[i]])
        
      finalTranslateReadyList.push.apply(finalTranslateReadyList, translateReadyList);
    }
    return finalTranslateReadyList;
  }

  generateTranslateReadyObject(listOfText: string[]): void {
    console.log(listOfText);
    // listOfText.map(key => ({"text": translationSection[key]}));
  
  }

  getArrayValuesAndConvertToTranslateObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = this.whichObjectKeyShouldBeUsed(key);
    return objectList.map(objectIndex => ({ "text": objectIndex[targetObjectKey]}))
  }

  whichObjectKeyShouldBeUsed(key: string): string {
    return (key === "autotext") ? "val" : "name";
  }

  convertObjectValuesToTranslateObject(translationSection: object): object[] {
    return Object.keys(translationSection).map(key => ({"text": translationSection[key]}));
  }

  translate(firstTranslateList: object[], secondTranslateList: object[]): void {
    // Translate the text
    const combinedtranslations: object[] = [{}];
    // Fetch the translations...
    // Combine The arrays back together for mapping
    this.formatTranslationsThenUI(mockTranslation);
  }

  formatTranslationsThenUI(translationList: object[]): void {
    const translations = this.addTranslationsToUserInputCopy(translationList);
    this.setState({
      translationList: JSON.stringify(translations),
      isLoading: false
    });
  }

  addTranslationsToUserInputCopy(translationList: object[]): object {
    const copyOfUserInput = {...this.state.userTypedInput};
    for (let key in copyOfUserInput) {
      if (copyOfUserInput[key] instanceof Object) {
        this.addtranslationsToUserInputCopy({key, copyOfUserInput, translationList});
      }
    }
    return copyOfUserInput;
  }

  addtranslationsToUserInputCopy({key, copyOfUserInput, translationList}): void {
    let translationsForThisObjectKey = translationList.splice(0, Object.keys(copyOfUserInput[key]).length);
    for (let arrKey in copyOfUserInput[key]) {
      let translationObject: any = translationsForThisObjectKey.shift();
      if (Array.isArray(copyOfUserInput[key])) {
        let targetKey = this.whichObjectKeyShouldBeUsed(key);
        copyOfUserInput[key][arrKey][targetKey] = translationObject.text;
      } else {
        copyOfUserInput[key][arrKey] = translationObject.text;
      }
    }
  }

  render() {
    const { isModelShowing, errorMessage, isValidJSON, isLoading, translationList } = this.state;
    
    return (<main role="main">
      <Header updateMainState={this.updateMainState} isModelShowing={isModelShowing} />
      <section id="error-message">{errorMessage !== "" ? errorMessage : null}</section>
      <section id="translations-wrapper">
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
