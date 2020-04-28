import React from 'react';
import './translation.css';

interface IProps {
  translationList: string;
  updateMainState: Function;
}

export default class TranslationOutput extends React.Component<IProps, {}> {
  
  constructor(props) {
    super(props);
    this.changeTranslateToLangauge = this.changeTranslateToLangauge.bind(this);
  }

  changeTranslateToLangauge(event): void {
    this.props.updateMainState({
      toLanguage: event.target.value,
      translationList: ""
    });
  }

  render() {
    return (<div className="textarea-wrapper right-align">
      <select onChange={this.changeTranslateToLangauge} name="languages" id="language-dropdown">
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="it">Italian</option>
        <option value="de">German</option>
      </select>
      <textarea value={this.props.translationList} readOnly={true} id="translation-output" className="translation-textarea"></textarea>
    </div>);
  }
}
