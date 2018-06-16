const baseRoute = 'https://hacker-news.firebaseio.com/v0/';
export const topStoriesAPI = `${baseRoute}topstories.json?print=pretty`;
export const storyItemAPI = (id) => `${baseRoute}/item/${id}.json?print=pretty`;

