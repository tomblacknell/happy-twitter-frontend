import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

class TweetTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    isLoading = () => this.state.data === null;

    fetchLatestTweets = () => {
        ApiUtils.fetchLatestTweets()
            .then(this.handleFetchLatestTweetsSuccess)
            .catch(this.handleFetchLatestTweetsFailure);
    };

    handleFetchLatestTweetsSuccess = response => {
        console.log("Succeeded in fetching latest tweets");
        var data = [];
        JSON.parse(response).forEach(function(tweet) {
            data.push(tweet);
        });
        this.setState({data});
    };

    handleFetchLatestTweetsFailure = error => {
        console.log("Failed to fetch latest tweets");
    };

    handleNewTweet(newTweet) {
        let tweets = this.state.tweets;
        tweets.shift();
        tweets.unshift(newTweet);
        this.setState({tweets:tweets});
        console.log(this.state.tweets);
    };

    componentWillMount() {
        this.fetchLatestTweets();
    }

    render() {

        const style = {
            width: '100%',
            height: '30px',
            padding: '0px',
            margin: '0px'
        };

        const text_style = {
            display: 'inline-block',
            color: '#000',
            'margin-top': '8px'
        };

        if (this.isLoading()) {
            return <h1>Loading</h1>;
        }

        console.log("The latest tweets: ");
        console.log(this.state.data);

        let tickerString = this.state.data.map(function(tweet){
            return tweet.text;
        }).join(" ● ");

        return (
            <marquee>{tickerString}</marquee>
        );
    }
}

export default TweetTicker;