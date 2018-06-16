import { GET_TOP_STORIES, GET_STORY_DETAILS, CLEAR_STORIES } from './constants';

export function clearStoriesAction() {
  return {
    type: CLEAR_STORIES,
  };
}
export function getTopStoriesAction() {
  return {
    type: GET_TOP_STORIES,
  };
}

export function getStoryDetailsAction(id, infiniteScroll, fetchedCards) {
  return {
    type: GET_STORY_DETAILS,
    payload: { id, infiniteScroll, fetchedCards },
  };
}
