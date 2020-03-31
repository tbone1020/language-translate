import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-result';
import LoadingIcon from './components/loading';
import mockTranslation from './data/mockTranslation.json';
import './App.css';

interface IState {
  translationList: string;
  userTypedInput: Object;
  isValidJSON: boolean;
  isModelShowing: boolean;
  isLoading: boolean;
  errorMessage: string;
  to: string
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
      to: 'fr'
    }
    this.updateMainState = this.updateMainState.bind(this);
    this.setToLoadingAndTranslate = this.setToLoadingAndTranslate.bind(this);
  }

  updateMainState(newState: object): void {
    this.setState(newState);
  }

  setToLoadingAndTranslate(): void {
    let listWithoutCountKeys = Object.keys(this.state.userTypedInput).filter(key => key.indexOf('Count') === -1);
    let listSeparatedInHalf = this.divideListInHalf(listWithoutCountKeys);
    let firstHalf = this.convertListToTranslateReadyObject(listSeparatedInHalf[0]);
    let secondHalf = this.convertListToTranslateReadyObject(listSeparatedInHalf[1]);
    this.translate(firstHalf, secondHalf);
  }

  convertListToTranslateReadyObject(inputKeys: string[]): object[] {
    const finalTranslateReadyList: object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let result = (Array.isArray(this.state.userTypedInput[inputKeys[i]]))
        ? this.grabArrayValuesAndConvertToTranslateObject(inputKeys[i], this.state.userTypedInput[inputKeys[i]])
        : this.grabObjectValuesAndConvertToTranslateObject(this.state.userTypedInput[inputKeys[i]])
        
      finalTranslateReadyList.push.apply(finalTranslateReadyList, result);
    }
    return finalTranslateReadyList;
  }

  grabArrayValuesAndConvertToTranslateObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = (key === "autotext") ? "val" : "name";
    return objectList.map(objectIndex => ({ "text": objectIndex[targetObjectKey]}))
  }

  grabObjectValuesAndConvertToTranslateObject(translationSection: object): object[] {
    return Object.keys(translationSection).map(key => ({"text": translationSection[key]}));
  }

  divideListInHalf(list: string[]): string[][] {
    let halfwayPoint = Math.floor(list.length / 2);
    return [list.slice(0, halfwayPoint), list.slice(halfwayPoint, list.length)];
  }

  translate(firstTranslateList: object[], secondTranslateList: object[]): void {
    console.log(firstTranslateList);
    console.log(secondTranslateList);
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
        <button onClick={this.setToLoadingAndTranslate} disabled={!isValidJSON} className="translate-button">{isValidJSON === true ? "Translate" : "Not Valid JSON"}</button>
      </section>
    </main>);
  }
}
