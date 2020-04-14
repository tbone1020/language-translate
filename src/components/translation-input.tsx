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

  handleTranslations(e): void {
    if (this.isValidJSON(e.target.value)) {
      this.props.updateMainState({ isValidJSON: true });
      this.activateTranslateButtonIfJSONHasProperties(e.target.value);
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

  activateTranslateButtonIfJSONHasProperties(inputText: string): void {
    let inputTextsProperties = Object.keys(JSON.parse(inputText));
    if (inputTextsProperties.length > 0) {
      this.updateState(inputText);
    } else {
      this.props.updateMainState({ isValidJSON: false });
    }
  }

  updateState(input: string): void {
    this.props.updateMainState({
      userTypedInput: JSON.parse(input)
    });
  }

  render() {
    return (<div className="textarea-wrapper">
      <textarea onChange={this.handleTranslations} name="translation-input" id="translation-input" className="translation-textarea"></textarea>
    </div>);
  }
}
