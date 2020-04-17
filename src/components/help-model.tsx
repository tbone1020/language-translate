import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
                <p className="model-text">Use the <a target="_blank" href="../data/language-template.json">JSON language template</a> to add all english translations required for locator. Once done, input the JSON text into the language translations input (Left input). If the JSON is valid, the button will become active with the text "Translate".</p>
                <p className="model-text">Once your translations are complete, you can copy the output and paste it in the client's International Configuration export input and click <span className="apply-btn">Apply</span></p>
                <p className="model-text">You can validate your JSON by going to <a target="_blank" href="https://jsonlint.com/">https://jsonlint.com/</a></p>
            </div>
        </section>)
    }
}