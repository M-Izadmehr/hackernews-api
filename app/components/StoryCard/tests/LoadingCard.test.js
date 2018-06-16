import React from 'react';
import { shallow } from 'enzyme';
import LoadingCard from '../LoadingCard';

describe('<LoadingCard />', () => {
  const shallowRenderer = shallow(<LoadingCard />);
  it('should render loading container', () => {
    expect(shallowRenderer.find('.comp-storyCard.loading-card')).toHaveLength(1);
  });
});
