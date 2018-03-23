import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';
import ApiUtils from '../../utils/ApiUtils';
import CircularProgress from 'material-ui/CircularProgress';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, data:[], tweetRate:[], isLoaded:false };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.fetchTweetRate();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    fetchTweetRate = () => {
        ApiUtils.fetchTweetRate()
            .then(this.handleFetchTweetRateSuccess)
            .catch(this.handleFetchTweetRateFailure);
    };

    handleFetchTweetRateSuccess = response => {
        console.log("Succeeded in fetching tweet rate");
        console.log(response);

        let res = JSON.parse(response);

        let result = res.map(point => ({ time: ''+point._id.hour+':'+point._id.interval, tweets: point.count }));
        console.log(result);

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
        const width = this.state.width-67;
        const height = 75;

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
                        oLabel={false}
                    /> : <CircularProgress style={{marginLeft:width/2}}/>
                }
            </div>
        );
    }
}

export default BarChart;