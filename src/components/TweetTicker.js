import React, { Component } from 'react';

class TweetTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {tweets:["@tim: Just got a promotion - I'm so happy!! :)"]}
    }

    handleNewTweet(newTweet) {
        let tweets = this.state.tweets;
        tweets.shift();
        tweets.unshift(newTweet);
        this.setState({tweets:tweets});
        console.log(this.state.tweets);
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

        return (
            <div style={{padding: 0}}>
                <marquee style={style} behavior="scroll" direction="left">
                    <span style={text_style}>{this.state.tweets[0]}</span>
                </marquee>
            </div>
        );
    }
}

export default TweetTicker;