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
    const { isModelShowing, updateMainState } = this.props;
    console.log(this.props);
  }

  render() {
    return (<header>
      <div className="header-wrapper">
        <h1 className="header-logo">
          <img src={destinilogo} alt="destini logo"/>
          <span className="logo-sub-text"> translator</span>
        </h1>
        <figure onClick={() => this.showHelpModel()} className="help-icon">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </figure>
      </div>
    </header>);
  }
}

