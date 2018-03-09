import React, { Component } from 'react';
import BarChart from '../components/visualizations/BarChart';
import TreeMap from '../components/TreeMap';
import ApiUtils from '../utils/ApiUtils';
import LocationTable from '../components/LocationTable';

class LivePage extends Component {
    constructor(props) {
        super(props);
        this.state = { totalTweets: undefined };
    }

    fetchTotalTweets = () => {
        ApiUtils.fetchTotalTweets()
            .then(this.handleFetchTotalTweetsSuccess)
            .catch(this.handleFetchTotalTweetsFailure);
    };

    handleFetchTotalTweetsSuccess = response => {
        console.log("Succeeded in fetching total tweets");
        console.log(response);
        this.setState({totalTweets:response.total_tweets});
    };

    handleFetchTotalTweetsFailure = error => {
        console.log("Failed to fetch total tweets");
    };

    componentWillMount() {
        this.fetchTotalTweets();
    }

    render() {
        const totalTweets = this.state.totalTweets;
        return (
            <div class="keen-dashboard" style={{"padding-top":"40px"}}>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="chart-wrapper">
                                <div class="chart-title">
                                    Statistics
                                </div>
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <h3>Total Tweets: {totalTweets}</h3>
                                    </div>
                                </div>
                                <div class="chart-notes">
                                    Some general statistics
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="chart-wrapper">
                                <div class="chart-title">
                                    Top
                                </div>
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <TreeMap/>
                                    </div>
                                </div>
                                <div class="chart-notes">
                                    Notes about this chart
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="chart-wrapper">
                                <div class="chart-title">
                                    Tweets by Region (All-time)
                                </div>
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <LocationTable/>
                                    </div>
                                </div>
                                <div class="chart-notes">
                                    This table shows the number of tweets by region over all time.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="chart-wrapper">
                                <div class="chart-title">
                                    Tweet Rate (Past 24hrs)
                                </div>
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <BarChart />
                                    </div>
                                </div>
                                <div class="chart-notes">
                                    Tweets per 15 minutes over the past 24 hours.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LivePage;