import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('<Header />', () => {
  const shallowRenderer = shallow(<Header />);
  it('should render Header contaienr', () => {
    expect(shallowRenderer.find('.comp-header')).toHaveLength(1);
  });
  it('should render Header Logo', () => {
    expect(shallowRenderer.find('.logo-container')).toHaveLength(1);
  });
  it('should render Header Buttons', () => {
    expect(shallowRenderer.find('Link')).toHaveLength(2);
  });
  it('First button should redirect to /', () => {
    expect(shallowRenderer.find('Link').get(0).props.to).toBe('/');
  });
  it('Second button should redirect to SinglePageConcurrent', () => {
    expect(shallowRenderer.find('Link').get(1).props.to).toBe('/SinglePageConcurrent');
  });
});
