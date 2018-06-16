import React from 'react';
import propTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import StoryCard from '../../components/StoryCard';
import LoadingCard from '../../components/StoryCard/LoadingCard';
import './style.scss';
import { clearStoriesAction, getTopStoriesAction } from './actions';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.clearStories();
  }

  componentDidMount() {
    this.props.getTopStories();
  }

  render() {
    const { error, loading, stories } = this.props;
    return (
      <div className="cont-HomePage">
        {error && <div>Error: {error}</div>}
        <div className="grid-container">
          {loading && new Array(20).fill(null).map(() => <LoadingCard key={Math.random()} />)}
          {stories.length > 0 && stories.map((id) => <StoryCard key={id} id={id} getDetailsByCard />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, error, stories } = state.toJS().topStories;
  return { loading, error, stories };
}

function mapDispatchToProps(dispatch) {
  return {
    getTopStories: () => dispatch(getTopStoriesAction()),
    clearStories: () => dispatch(clearStoriesAction()),
  };
}

HomePage.propTypes = {
  loading: propTypes.bool,
  error: propTypes.oneOfType([propTypes.string, propTypes.object]),
  stories: propTypes.array,
  getTopStories: propTypes.func,
  clearStories: propTypes.func,
};

const withReducer = injectReducer({ key: 'topStories', reducer });
const withSaga = injectSaga({ key: 'topStories', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
