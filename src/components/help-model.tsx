import React from 'react';
import './help-model.css';

interface IProps {
    shouldHelpModelShow: boolean;
    updateMainState: Function;
}

export default class HelpModel extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    hideModelWhenBackgroundIsClicked(): void {
        this.props.updateMainState({
            isModelShowing: false
        });
    }

    render() {
        const { shouldHelpModelShow } = this.props;
        return(<section id="help-model-container" className={shouldHelpModelShow === true ? "show-model" : "hide-model"}>
            <div onClick={() => this.hideModelWhenBackgroundIsClicked()} id="model-overlay" className={shouldHelpModelShow === true ? "fadein transition" : "hidden"}></div>
            <div id="help-model" className={shouldHelpModelShow === true ? "fadein transition" : "hidden"}>
                <h1>Destini Translator</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed laudantium aliquid repellat, sint, minus harum iure dignissimos quibusdam temporibus et, dolore tenetur numquam molestias maxime? Nemo ea reprehenderit sapiente.</p>
            </div>
        </section>)
    }
}