import React from 'react';
import Header from './components/header';
import TranslationInput from './components/translation-input';
import TranslationOutput from './components/translation-output';
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
    this.translateUsersInput = this.translateUsersInput.bind(this);
  }

  updateMainState(newState: object): void {
    this.setState(newState);
  }

  translateUsersInput(): void {
    let listWithoutCountKeys = Object.keys(this.state.userTypedInput).filter(key => key.indexOf('Count') === -1);
    let listSeparatedInHalf = this.splitListInHalf(listWithoutCountKeys);
    this.translate(this.convertToTranslateReadyObject(listSeparatedInHalf[0]), this.convertToTranslateReadyObject(listSeparatedInHalf[1]));
  }

  splitListInHalf(list: string[]): string[][] {
    let halfwayPoint = Math.ceil(list.length / 2);
    return [list.slice(0, halfwayPoint), list.slice(halfwayPoint, list.length)];
  }
  
  convertToTranslateReadyObject(inputKeys: string[]): object[] {
    const finalTranslateReadyList: object[] = [];
    for (let i = 0; i < inputKeys.length; i++) {
      let translateReadyList = (Array.isArray(this.state.userTypedInput[inputKeys[i]]))
        ? this.grabArrayValuesAndConvertToTranslateObject(inputKeys[i], this.state.userTypedInput[inputKeys[i]])
        : this.convertObjectValuesToTranslateObject(this.state.userTypedInput[inputKeys[i]])
        
      finalTranslateReadyList.push.apply(finalTranslateReadyList, translateReadyList);
    }
    return finalTranslateReadyList;
  }

  grabArrayValuesAndConvertToTranslateObject(key: string, objectList: object[]): object[] {
    let targetObjectKey = (key === "autotext") ? "val" : "name";
    return objectList.map(objectIndex => ({ "text": objectIndex[targetObjectKey]}))
  }

  convertObjectValuesToTranslateObject(translationSection: object): object[] {
    return Object.keys(translationSection).map(key => ({"text": translationSection[key]}));
  }

  translate(firstTranslateList: object[], secondTranslateList: object[]): void {
    // Translate the text
    const combinedtranslations: object[] = [{}];
    // Fetch the translations...

    // Combine  The arrays back together for mapping
    this.mapTranslationsBackToUserInput(mockTranslation);
  }

  mapTranslationsBackToUserInput(translationList: object[]): void {
    const copyOfUserInput = Object.assign({}, this.state.userTypedInput);
    for (let key in copyOfUserInput) {
      if (copyOfUserInput[key] instanceof Object) {
        let translationsForThisObjectKey = translationList.splice(0, Object.keys(copyOfUserInput[key]).length);
        if (Array.isArray(copyOfUserInput[key])) {
          let targetKey = (key === "autotext") ? "val" : "name";
          for (let i = 0; i < copyOfUserInput[key].length; i++) {
            let translationObject: any = translationsForThisObjectKey.shift();
            copyOfUserInput[key][i][targetKey] = translationObject.text;
          }
        } else {
          for (let subKey in copyOfUserInput[key]) {
            let translationObject: any = translationsForThisObjectKey.shift();
            copyOfUserInput[key][subKey] = translationObject.text;
          }
        }
      }
    }
    this.setState({
      translationList: JSON.stringify(copyOfUserInput),
      isLoading: false
    });
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
        <button onClick={this.translateUsersInput} disabled={!isValidJSON} className="translate-button">
          {isValidJSON === true ? "Translate" : "Not Valid JSON"}
        </button>
      </section>
    </main>);
  }
}
