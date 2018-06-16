import { shallow } from 'enzyme';
import React from 'react';
import Footer from '../index';

describe('<Footer />', () => {
  const shallowRenderer = shallow(<Footer />);
  it('should render footer contaienr', () => {
    expect(shallowRenderer.find('.comp-footer')).toHaveLength(1);
  });
});
