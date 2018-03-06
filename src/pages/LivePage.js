import React, { Component } from 'react';
import BarChart from '../components/visualizations/BarChart';
import TreeMap from '../components/TreeMap';
import ToolBar from '../components/ToolBar';
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
                <div id="container">
                    <ToolBar/>
                    <div id="body">
                        <h2>Live Page</h2>
                        <h3>Total Tweets: {totalTweets}</h3>
                        <LocationTable/>
                        <TreeMap/>
                    </div>
                    <div id="bottom">
                        <BarChart />
                    </div>
                </div>
        );
    }
}

export default LivePage;