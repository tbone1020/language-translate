import React from 'react';
import './translation.css';

interface IProps {
  updateMainState: Function;
}

export default class TranslationInput extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handleTranslations = this.handleTranslations.bind(this);
  }

  handleTranslations({target: {value}}): void {
    if (this.isValidJSON(value)) {
      this.enableButtonIfJSONHasProperties(JSON.parse(value));
    } else {
      this.props.updateMainState({ isValidJSON: false });
    }
  }

  isValidJSON(input: string): boolean {
    try {
      JSON.parse(input);
    } catch(e) {
      return false;
    }
    
    return true;
  }

  enableButtonIfJSONHasProperties(inputText: string): void {
    let inputTextKeys = Object.keys(inputText);
    if (inputTextKeys.length > 0) {
      this.props.updateMainState({ userTypedInput: inputText, isValidJSON: true });
    } else {
      this.props.updateMainState({ isValidJSON: false });
    }
  }

  render() {
    return (
    <div className="textarea-wrapper left-align">
      <h2 className="from-text">English</h2>
      <textarea placeholder="Enter Valid JSON" onChange={this.handleTranslations} name="translation-input" id="translation-input" className="translation-textarea"></textarea>
    </div>);
  }
}
