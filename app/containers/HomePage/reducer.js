import { fromJS } from 'immutable';
import {
  GET_STORY_DETAILS_LOADING, GET_STORY_DETAILS_SUCCESSFUL,
  GET_TOP_STORIES_ERROR,
  GET_TOP_STORIES_LOADING,
  GET_TOP_STORIES_SUCCESSFUL,
  CLEAR_STORIES,
} from './constants';

const initialState = fromJS({
  loading: true,
  stories: [],
  storyDetails: {},
  error: null,
  fetchedCards: 0,
});

const initialStoryTemplate = fromJS({
  loading: true,
  data: {},
  error: null,
});
export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_STORIES:
      return state
        .set('storyDetails', fromJS({}));

    case GET_TOP_STORIES_LOADING:
      return state
        .set('loading', true)
        .set('error', null)
        .set('fetchedCards', 0)
        .set('stories', []);

    case GET_TOP_STORIES_SUCCESSFUL:
      return state
        .set('loading', false)
        .set('error', null)
        .set('stories', action.payload);

    case GET_TOP_STORIES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.payload)
        .set('stories', [])
        .set('fetchedCards', 0);

    case GET_STORY_DETAILS_LOADING:
      return state
        .setIn(['storyDetails', action.payload], initialStoryTemplate);

    case GET_STORY_DETAILS_SUCCESSFUL:
      return state
        .set('fetchedCards', action.payload.fetchedCards)
        .setIn(['storyDetails', action.payload.id, 'loading'], false)
        .setIn(['storyDetails', action.payload.id, 'error'], null)
        .setIn(['storyDetails', action.payload.id, 'data'], action.payload.data);
    default:
      return state;
  }
}
