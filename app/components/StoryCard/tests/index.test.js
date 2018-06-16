import React from 'react';
import { shallow } from 'enzyme';
import StoryCard from '../index';

describe('<StoryCard />', () => {
  const mockProps = { id: 100, getDetailsByCard: false };
  const shallowRenderer = shallow(<StoryCard {...mockProps} />);

  it('should render card container', () => {
    expect(shallowRenderer.find('.comp-storyCard')).toHaveLength(1);
  });

  it('should resize the card on clicking on it', () => {
    shallowRenderer.find('.comp-storyCard').simulate('click');
    expect(shallowRenderer.find('.open')).toHaveLength(1);
    expect(shallowRenderer.state().open).toBeTruthy();
  });

  it('should change the component to Visible', () => {
    shallowRenderer.find('VisibilitySensor').props().onChange(true);
    expect(shallowRenderer.state().isVisible).toBeTruthy();
  });
});
