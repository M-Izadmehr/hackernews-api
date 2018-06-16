import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import App from '../index';
import Header from '../../../components/Header'; // eslint-disable-line
import Footer from '../../../components/Footer'; // eslint-disable-line

describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('should render page header', () => {
    const shallowRenderer = shallow(<App />);
    expect(shallowRenderer.find('Header')).toHaveLength(1);
  });
  it('should render page Footer', () => {
    const shallowRenderer = shallow(<App />);
    expect(shallowRenderer.find('Footer')).toHaveLength(1);
  });
});
