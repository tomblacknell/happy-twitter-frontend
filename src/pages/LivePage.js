import React, { Component } from 'react';
import BarChart from '../components/visualizations/BarChart';
import TreeMap from '../components/TreeMap';
import ApiUtils from '../utils/ApiUtils';
import Clock from 'react-live-clock';
import TweetTicker from "../components/TweetTicker";
import MyFancyComponent from "../components/visualizations/Map";
import LocationTable from "../components/LocationTable";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

class LivePage extends Component {
    constructor(props) {
        super(props);
        this.state = { totalTweets: 0, weekView: true, open:false };
    }

    fetchTotalTweets = () => {
        ApiUtils.fetchTotalTweets(this.state.weekView ? 1 : 0)
            .then(this.handleFetchTotalTweetsSuccess)
            .catch(this.handleFetchTotalTweetsFailure);
    };

    handleFetchTotalTweetsSuccess = response => {
        console.log("Succeeded in fetching total tweets");
        console.log(response);
        this.setState({totalTweets: JSON.parse(response)[0].count});
    };

    handleFetchTotalTweetsFailure = error => {
        console.log("Failed to fetch total tweets");
    };

    componentWillMount() {
        this.fetchTotalTweets();
    }

    handleTimeSpanChange = (event, index, value) => this.setState({weekView:value, open:true});

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const totalTweets = this.state.totalTweets;
        const weekView = this.state.weekView;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();

        return (
            <div class="keen-dashboard" style={{"padding-top":"20px"}}>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="chart-wrapper">
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <SelectField
                                            floatingLabelText="Time Span"
                                            value={this.state.weekView}
                                            onChange={this.handleTimeSpanChange}
                                        >
                                            <MenuItem value={true} primaryText="Past Week" />
                                            <MenuItem value={false} primaryText="Past Month" />
                                        </SelectField>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="chart-wrapper">
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        <TweetTicker/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="chart-wrapper">
                                <div class="chart-stage">
                                    <div id="grid-1-1">
                                        {date.toLocaleString('en-us', {  weekday: 'long' }) + " " + date.getDate() + " " + (monthNames[date.getMonth()+1]) + " " +date.getFullYear() + " "}
                                        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Etc/GMT'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="chart-wrapper">
                                        <div class="chart-title">
                                            Activity Map
                                        </div>
                                        <div class="chart-stage">
                                            <div id="grid-1-1">
                                                <MyFancyComponent/>
                                            </div>
                                        </div>
                                        <div class="chart-notes">
                                            Notes about this chart
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="chart-wrapper">
                                        <div class="chart-title">
                                            Explore Region
                                        </div>
                                        <div class="chart-stage">
                                            <div id="grid-1-1">
                                                Blah blah blah
                                            </div>
                                        </div>
                                        <div class="chart-notes">
                                            Explore a region in more detail
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="chart-wrapper">
                                        <div class="chart-title">
                                            {weekView ? "Topics (Past Week)" : "Topics (Past Month)"}
                                        </div>
                                        <div class="chart-stage">
                                            <div id="grid-1-1">
                                                <TreeMap/>
                                                <a>Advanced Topic Explorer</a>
                                            </div>
                                        </div>
                                        <div class="chart-notes">
                                            Notes about this chart
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="chart-wrapper">
                                        <div class="chart-title">
                                            Statistics
                                        </div>
                                        <div class="chart-stage">
                                            <div id="grid-1-1">
                                                <h4>Total Tweets: {totalTweets}</h4>
                                            </div>
                                        </div>
                                        <div class="chart-notes">
                                            Some general statistics
                                        </div>
                                    </div>
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
                <Snackbar
                    open={this.state.open}
                    message="Time span changed"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default LivePage;