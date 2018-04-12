import React, { Component } from 'react';
import BarChart from '../components/visualizations/BarChart';
import TreeMap from '../components/TreeMap';
import ApiUtils from '../utils/ApiUtils';
import Clock from 'react-live-clock';
import TweetTicker from "../components/TweetTicker";
import MapContainer from "../components/visualizations/Map";
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import RegionExplore from "../components/RegionExplore";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ReactTooltip from 'react-tooltip'
import { reactLocalStorage } from 'reactjs-localstorage';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AdvancedTopicExplorer from '../pages/AdvancedTopicExplorer';
import LocationTable from "../components/LocationTable";

class LivePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen:false,
            totalTweets: 0,
            weekView: reactLocalStorage.getObject("settings").defaultTimeSpan,
            open:false,
            region:reactLocalStorage.getObject("settings").defaultLocation,
            treeMapWidth:60,
            settings:undefined,
            settingSavedAlertOpen:false,
            topicExplorerOpen: false
        };
        this.handleRegionChange = this.handleRegionChange.bind(this);
    }

    handleDefaultLocationChange(event, index, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                defaultLocation: value
            },
            settingSavedAlertOpen:true
        }));
    }

    handleDefaultTimeSpanChange(event, index, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                defaultTimeSpan: value
            },
            settingSavedAlertOpen:true
        }));
    }

    fetchTotalTweets = () => {
        ApiUtils.fetchTotalTweets(this.state.weekView ? 1 : 0)
            .then(this.handleFetchTotalTweetsSuccess)
            .catch(this.handleFetchTotalTweetsFailure);
    };

    handleFetchTotalTweetsSuccess = response => {
        console.log("Succeeded in fetching total tweets");
        //console.log(response);
        this.setState({totalTweets: JSON.parse(response)[0].count});
    };

    handleFetchTotalTweetsFailure = error => {
        console.log("Failed to fetch total tweets");
    };

    componentWillMount() {
        this.fetchTotalTweets();
        const settings = reactLocalStorage.getObject("settings");
        this.setState({settings:settings});
    }

    updateSettings() {
        reactLocalStorage.setObject("settings", this.state.settings);
    }

    componentDidMount() {
        const width = document.getElementById("treemap").clientWidth;
        console.log("Div width: " + width);
        this.setState({treeMapWidth: width});
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
            settingSavedAlertOpen: false
        });
    };

    handleRegionChange(name) {
        this.setState({
            region: name
        });
    }

    handleTimeSpanChanged() {
        let newTimeSpan = !this.state.weekView;
        this.setState({weekView:newTimeSpan, open:true}, function () {
            this.fetchTotalTweets();
        });
    }

    handleTopicExplorerOpen = () => {
        this.setState({topicExplorerOpen: true});
    };

    handleTopicExplorerClose = () => {
        this.setState({topicExplorerOpen: false});
    };

    handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    render() {
        const { settings } = this.state;
        const totalTweets = this.state.totalTweets;
        const weekView = this.state.weekView;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        const cardStyle = {marginTop:"5px", marginBottom:"5px"};
        const region = this.state.region;

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
                                <MenuItem value={"London"} primaryText="London" />
                                <MenuItem value={"Hampshire"} primaryText="Hampshire" />
                                <MenuItem value={"Greater Manchester"} primaryText="Manchester" />
                                <MenuItem value={"Highland"} primaryText="Highland" />
                                <MenuItem value={"West Midlands"} primaryText="West Midlands" />
                                <MenuItem value={"City of Edinburgh"} primaryText="Edinburgh" />
                                <MenuItem value={"East Sussex"} primaryText="East Sussex" />
                                <MenuItem value={"Nottinghamshire"} primaryText="Nottinghamshire" />
                                <MenuItem value={"Devon"} primaryText="Devon" />
                                <MenuItem value={"Lancashire"} primaryText="Lancashire" />
                                <MenuItem value={"Staffordshire"} primaryText="Staffordshire" />
                                <MenuItem value={"Glasgow City"} primaryText="Glasgow" />
                                <MenuItem value={"Tyne and Wear"} primaryText="Tyne and Wear" />
                                <MenuItem value={"Cambridgeshire"} primaryText="Cambridgeshire" />
                                <MenuItem value={"North Yorkshire"} primaryText="North Yorkshire" />
                                <MenuItem value={"Essex"} primaryText="Essex" />
                                <MenuItem value={"Leicestershire"} primaryText="Leicestershire" />
                                <MenuItem value={"Kent"} primaryText="Kent" />
                                <MenuItem value={"Cheshire"} primaryText="Cheshire" />
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
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Etc/GMT'} />
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
                                            subtitle="Top 10 Topics with the Top 5 Words per Topic"
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
                    <AdvancedTopicExplorer weekView={weekView} />
                </Dialog>
            </div>
        );
    }
}

export default LivePage;