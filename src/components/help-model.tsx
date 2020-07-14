import React, { createRef } from 'react';
import data from '../data/language-template.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './help-model.css';

interface IProps {
    shouldHelpModelShow: boolean;
    updateMainState: Function;
}

export default class HelpModel extends React.Component<IProps, {}> {

    constructor(props) {
        super(props);
    }

    hideModel(): void {
        this.props.updateMainState({
            isModelShowing: false
        });
    }

    render() {
        const { shouldHelpModelShow } = this.props;
        
        return(<section id="help-model-container" className={shouldHelpModelShow === true ? "show-model" : "hide-model"}>
            <div onClick={() => this.hideModel()} id="model-overlay" className={shouldHelpModelShow === true ? "fadein transition" : "hidden"}></div>
            <div id="help-model" className={shouldHelpModelShow === true ? "fadein transition" : "hidden"}>
                <div onClick={() => this.hideModel()} className="close-model">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <h1 className="model-header">Destini Translator</h1>
                <h3 className="model-sub-header">How To Use:</h3>
                <ul id="">
                    <li className="model-text">
                        Copy the JSON language template below and paste into the English export field of the International Configuration. This JSON file has all the values that the locator requires.
                    </li>
                    <li className="model-text">
                        Within the International Configuration model, fill out all the required fields according to the locators design.
                    </li>
                    <li className="model-text">
                        Copy and paste the JSON from the export field into the Destini translator under the "English" header. If the JSON is valid the button will become active. You can validate your JSON by using <a target="_blank" rel="noopener noreferrer" href="https://jsonlint.com/">https://jsonlint.com/</a>. 
                    </li>
                    <li className="model-text">
                        Select the desired language and click "TRANSLATE".
                    </li>
                    <li className="model-text">
                        Once your translations are complete, you can copy the output and paste it in the client's International Configuration export field and click <span className="apply-btn">Apply</span>.
                    </li>
                </ul>
                <section id="json-template">
                    <textarea id="json-template-field" readOnly={true} value={ JSON.stringify(data, null, 5) }></textarea>
                </section>   
            </div>
        </section>)
    }
}