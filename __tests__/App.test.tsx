/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import 'react-redux';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../src/store';

it('renders correctly', () => {
  renderer.create(<App />);
});

test('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(tree).toBeTruthy();
  expect(tree.toJSON()).toMatchSnapshot();
});

jest.mock('Text', () => {
  const RealComponent = jest.requireActual('Text');
  const React = require('react');
  class Text extends React.Component {
    render() {
      return React.createElement('Text', this.props, this.props.children);
    }
  }
  Text.propTypes = RealComponent.propTypes;
  return Text;
});
