import React from 'react';
import propTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import saga from './saga';
import reducer from './reducer';
import StoryCard from '../../components/StoryCard';
import LoadingCard from '../../components/StoryCard/LoadingCard';
import './style.scss';
import { clearStoriesAction, getStoryDetailsAction, getTopStoriesAction } from './actions';
import Spinner from './assets/spinner.gif';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.clearStories();
  }

  componentDidMount() {
    this.props.getTopStories();
  }

  loadItems = () => {
    const { fetchedCards } = this.props;
    this.props.getStoryDetails(this.props.stories[fetchedCards], fetchedCards);
  };

  renderLoading = () => (
    <div className="loading-spinner">
      <img src={Spinner} alt="loading..." title="loading..." width="100" height="100" />
    </div>
  );

  renderCards = () => {
    const { stories, fetchedCards } = this.props;
    return new Array(fetchedCards).fill(null).map((item, index) => {
      const elementId = stories[index];
      return <StoryCard key={elementId} id={elementId} getDetailsByCard={false} />;
    });
  };

  render() {
    const { error, loading, stories } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="cont-HomePage">
        <div className="grid-container">
          {loading && new Array(20).fill(null).map(() => <LoadingCard key={Math.random()} />)}
        </div>
        {stories.length > 0 && <InfiniteScroll
          loadMore={this.loadItems}
          hasMore={this.props.fetchedCards < 500}
          loader={this.renderLoading()}
        >
          <div className="grid-container">
            {this.renderCards()}
          </div>
        </InfiniteScroll>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, error, stories, fetchedCards } = state.toJS().topStories;
  return { loading, error, stories, fetchedCards };
}

function mapDispatchToProps(dispatch) {
  return {
    getTopStories: () => dispatch(getTopStoriesAction()),
    getStoryDetails: (id, fetchedCards) => dispatch(getStoryDetailsAction(id, true, fetchedCards)),
    clearStories: () => dispatch(clearStoriesAction()),
  };
}

HomePage.propTypes = {
  loading: propTypes.bool,
  error: propTypes.oneOfType([propTypes.string, propTypes.object]),
  stories: propTypes.array,
  fetchedCards: propTypes.number,
  getTopStories: propTypes.func,
  clearStories: propTypes.func,
  getStoryDetails: propTypes.func,
};

const withReducer = injectReducer({ key: 'topStories', reducer });
const withSaga = injectSaga({ key: 'topStories', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
