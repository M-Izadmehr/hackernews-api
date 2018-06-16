import { put, takeLatest, takeEvery, call, cancel, fork, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  GET_STORY_DETAILS, GET_STORY_DETAILS_ERROR, GET_STORY_DETAILS_LOADING, GET_STORY_DETAILS_SUCCESSFUL,
  GET_TOP_STORIES, GET_TOP_STORIES_ERROR, GET_TOP_STORIES_LOADING,
  GET_TOP_STORIES_SUCCESSFUL, GET_STORY_DETAILS_INFINITE,
} from './constants';
import { topStoriesAPI, storyItemAPI } from '../../utils/ApiRoutes';

const takeSeveral = (pattern, saga, ...args) => fork(function* () { // eslint-disable-line
  let lastTask;
  const latestTasks = [];
  let taskCount = 0;
  while (true) { // eslint-disable-line
    const action = yield take(pattern);
    taskCount += 1;
    if (taskCount >= 25) {
      yield cancel(latestTasks[0]);
      latestTasks.shift();
    }
    lastTask = yield fork(saga, ...args.concat(action));
    latestTasks.push(lastTask);
  }
});

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function* getTopStories() {
  // On start fetching send loading action
  yield put({ type: GET_TOP_STORIES_LOADING });
  try {
    // start fetching data from server
    const data = yield call(fetchData, topStoriesAPI);
    // on successful fetch, send data action
    yield put({ type: GET_TOP_STORIES_SUCCESSFUL, payload: data });
  } catch (error) {
    // on any error send error action
    yield put({ type: GET_TOP_STORIES_ERROR, payload: error.message });
  }
}

function* getStoryDetails({ payload }) {
  const { id, infiniteScroll, fetchedCards } = payload;
  // If we use react lazy infinite scroll component, we do not need the delay and loading, it handles them automatically
  if (!infiniteScroll) {
    yield call(delay, 500);
    // On start fetching send loading action and create story field
    yield put({ type: GET_STORY_DETAILS_LOADING, payload: id });
  }
  try {
    // start fetching data from server
    const data = yield call(fetchData, storyItemAPI(id));
    // on successful fetch, send data action
    yield put({ type: GET_STORY_DETAILS_SUCCESSFUL, payload: { id, data, fetchedCards: fetchedCards + 1 } });
  } catch (error) {
    // on any error send error action
    yield put({ type: GET_STORY_DETAILS_ERROR, payload: { id, error: error.message } });
  }
}


export default function* mainAppSaga() {
  yield takeLatest(GET_TOP_STORIES, getTopStories);
  yield takeSeveral(GET_STORY_DETAILS, getStoryDetails);
  yield takeEvery(GET_STORY_DETAILS_INFINITE, getStoryDetails);
}
