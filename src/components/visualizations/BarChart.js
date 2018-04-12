import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';
import ApiUtils from '../../utils/ApiUtils';
import CircularProgress from 'material-ui/CircularProgress';
import * as d3 from 'd3';
import { Axis } from 'semiotic';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, data:[], tweetRate:[], isLoaded:false };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.fetchTweetRate();
    }

    componentWillReceiveProps(nextProps) {
        ApiUtils.fetchTweetRate(nextProps.weekView ? 1 : 0)
            .then(this.handleFetchTweetRateSuccess)
            .catch(this.handleFetchTweetRateFailure);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    fetchTweetRate = () => {
        console.log("week view: " + this.props.weekView);

        ApiUtils.fetchTweetRate(this.props.weekView ? 1 : 0)
            .then(this.handleFetchTweetRateSuccess)
            .catch(this.handleFetchTweetRateFailure);
    };

    handleFetchTweetRateSuccess = response => {
        console.log("Succeeded in fetching tweet rate");
        //console.log(response);

        let res = JSON.parse(response);

        let result = res.map(point => ({ time: point._id.dayOfYear+':'+point._id.hour+':'+point._id.interval, tweets: point.count }));
        //console.log(result);

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

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {

        const barChartStyle = {
            position: 'fixed',
            left: '0px',
            bottom: '0px',
            height: '93px',
            width: '100%',
        };


        const isLoaded = this.state.isLoaded;
        const data = this.state.data;
        const width = this.state.width-30;
        const height = 50;

        const toolTipContent = {
            background: "white",
            border: "1px",
            color: "black",
            padding: "10px",
            zIndex: "99",
            minWidth: "120px"
        };

        function dateStringFromDay(year, day) {
            var date = new Date(new Date(year, 0).setDate(day));
            return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        }

        const offset = this.props.weekView ? width / 7 / 2 :  width / 30 / 2;
        const transform = "translate("+offset+",-20)";
        return (
            <div style={{width:width, height:height}}>
                {isLoaded ?
                        <OrdinalFrame
                            size={[width, height+50]}
                            data={data}
                            oAccessor={"time"}
                            rAccessor={"tweets"}
                            style={{ fill: "#00bcd4", stroke: "white" }}
                            type={"bar"}
                            oLabel={d => d.substr(3,3) == "0:0" ?
                                (<text style={{fontWeight:500, fontSize:"14px", color:"rgba(0, 0, 0, 0.54)"}} transform={transform}>{dateStringFromDay(2018,parseInt(d.substr(0,2)))}</text>)
                                :(<span></span>)
                            }
                            rLabel={true}
                        />
                    :<CircularProgress style={{marginLeft:width/2}}/>
                }
            </div>
        );
    }
}

export default BarChart;