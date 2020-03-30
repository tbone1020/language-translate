import React, { Component } from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-result';
import LoadingIcon from './components/loading';
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
    let inputKeys = Object.keys(this.state.userTypedInput);
    const translateReadyList: Object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let keyType = this.getKeyType(this.state.userTypedInput[inputKeys[i]]);
      let translateList;
      if (keyType === "array") {
        translateList = this.grabValuesFromArrayInputAndConvertToTranslationObject(inputKeys[i], this.state.userTypedInput[inputKeys[i]]);
      } else {
        translateList = this.grabValuesFromObjectInputAndConvertToTranslationObject(this.state.userTypedInput[inputKeys[i]]);
      }
      translateReadyList.push.apply(translateReadyList, translateList);
    }
    let separatedTranslateList = this.splitListInHalf(translateReadyList);
    this.setState({
      translationList: JSON.stringify(separatedTranslateList)
    })
  }

  getKeyType(key: Object): string {
    return (Array.isArray(key) === true ? "array" : "object");
  };

  grabValuesFromArrayInputAndConvertToTranslationObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = (key === "autotext") ? "val" : "name";
    return objectList.map(objectIndex => ({ "text": `${key} ${objectIndex[targetObjectKey]}`}))
  }

  grabValuesFromObjectInputAndConvertToTranslationObject(translationSection: object): object[] {
    let objectKeys = Object.keys(translationSection);
    return objectKeys.map(key => ({"text": `${key} ${translationSection[key]}`}));
  }

  splitListInHalf(list: object[]): object[] {
    let halfwayPoint = Math.floor(list.length / 2);
    return [list.slice(0, halfwayPoint), list.slice(halfwayPoint, list.length)];
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
        <button onClick={this.setToLoadingAndTranslate} disabled={!isValidJSON} className="translate-button">{isValidJSON === true ? "Translate" : "JSON is not Valid"}</button>
      </section>
    </main>);
  }
}
