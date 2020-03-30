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
      let parsedTypedInput = Object.keys(JSON.parse(e.target.value));
      if (parsedTypedInput.length > 0) {
        this.updateState(e.target.value);
      } else {
        this.props.updateMainState({ isValidJSON: false });
      }
    }
  }

  isValidJSON(input: string): boolean {
    try {
      JSON.parse(input);
    } catch(e) {
      this.props.updateMainState({ isValidJSON: false });
      return false;
    }
    this.props.updateMainState({ isValidJSON: true });
    return true;
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
