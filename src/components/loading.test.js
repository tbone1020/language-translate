import React from 'react';
import LoadingIcon from './loading';
import renderer from 'react-test-renderer';
 

it('Renders loading icon', () => {
    const loadingComponent = renderer
        .create(<LoadingIcon isLoading="true" />)
        .toJSON();
    expect(loadingComponent).toMatchSnapshot();
})

it('Renders no loading icon', () => {
    const loadingComponent = renderer
        .create(<LoadingIcon isLoading="false" />)
        .toJSON();
    expect(loadingComponent).toMatchSnapshot();
})