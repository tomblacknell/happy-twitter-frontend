import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';
import ApiUtils from '../utils/ApiUtils';
import CircularProgress from 'material-ui/CircularProgress';

/*
 TweetRateBarChart.js
 Authored by Tom Blacknell

 Draws the tweet rate bar chart using the Semiotic data vis library
 */

class TweetRateBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, data:[], tweetRate:[], isLoaded:false };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.fetchTweetRate();
    }

    // when component is receiving new time span, get tweet rate
    componentWillReceiveProps(nextProps) {
        ApiUtils.fetchTweetRate(nextProps.weekView ? 1 : 0)
            .then(this.handleFetchTweetRateSuccess)
            .catch(this.handleFetchTweetRateFailure);
    }

    // listen to window resizing event to make bar chart responsive
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    // make request to API for tweet rate metrics
    fetchTweetRate = () => {
        ApiUtils.fetchTweetRate(this.props.weekView ? 1 : 0)
            .then(this.handleFetchTweetRateSuccess)
            .catch(this.handleFetchTweetRateFailure);
    };

    // once received, map tweet rate data to a valid format for OrdinalFrame component
    handleFetchTweetRateSuccess = response => {
        console.log("Succeeded in fetching tweet rate");

        let res = JSON.parse(response);
        let result = res.map(point => ({ time: point._id.dayOfYear+':'+point._id.hour+':'+point._id.interval, tweets: point.count }));

        let final = result.sort(function (a, b) {
            if (parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]) === 0) {
                return parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1]);
            } else {
                return parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]);
            }
        });

        this.setState({data:final, isLoaded:true});
    };

    handleFetchTweetRateFailure = error => {
        console.log("Failed to fetch tweet rate");
    };

    // remove window resizing listener when component unmounts
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    // when window resizes, update the width and height in state
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    // render the chart using OrdinalFrame from Semiotic
    render() {
        const isLoaded = this.state.isLoaded;
        const data = this.state.data;
        const width = this.state.width-30;
        const height = 50;

        return (
            <div style={{width:width, height:height}}>
                {isLoaded ?
                        <OrdinalFrame
                            size={[width, height]}
                            data={data}
                            oAccessor={"time"}
                            rAccessor={"tweets"}
                            style={{ fill: "#00bcd4", stroke: "white" }}
                            type={"bar"}
                            rLabel={true}
                        />
                    :<CircularProgress style={{marginLeft:width/2}}/>
                }
            </div>
        );
    }
}

export default TweetRateBarChart;