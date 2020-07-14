import * as React from "react";
import destinilogo from '../images/destinilogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import './header.css';

interface IProps {
  isModelShowing: boolean;
  updateMainState: Function;
}

export default class Header extends React.Component<IProps, {}> {

  showHelpModel(): void {
    if (this.props.isModelShowing === false) {
      this.props.updateMainState({
        isModelShowing: true
      })
    }
  }

  render() {
    return (<header>
      <div id="header-wrapper">
        <h1 id="header-logo">
          <img src={destinilogo} alt="destini logo"/>
          <span id="logo-sub-text"> translator</span>
        </h1>
        <figure onClick={() => this.showHelpModel()} id="help-icon">
          <FontAwesomeIcon size="lg" icon={faQuestionCircle} />
        </figure>
      </div>
    </header>);
  }
}

