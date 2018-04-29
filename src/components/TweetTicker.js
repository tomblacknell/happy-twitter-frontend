import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

/*
 TweetTicker.js
 Authored by Tom Blacknell

 Component creates HTML marquee with the 5 most recent tweets
 */

class TweetTicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    isLoading = () => this.state.data === null;

    // call API to get 5 latest tweets
    fetchLatestTweets = () => {
        ApiUtils.fetchLatestTweets()
            .then(this.handleFetchLatestTweetsSuccess)
            .catch(this.handleFetchLatestTweetsFailure);
    };

    // push the tweets into an array in the state
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

    componentWillMount() {
        this.fetchLatestTweets();
    }

    render() {
        if (this.isLoading()) {
            return <h1>Loading</h1>;
        }

        let links = this.state.data.map(tweet => <span style={{marginRight:"2em", marginLeft:"2em", display:"inline-block"}}><a style={{color: "#000000", opacity:"0.87"}} href={"http://twitter.com/any/status/"+tweet._id}>{tweet.text}</a></span>);

        return (
            <marquee>{links}</marquee>
        );
    }
}

export default TweetTicker;