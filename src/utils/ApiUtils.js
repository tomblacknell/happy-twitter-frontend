import axios from 'axios';

/*
 ApiUtils.js
 Authored by Tom Blacknell

 Uses axios library to make HTTP requests to the back-end subsystem
 */

// root URL for the API
const host = 'http://localhost:8000/api';

// API endpoints
const endpoints = {
    totalTweets: { get: weekView => `${host}/total-tweets/${weekView}` },
    tweetsByLocation: { get: () => `${host}/tweets-today/` },
    tweetRate: { get: weekView => `${host}/tweet-rate/${weekView}` },
    latestTweets: { get: () => `${host}/latest-tweets/` },
    tweetLocations: { get: weekView => `${host}/tweet-locations/${weekView}`},
    topicExplore: { get: weekView => `${host}/topic-explore/${weekView}`},
    regionStats: { get: params => `${host}/region-stats/${params.regionName}/${params.weekView}` },
    topics: { get: weekView => `${host}/topics/${weekView}`}
};

// GET request function builder
const fetch = endpoint => endPointParams =>
    new Promise((resolve, reject) => {
        axios.get(endpoint.get(endPointParams))
            .then(response => {
                resolve(response.data);
            })
            .catch(reject);
    });

export default {
    fetchTotalTweets: fetch(endpoints.totalTweets),
    fetchTweetsByLocation: fetch(endpoints.tweetsByLocation),
    fetchTweetRate: fetch(endpoints.tweetRate),
    fetchLatestTweets: fetch(endpoints.latestTweets),
    fetchTweetLocations: fetch(endpoints.tweetLocations),
    fetchTopicExplore: fetch(endpoints.topicExplore),
    fetchRegionStats: fetch(endpoints.regionStats),
    fetchTopics: fetch(endpoints.topics)
};