import React, { Component } from 'react';
import './translation.css';

interface IProps {
  translationList: string;
}

export default class TranslationOutput extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div className="textarea-wrapper">
      <textarea value={this.props.translationList} readOnly={true} id="translation-output" className="translation-textarea"></textarea>
    </div>);
  }
}
