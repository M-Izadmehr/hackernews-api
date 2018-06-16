import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './style.scss';
import LoadingCard from './LoadingCard';
import templateLoremIpsumText from './templateLoremIpsumText';
import { getStoryDetailsAction } from '../../containers/HomePage/actions';

export class CardData extends React.PureComponent {

  componentDidMount() {
    // If we are using infinite scrolling, the parent fetches and provides card data for this component
    // However, if we use singlePageConcurrentlyManagedFetches, each card is responsible for fetching its own data based on its visibility
    this.props.getDetailsByCard && this.fetchDataByCard(); // eslint-disable-line no-unused-expressions
  }

  fetchDataByCard = () => {
    const { isVisible, storyItem } = this.props;
    // if component stays visible for more than 500ms, and has no data, then fetch data
    const oldVisibility = isVisible;
    setTimeout(() => {
      const hasData = storyItem && storyItem.data && storyItem.data.title;
      if (oldVisibility && this.props.isVisible && !hasData) {
        this.props.getStoryDetails(this.props.id);
      }
    }, 1000);
  };


  render() {
    const { storyItem, open } = this.props;
    // Define component states
    const isLoading = !storyItem || storyItem.loading;
    const hasData = storyItem && storyItem.data.title;
    const hasError = storyItem && storyItem.error;

    // Define the storyText
    let storyText = hasData && storyItem.data.text ? storyItem.data.text : templateLoremIpsumText;
    storyText = !open ? `${storyText.substring(0, 70)}...` : storyText;

    return (
      <div
        className={`data-container ${hasData ? 'has-data' : ''}`}
      >
        {isLoading && <LoadingCard />}
        {hasData && <div className="data">
          <div>
            <h5
              className="story-title"
            >{!open && storyItem.data.title.length > 40 ? `${storyItem.data.title.substring(0, 40)}...` : storyItem.data.title}</h5>
            <div className="score-badge">
              <div className="outline">{storyItem.data.score}</div>
            </div>
            <small>By {storyItem.data.by}</small>
          </div>
          <div className="story-text">{ReactHtmlParser(storyText)}</div>
        </div>}
        {hasError && <div className="error">Error!</div>}
      </div>
    );
  }
}

CardData.propTypes = {
  id: propTypes.number.isRequired,
  isVisible: propTypes.bool.isRequired,
  getDetailsByCard: propTypes.bool.isRequired,
  open: propTypes.bool.isRequired,
  storyItem: propTypes.object,
  getStoryDetails: propTypes.func,
};

function mapStateToProps(state, ownProps) {
  const storyItem = state.toJS().topStories.storyDetails[ownProps.id];
  return { storyItem };
}

function mapDispatchToProps(dispatch) {
  return {
    getStoryDetails: (id) => dispatch(getStoryDetailsAction(id, false, -1)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardData);
