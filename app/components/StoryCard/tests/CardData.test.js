import React from 'react';
import { shallow } from 'enzyme';
import { CardData } from '../CardData';

describe('<CardData />', () => {
  it('render the loading card', () => {
    const mockProps = {
      id: 100,
      isVisible: true,
      getDetailsByCard: false,
      open: false,
      storyItem: { loading: true, data: {}, error: null },
    };
    const wrapper = shallow(<CardData {...mockProps} />);
    expect(wrapper.find('LoadingCard')).toHaveLength(1);
    expect(wrapper.find('.data')).toHaveLength(0);
    expect(wrapper.find('.error')).toHaveLength(0);
  });

  it('should show error when fetching fails', () => {
    const mockProps = {
      id: 100,
      isVisible: true,
      getDetailsByCard: false,
      open: false,
      storyItem: { loading: false, data: {}, error: 'some error' },
    };
    const wrapper = shallow(<CardData {...mockProps} />);
    expect(wrapper.find('LoadingCard')).toHaveLength(0);
    expect(wrapper.find('.data')).toHaveLength(0);
    expect(wrapper.find('.error')).toHaveLength(1);
  });

  it('should render card, when data is provided', () => {
    const mockProps = {
      id: 100,
      isVisible: true,
      getDetailsByCard: false,
      open: false,
      storyItem: {
        loading: false,
        data: { title: 'title', by: 'author', text: 'Lorem Ipsum...', score: '100' },
        error: null,
      },
    };
    const wrapper = shallow(<CardData {...mockProps} />);
    expect(wrapper.find('LoadingCard')).toHaveLength(0);
    expect(wrapper.find('.error')).toHaveLength(0);
    expect(wrapper.find('.data')).toHaveLength(1);
    expect(wrapper.find('.outline')).toHaveLength(1);
    expect(wrapper.find('.outline').text()).toEqual(mockProps.storyItem.data.score);
  });
});
