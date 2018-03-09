import React, { Component } from 'react';
import { OrdinalFrame } from 'semiotic';
import ApiUtils from '../../utils/ApiUtils';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, data:[], tweetRate:[] };
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

        console.log(final);

        this.setState({data:final});
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

        return (
            <OrdinalFrame
                size={[this.state.width, 75]}
                data={this.state.data}
                oAccessor={"time"}
                rAccessor={"tweets"}
                style={{ fill: "#f0a535", stroke: "white" }}
                type={"bar"}
                oLabel={false}
            />
        );
    }
}

export default BarChart;