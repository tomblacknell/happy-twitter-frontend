import React, { Component } from 'react';
import BarChart from '../components/TweetRateBarChart';
import TreeMap from '../components/TopicTreemap';
import ApiUtils from '../utils/ApiUtils';
import Clock from 'react-live-clock';
import TweetTicker from "../components/TweetTicker";
import MapContainer from "../components/TweetMap";
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import RegionExplore from "../components/RegionalTopicDistributionPieChart";
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import ReactTooltip from 'react-tooltip'
import { reactLocalStorage } from 'reactjs-localstorage';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AdvancedTopicExplorer from '../components/AdvancedTopicExplorer';

/*
 Dashboard.js
 Authored by Tom Blacknell

 Component renders the dashboard layout and visualizations
*/

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen:false,
            totalTweets: 0,
            weekView: reactLocalStorage.getObject("settings").defaultTimeSpan,
            open:false,
            region:reactLocalStorage.getObject("settings").defaultLocation,
            timeFormat:reactLocalStorage.getObject("settings").timeFormat,
            treeMapWidth:60,
            settings:undefined,
            settingSavedAlertOpen:false,
            topicExplorerOpen: false
        };
        this.handleRegionChange = this.handleRegionChange.bind(this);
    }

    // event handler for default location setting change
    handleDefaultLocationChange(event, index, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                defaultLocation: value
            },
            settingSavedAlertOpen:true
        }));
    }

    // event handler for time format setting change
    handleTimeFormatChange(event, index, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                timeFormat: value
            },
            settingSavedAlertOpen:true
        }));
    }

    // event handler for default time span setting change
    handleDefaultTimeSpanChange(event, index, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                defaultTimeSpan: value
            },
            settingSavedAlertOpen:true
        }));
    }

    // make API call for  total tweet count
    fetchTotalTweets = () => {
        ApiUtils.fetchTotalTweets(this.state.weekView ? 1 : 0)
            .then(this.handleFetchTotalTweetsSuccess)
            .catch(this.handleFetchTotalTweetsFailure);
    };

    handleFetchTotalTweetsSuccess = response => {
        console.log("Succeeded in fetching total tweets");
        this.setState({totalTweets: JSON.parse(response)[0].count});
    };

    handleFetchTotalTweetsFailure = error => {
        console.log("Failed to fetch total tweets");
    };

    // when the component is ready to mount the DOM
    componentWillMount() {
        this.fetchTotalTweets();
        const settings = reactLocalStorage.getObject("settings");
        this.setState({settings:settings});
    }

    // update the local settings stoage
    updateSettings() {
        reactLocalStorage.setObject("settings", this.state.settings);
    }

    // after the component has mounted the DOM
    componentDidMount() {
        const width = document.getElementById("treemap").clientWidth;
        this.setState({treeMapWidth: width});
    }

    // closes the pop-up notifications
    handleRequestClose = () => {
        this.setState({
            open: false,
            settingSavedAlertOpen: false
        });
    };

    // change the region viewed in the regional topic distribution pie chart
    handleRegionChange(name) {
        this.setState({
            region: name
        });
    }

    // event handler for toggling the time span
    handleTimeSpanChanged() {
        let newTimeSpan = !this.state.weekView;
        this.setState({weekView:newTimeSpan, open:true}, function () {
            this.fetchTotalTweets();
        });
    }

    // open the topic explorer modal
    handleTopicExplorerOpen = () => {
        this.setState({topicExplorerOpen: true});
    };

    // close the topic explorer modal
    handleTopicExplorerClose = () => {
        this.setState({topicExplorerOpen: false});
    };

    // toggle open/closed the settings modal
    handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    // render the dashboard
    render() {
        const { settings } = this.state;
        const totalTweets = this.state.totalTweets;
        const weekView = this.state.weekView;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        const cardStyle = {marginTop:"5px", marginBottom:"5px"};
        const region = this.state.region;
        const formatted = this.state.timeFormat + ":mm:ss";

        this.updateSettings();

        return (
            <div>
                <AppBar
                    title={<Link style={{ textDecoration: 'none', color:'#FFF' }} to="/"><span style={{cursor: 'pointer'}}>HAPPY TWEETS</span></Link>}
                    iconElementRight={<FlatButton label="Settings" onClick={this.handleDrawerToggle} />}
                />

                <div class="container-fluid" style={{background:"#f2f2f2"}}>
                    <Drawer width={250} openSecondary={true} open={this.state.drawerOpen} >
                        <div style={{maxWidth: 250}}>
                            <h4 align="center" style={{marginTop:"18px"}}>Settings</h4>
                            <SelectField
                                floatingLabelText="Default Time Span"
                                value={settings.defaultTimeSpan}
                                onChange={this.handleDefaultTimeSpanChange.bind(this)}
                                style={{width:"200px", paddingLeft:"25px"}}
                                labelStyle={{paddingLeft:"12px"}}
                                floatingLabelStyle={{paddingLeft:"12px"}}
                            >
                                <MenuItem value={true} primaryText="7 Days" />
                                <MenuItem value={false} primaryText="30 Days" />
                            </SelectField>
                            <SelectField
                                floatingLabelText="Default Location"
                                value={settings.defaultLocation}
                                onChange={this.handleDefaultLocationChange.bind(this)}
                                style={{width:"200px", paddingLeft:"25px"}}
                                labelStyle={{paddingLeft:"12px"}}
                                floatingLabelStyle={{paddingLeft:"12px"}}
                            >
                                <MenuItem value={"Glasgow City"} primaryText="Glasgow" />
                                <MenuItem value={"City of Edinburgh"} primaryText="Edinburgh" />
                                <MenuItem value={"Highland"} primaryText="Highland"/>
                                <MenuItem value={"Cardiff"} primaryText="Cardiff"/>
                                <MenuItem value={"County Antrim"} primaryText="County Antrim"/>
                                <MenuItem value={"London"} primaryText="London"/>
                                <MenuItem value={"Highland"} primaryText="Highland"/>
                                <MenuItem value={"Highland"} primaryText="Highland"/>
                                <MenuItem value={"Greater Manchester"} primaryText="Manchester" />
                                <MenuItem value={"West Midlands"} primaryText="West Midlands" />
                                <MenuItem value={"Nottinghamshire"} primaryText="Nottinghamshire" />
                                <MenuItem value={"Lancashire"} primaryText="Lancashire" />
                                <MenuItem value={"Devon"} primaryText="Devon" />
                                <MenuItem value={"Staffordshire"} primaryText="Staffordshire" />
                                <MenuItem value={"Hampshire"} primaryText="Hampshire" />
                                <MenuItem value={"Tyne and Wear"} primaryText="Tyne and Wear" />
                                <MenuItem value={"Cambridgeshire"} primaryText="Cambridgeshire" />
                                <MenuItem value={"Leicestershire"} primaryText="Leicestershire" />
                                <MenuItem value={"Essex"} primaryText="Essex" />
                                <MenuItem value={"North Yorkshire"} primaryText="North Yorkshire" />
                                <MenuItem value={"Cheshire"} primaryText="Cheshire" />
                                <MenuItem value={"Kent"} primaryText="Kent" />
                                <MenuItem value={"East Sussex"} primaryText="East Sussex" />
                                <MenuItem value={"Derbyshire"} primaryText="Derbyshire" />
                                <MenuItem value={"Surrey"} primaryText="Surrey" />
                                <MenuItem value={"Somerset"} primaryText="Somerset" />
                                <MenuItem value={"Norfolk"} primaryText="Norfolk" />
                                <MenuItem value={"Suffolk"} primaryText="Suffolk" />
                                <MenuItem value={"Cornwall"} primaryText="Cornwall" />
                                <MenuItem value={"Oxfordshire"} primaryText="Oxfordshire" />
                                <MenuItem value={"Buckinghamshire"} primaryText="Buckinghamshire" />
                                <MenuItem value={"West Sussex"} primaryText="West Sussex" />
                                <MenuItem value={"Dorset"} primaryText="Dorset" />
                                <MenuItem value={"East Yorkshire"} primaryText="East Yorkshire" />
                                <MenuItem value={"Bristol"} primaryText="Bristol" />
                                <MenuItem value={"North Somerset"} primaryText="North Somerset" />
                                <MenuItem value={"Shropshire"} primaryText="Shropshire" />
                                <MenuItem value={"Berkshire"} primaryText="Berkshire" />
                                <MenuItem value={"West Yorkshire"} primaryText="West Yorkshire" />
                                <MenuItem value={"Wiltshire"} primaryText="Wiltshire" />
                                <MenuItem value={"County Durham"} primaryText="County Durham" />
                                <MenuItem value={"Lincolnshire"} primaryText="Lincolnshire" />
                                <MenuItem value={"Northumberland"} primaryText="Northumberland" />
                                <MenuItem value={"Cumbria"} primaryText="Cumbria" />
                                <MenuItem value={"Bedfordshire"} primaryText="Bedfordshire" />
                                <MenuItem value={"Herefordshire"} primaryText="Hertfordshire" />
                                <MenuItem value={"Northamptonshire"} primaryText="Northamptonshire" />
                                <MenuItem value={"Gloucestershire"} primaryText="Gloucestershire" />
                            </SelectField>
                            <SelectField
                                floatingLabelText="Time Format"
                                value={settings.timeFormat}
                                onChange={this.handleTimeFormatChange.bind(this)}
                                style={{width:"200px", paddingLeft:"25px"}}
                                labelStyle={{paddingLeft:"12px"}}
                                floatingLabelStyle={{paddingLeft:"12px"}}
                            >
                                <MenuItem value={"HH"} primaryText="24-hr" />
                                <MenuItem value={"hh"} primaryText="12-hour" />
                            </SelectField>
                            <FlatButton label="Close Settings" style={{marginTop:"12px"}} fullWidth={true} onClick={this.handleDrawerToggle} />
                        </div>
                    </Drawer>
                    <ReactTooltip place="top" type="dark" effect="solid"/>

                    <div class="row">
                        <div class="col-sm-2">
                            <Card style={{marginBottom:"10px", paddingTop:"5px", paddingBottom:"5px"}}>
                                <span style={{fontWeight:"500", color: "rgba(0, 0, 0, 0.87)",marginRight:"2em", marginLeft:"2em", display:"inline-block"}}>
                                    {date.toLocaleString('en-us', {  weekday: 'long' }) + " " + date.getDate() + " " + (monthNames[date.getMonth()+1]) + " " +date.getFullYear() + " "}
                                </span>
                                <Clock format={formatted} ticking={true} timezone={'Etc/GMT'} />
                            </Card>
                        </div>
                        <div class="col-sm-9">
                            <Card style={{marginBottom:"10px", paddingTop:"5px"}}>
                                <TweetTicker/>
                            </Card>
                        </div>
                        <div class="col-sm-1">
                            <Card
                                style={{marginBottom:"10px", paddingTop:"5px", paddingBottom:"5px", paddingLeft:"5px", paddingRight:"5px"}}
                                data-tip="Click to change"
                            >
                                        <div
                                            class="span12 text-center"
                                            style={{fontWeight:"500", cursor:"pointer"}}
                                            onClick={this.handleTimeSpanChanged.bind(this)}
                                        >
                                            {this.state.weekView ? "Past 7 days" : "Past 30 Days"}
                                        </div>
                            </Card>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12">
                                    <Card style={{marginTop:"5px", marginBottom:"5px", borderRadius:"2px 2px 0px 0px"}}>
                                        <CardHeader
                                            title={weekView ? "Region Explorer (Past 7 Days)" : "Region Explorer (Past 30 Days)"}
                                            subtitle="Click a region from the map to explore"
                                            data-tip="Click a region from the map to explore"/>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <MapContainer weekView={this.state.weekView} action={this.handleRegionChange} />
                                            </div>
                                            <div class="col-sm-6">
                                                {this.state.region ? <RegionExplore region={region} weekView={this.state.weekView}/> : <span></span>}
                                            </div>
                                        </div>

                                    </Card>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12">
                                    <Card style={cardStyle}>
                                        <CardHeader
                                            title={weekView ? "Topics (Past 7 Days)" : "Topics (Past 30 Days)"}
                                            subtitle="Top 10 Topics with the Top 8 Words per Topic"
                                            data-tip="Each topic is defined as a collection of terms, each colour represents a different topic"
                                        />
                                        <div id="treemap" style={{width:"100%"}}>
                                            <TreeMap weekView={weekView} width={this.state.treeMapWidth}/>
                                        </div>
                                        <CardActions>
                                            <RaisedButton secondary={true} onClick={this.handleTopicExplorerOpen} label="Advanced Topic Explorer" fullWidth={true} />
                                        </CardActions>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <Card style={cardStyle}>
                                <CardHeader
                                    title={weekView ? "Tweet Rate (Past 7 Days)" : "Tweet Rate (Past 30 Days)"}
                                    subtitle={totalTweets + " tweets"}
                                    data-tip="Number of tweets per 30 mins over past 7 days, or per 60 mins over past 30 days"
                                />
                                <BarChart weekView={weekView}/>
                            </Card>
                        </div>
                    </div>
                </div>

                <Snackbar
                    open={this.state.open}
                    message="Time span changed"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
                <Snackbar
                    open={this.state.settingSavedAlertOpen}
                    message="Setting saved"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog
                    title={weekView  ? "Advanced Topic Explorer (Past 7 Days)" : "Advanced Topic Explorer (Past 30 Days)"}
                    actions={[
                        <FlatButton
                            label="Close"
                            primary={true}
                            onClick={this.handleTopicExplorerClose}
                        />
                    ]}
                    modal={true}
                    contentStyle={{
                        width: '1240px',
                        height: '710px',
                        maxWidth: 'none',
                    }}
                    open={this.state.topicExplorerOpen}
                >
                    <p>An adaption of <a href="https://github.com/cpsievert/LDAvis">LDAvis</a>, a topic model visualization tool created by Carson Sievet and Kenneth E. Shirley.</p>
                    <AdvancedTopicExplorer weekView={weekView} />
                </Dialog>
            </div>
        );
    }
}

export default Dashboard;