import querystring from 'querystring';
import {sha1} from 'js-sha1';

function generateAuthHeader(xAuthKey, apiSecret, xAuthDate) {
  const sha1Hash = sha1.update(xAuthKey + apiSecret + xAuthDate).hex();

  return sha1Hash;
}

const BASE_API_URL = 'https://api.podcastindex.org/api/1.0/';

const PATH_SEARCH_BY_TERM = 'search/byterm';
const PATH_SEARCH_BY_TITLE = 'search/bytitle';
const PATH_SEARCH_EPISODE_BY_PERSON = 'search/byperson';
const PATH_ADD_BY_FEED_URL = 'add/byfeedurl';
const PATH_ADD_BY_ITUNES_ID = 'add/byitunesid';
const PATH_EPISODES_BY_FEED_ID = 'episodes/byfeedid';
const PATH_EPISODES_BY_FEED_URL = 'episodes/byfeedurl';
const PATH_EPISODES_BY_ITUNES_ID = 'episodes/byitunesid';
const PATH_EPISODES_BY_ID = 'episodes/byid';
const PATH_EPISODES_RANDOM = 'episodes/random';
const PATH_PODCASTS_BY_FEED_URL = 'podcasts/byfeedurl';
const PATH_PODCASTS_BY_FEED_ID = 'podcasts/byfeedid';
const PATH_PODCASTS_BY_ITUNES_ID = 'podcasts/byitunesid';
const PATH_PODCASTS_BY_GUID = 'podcasts/byguid';
const PATH_PODCASTS_BY_TAG = 'podcasts/bytag';
const PATH_PODCASTS_TRENDING = 'podcasts/trending';
const PATH_PODCASTS_DEAD = 'podcasts/dead';
const PATH_RECENT_FEEDS = 'recent/feeds';
const PATH_RECENT_EPISODES = 'recent/episodes';
const PATH_RECENT_NEWFEEDS = 'recent/newfeeds';
const PATH_RECENT_SOUNDBITES = 'recent/soundbites';
const PATH_VALUE_BY_FEED_ID = 'value/byfeedid';
const PATH_VALUE_BY_FEED_URL = 'value/byfeedurl';
const PATH_CATEGORIES_LIST = 'categories/list';
const PATH_HUB_PUBNOTIFIY = 'hub/pubnotify';

const qs = o => '?' + querystring.stringify(o);

/**
 * Processes the response from the API.
 * @param {Response} response - The response object from fetch.
 * @returns {Promise<Object>} - The parsed JSON body of the response.
 * @throws {Object} - An error object if the request failed.
 */
const withResponse = async response => {
  const body = await response.json();
  if (
    response.status === 500 ||
    (body.hasOwnProperty('status') && body.status === 'false')
  ) {
    const message = body.hasOwnProperty('description')
      ? body.description
      : 'Request failed.';
    throw {message, code: response.status};
  }
  return body;
};

/**
 * Custom fetch function with authentication headers.
 * @param {string} path - The API endpoint path.
 * @param {Object} queries - The query parameters.
 * @param {string} key - The API key.
 * @param {string} secret - The API secret.
 * @param {string} userAgent - The user agent string.
 * @returns {Promise<Object>} - The JSON response from the API.
 */
const customFetch = async (path, queries, key, secret, userAgent) => {
  const dt = Math.floor(Date.now() / 1000).toString();

  const headers = {
    'User-Agent': userAgent || 'PodcastIndexBot/@podcast@noagendasocial.com',
    'X-Auth-Date': dt,
    'X-Auth-Key': key,
    Authorization: generateAuthHeader(key, secret, dt),
  };

  const url = `${BASE_API_URL}${path}${qs(queries)}`;
  const response = await fetch(url, {headers});

  if (!response.ok) {
    return withResponse(response);
  }

  return await response.json();
};

/**
 * Creates a PodcastIndex API client.
 * @param {string} key - The API key.
 * @param {string} secret - The API secret.
 * @param {string} [userAgent] - The user agent string.
 * @returns {Object} - The PodcastIndex API client.
 */
export const podcastIndexApi = (key, secret, userAgent) => {
  if (!key || !secret) {
    throw new Error(
      'API Key and Secret are required from https://api.podcastindex.org/',
    );
  }

  const custom = async (path, queries) =>
    customFetch(path, queries, key, secret, userAgent);

  return {
    custom,

    /**
     * Searches for podcasts by term.
     * @param {string} q - The search query.
     * @param {string} [val] - Additional value parameter.
     * @param {boolean} [clean] - Whether to clean the results.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The search results.
     */
    searchByTerm: async (q, val = '', clean = false, fullText = false) => {
      const queries = {q};
      if (val !== '') {
        queries.val = val;
      }
      if (clean) {
        queries.clean = '';
      }
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_SEARCH_BY_TERM, queries);
    },

    /**
     * Searches for podcasts by title.
     * @param {string} q - The search query.
     * @param {string} [val] - Additional value parameter.
     * @param {boolean} [clean] - Whether to clean the results.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The search results.
     */
    searchByTitle: async (q, val = '', clean = false, fullText = false) => {
      const queries = {q};
      if (val !== '') {
        queries.val = val;
      }
      if (clean) {
        queries.clean = '';
      }
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_SEARCH_BY_TITLE, queries);
    },

    /**
     * Searches for episodes by person.
     * @param {string} q - The search query.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The search results.
     */
    searchEpisodesByPerson: async (q, fullText = false) => {
      const queries = {q};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_SEARCH_EPISODE_BY_PERSON, queries);
    },

    /**
     * Gets podcasts by feed URL.
     * @param {string} feedUrl - The feed URL.
     * @returns {Promise<Object>} - The podcast data.
     */
    podcastsByFeedUrl: async feedUrl =>
      custom(PATH_PODCASTS_BY_FEED_URL, {url: feedUrl}),

    /**
     * Gets podcasts by feed ID.
     * @param {string} feedId - The feed ID.
     * @returns {Promise<Object>} - The podcast data.
     */
    podcastsByFeedId: async feedId =>
      custom(PATH_PODCASTS_BY_FEED_ID, {id: feedId}),

    /**
     * Gets podcasts by iTunes ID.
     * @param {string} itunesId - The iTunes ID.
     * @returns {Promise<Object>} - The podcast data.
     */
    podcastsByFeedItunesId: async itunesId =>
      custom(PATH_PODCASTS_BY_ITUNES_ID, {id: itunesId}),

    /**
     * Gets podcasts by GUID.
     * @param {string} guid - The GUID.
     * @returns {Promise<Object>} - The podcast data.
     */
    podcastsByGUID: async guid => custom(PATH_PODCASTS_BY_GUID, {guid}),

    /**
     * Gets podcasts by tag.
     * @returns {Promise<Object>} - The podcast data.
     */
    podcastsByTag: async () =>
      custom(PATH_PODCASTS_BY_TAG, {'podcast-value': ''}),

    /**
     * Gets trending podcasts.
     * @param {number} [max=10] - Maximum number of results.
     * @param {string} [since] - Since timestamp.
     * @param {string} [lang] - Language code.
     * @param {string} [cat] - Category.
     * @param {string} [notcat] - Excluded category.
     * @returns {Promise<Object>} - The trending podcasts.
     */
    podcastsTrending: async (
      max = 10,
      since = null,
      lang = null,
      cat = null,
      notcat = null,
    ) => {
      const queries = {max, since, lang, cat, notcat};
      return custom(PATH_PODCASTS_TRENDING, queries);
    },

    /**
     * Gets dead podcasts.
     * @returns {Promise<Object>} - The dead podcasts.
     */
    podcastsDead: async () => custom(PATH_PODCASTS_DEAD),

    /**
     * Adds a podcast by feed URL.
     * @param {string} feedUrl - The feed URL.
     * @param {string} [chash] - Content hash.
     * @param {string} [itunesId] - iTunes ID.
     * @returns {Promise<Object>} - The result of the add operation.
     */
    addByFeedUrl: async (feedUrl, chash = null, itunesId = null) => {
      const queries = {url: feedUrl, chash, itunesid: itunesId};
      return custom(PATH_ADD_BY_FEED_URL, queries);
    },

    /**
     * Adds a podcast by iTunes ID.
     * @param {string} itunesId - The iTunes ID.
     * @returns {Promise<Object>} - The result of the add operation.
     */
    addByItunesId: async itunesId =>
      custom(PATH_ADD_BY_ITUNES_ID, {id: itunesId}),

    /**
     * Gets episodes by feed ID.
     * @param {string} feedId - The feed ID.
     * @param {string} [since] - Since timestamp.
     * @param {number} [max=10] - Maximum number of results.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The episodes.
     */
    episodesByFeedId: async (
      feedId,
      since = null,
      max = 10,
      fullText = false,
    ) => {
      const queries = {id: feedId, since, max};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_EPISODES_BY_FEED_ID, queries);
    },

    /**
     * Gets episodes by feed URL.
     * @param {string} feedUrl - The feed URL.
     * @param {string} [since] - Since timestamp.
     * @param {number} [max=10] - Maximum number of results.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The episodes.
     */
    episodesByFeedUrl: async (
      feedUrl,
      since = null,
      max = 10,
      fullText = false,
    ) => {
      const queries = {url: feedUrl, since, max};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_EPISODES_BY_FEED_URL, queries);
    },

    /**
     * Gets episodes by iTunes ID.
     * @param {string} itunesId - The iTunes ID.
     * @param {string} [since] - Since timestamp.
     * @param {number} [max=10] - Maximum number of results.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The episodes.
     */
    episodesByItunesId: async (
      itunesId,
      since = null,
      max = 10,
      fullText = false,
    ) => {
      const queries = {id: itunesId, since, max};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_EPISODES_BY_ITUNES_ID, queries);
    },

    /**
     * Gets an episode by ID.
     * @param {string} id - The episode ID.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The episode.
     */
    episodesById: async (id, fullText = false) => {
      const queries = {id};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_EPISODES_BY_ID, queries);
    },

    /**
     * Gets random episodes.
     * @param {number} [max=1] - Maximum number of results.
     * @param {string} [lang] - Language code.
     * @param {string} [cat] - Category.
     * @param {string} [notcat] - Excluded category.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The random episodes.
     */
    episodesRandom: async (
      max = 1,
      lang = null,
      cat = null,
      notcat = null,
      fullText = false,
    ) => {
      const queries = {max, lang, cat, notcat};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_EPISODES_RANDOM, queries);
    },

    /**
     * Gets recent feeds.
     * @param {number} [max=40] - Maximum number of results.
     * @param {string} [since] - Since timestamp.
     * @param {string} [cat] - Category.
     * @param {string} [lang] - Language code.
     * @param {string} [notcat] - Excluded category.
     * @returns {Promise<Object>} - The recent feeds.
     */
    recentFeeds: async (
      max = 40,
      since = null,
      cat = null,
      lang = null,
      notcat = null,
    ) => {
      const queries = {max, since, lang, cat, notcat};
      return custom(PATH_RECENT_FEEDS, queries);
    },

    /**
     * Gets recent episodes.
     * @param {number} [max=10] - Maximum number of results.
     * @param {string} [excludeString] - Excluded string.
     * @param {string} [before] - Before timestamp.
     * @param {boolean} [fullText] - Whether to include full text.
     * @returns {Promise<Object>} - The recent episodes.
     */
    recentEpisodes: async (
      max = 10,
      excludeString = null,
      before = null,
      fullText = false,
    ) => {
      const queries = {max, excludeString, before};
      if (fullText) {
        queries.fullText = '';
      }
      return custom(PATH_RECENT_EPISODES, queries);
    },

    /**
     * Gets recent new feeds.
     * @param {number} [max=20] - Maximum number of results.
     * @param {string} [since] - Since timestamp.
     * @returns {Promise<Object>} - The recent new feeds.
     */
    recentNewFeeds: async (max = 20, since = null) =>
      custom(PATH_RECENT_NEWFEEDS, {max, since}),

    /**
     * Gets recent soundbites.
     * @param {number} [max=20] - Maximum number of results.
     * @returns {Promise<Object>} - The recent soundbites.
     */
    recentSoundbites: async (max = 20) => custom(PATH_RECENT_SOUNDBITES, {max}),

    /**
     * Gets value by feed ID.
     * @param {string} feedId - The feed ID.
     * @returns {Promise<Object>} - The value.
     */
    valueByFeedId: async feedId => custom(PATH_VALUE_BY_FEED_ID, {id: feedId}),

    /**
     * Gets value by feed URL.
     * @param {string} feedUrl - The feed URL.
     * @returns {Promise<Object>} - The value.
     */
    valueByFeedUrl: async feedUrl =>
      custom(PATH_VALUE_BY_FEED_URL, {url: feedUrl}),

    /**
     * Gets the list of categories.
     * @returns {Promise<Object>} - The categories list.
     */
    categoriesList: async () => custom(PATH_CATEGORIES_LIST),

    /**
     * Publishes a notification to the hub by feed ID.
     * @param {string} feedId - The feed ID.
     * @returns {Promise<Object>} - The result of the notification.
     */
    hubPubNotifyById: async feedId => custom(PATH_HUB_PUBNOTIFIY, {id: feedId}),

    /**
     * Publishes a notification to the hub by feed URL.
     * @param {string} feedUrl - The feed URL.
     * @returns {Promise<Object>} - The result of the notification.
     */
    hubPubNotifyByUrl: async feedUrl =>
      custom(PATH_HUB_PUBNOTIFIY, {url: feedUrl}),
  };
};
