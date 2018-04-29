import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';
import CircularProgress from 'material-ui/CircularProgress';
import { OrdinalFrame } from 'semiotic';
import ContainerDimensions from 'react-container-dimensions';

/*
 RegionalTopicDistributionPieChart.js
 Authored by Tom Blacknell

 Displays total tweets for a region,
 as well as a pie chart of the topic distribution for that region.

 Uses the Semiotic data vis library
*/

class RegionalTopicDistributionPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {data:undefined}
    }

    // fetch requried metrics from backend
    fetchRegionStats = (regionName, weekView) => {
        ApiUtils.fetchRegionStats({regionName, weekView})
            .then(this.handleFetchRegionStatsSuccess)
            .catch(this.handleFetchRegionStatsFailure);
    };

    handleFetchRegionStatsSuccess = response => {
        console.log("Succeeded in fetching region stats");
        this.setState({data: response});
    };

    handleFetchRegionStatsFailure = error => {
        console.log("Failed to fetch region stats");
    };

    componentWillMount() {
        this.fetchRegionStats(this.props.region, this.props.weekView ? 1 : 0);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data:undefined});
        this.fetchRegionStats(nextProps.region, nextProps.weekView ? 1 : 0)
    }

    render() {
        const data = this.state.data;

        // colours correspond to colours used in treemap visualization
        const colors = ["#2196F3","#F44336","#4CAF50","#FFC107","#009688","#9C27B0","#FF5722","#CDDC39","#3F51B5","#03A9F4"];

        return (
            <div  ref={this.ref}>
                { data ?
                    <div style={{paddingTop:"8px"}}>
                        <h3 style={{fontSize:"16px", marginBottom:"2px", marginTop:"0px"}}>{data.name}</h3>
                        <span style={{fontSize:"14px", fontWeight:"500", color:"rgba(0, 0, 0, 0.54)", marginBottom:"2px", marginTop:"0px"}}>{data.count} tweets</span>
                        <div id="pieChart">
                            <ContainerDimensions>
                                { ({width}) =>
                                    <OrdinalFrame
                                        size={[ width-30, width-30 ]}
                                        data={data.topics}
                                        projection={"radial"}
                                        style={d => ({ fill: colors[d.topic], stroke: "white" })}
                                        type={{ type: "bar", innerRadius: 15 }}
                                        dynamicColumnWidth={"count"}
                                        oLabel={true}
                                        oAccessor={"topic"}
                                        rAccessor={"count"}
                                        margin={{ left: 0, top: 0, bottom: 0, right: 0 }}
                                        oPadding={0}
                                        tooltipContent="pie"
                                        hoverAnnotation={true}
                                    />
                                }
                            </ContainerDimensions>
                        </div>
                    </div>
                    :
                    <CircularProgress style={{marginLeft:"50%"}}/>
                }
            </div>
        );
    }
}

export default RegionalTopicDistributionPieChart;