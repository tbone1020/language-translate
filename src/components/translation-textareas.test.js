import React from 'react';
import TranslationInput from './translation-input';
import TranslationOutput from './translation-output';
import renderer from 'react-test-renderer';
 
it('Renders translation input textarea', () => {
    const translationInput = renderer
        .create(<TranslationInput />)
        .toJSON();
    expect(TranslationInput).toMatchSnapshot();
});

it('Renders translation output textarea', () => {
    const translationOutput = renderer
        .create(<TranslationOutput translationList={null} />)
        .toJSON();
    expect(TranslationOutput).toMatchSnapshot();
});

it('Renders without translation results', () => {
    const translationOutput = renderer
        .create(<TranslationOutput translationsList={null}/>)
        .toJSON();
    expect(translationOutput).toMatchSnapshot();
});

it('Renders with translation results', () => {
    const mockTranslation = JSON.stringify({
        "test": "Text for test key #1",
        "test_2": "Text for test key #2"
    });
    const translationOutput = renderer
        .create(<TranslationOutput translationsList={mockTranslation}/>)
        .toJSON();
    expect(translationOutput).toMatchSnapshot();
});