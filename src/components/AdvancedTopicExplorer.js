import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import CircularProgress from 'material-ui/CircularProgress';
import ApiUtils from '../utils/ApiUtils';

/*global LDAvis*/
/*global d3*/

/*
 AdvancedTopicExplorer.js
 Authored by Tom Blacknell

 Renders an adaption of LDAvis, an advanced topic model visualization script
 */

class AdvancedTopicExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {data:undefined};
    }

    // fetch the topic model json from backend
    fetchTopicExplore = () => {
        ApiUtils.fetchTopicExplore(this.props.weekView ? "1" : "0")
            .then(this.handleFetchTopicExploreSuccess)
            .catch(this.handleFetchTopicExploreFailure);
    };

    // parse the response (replace '-' with '.' again)
    handleFetchTopicExploreSuccess = response => {
        console.log("Succeeded in fetching topic explore");

        const response_obj = JSON.parse(response)[0]["data"];

        const data = {
            "topic.order":response_obj["topic-order"],
            "lambda.step":response_obj["lambda-step"],
            "token.table": response_obj["token-table"],
            "tinfo": response_obj["tinfo"],
            "R": response_obj["R"],
            "mdsDat": response_obj["mdsDat"],
            "plot.opts": response_obj["plot-opts"]
        };

        this.setState({data: data});
    };

    handleFetchTopicExploreFailure = error => {
        console.log("Failed to fetch topic explore");
    };

    componentWillReceiveProps() {
        this.fetchTopicExplore();
    }

    render() {
        const data = this.state.data;

        // use the ldavis.v1.0.0.js script to generate the visualization
        if (typeof(LDAvis) !== "undefined" && typeof(d3) !== "undefined" && typeof(data) !== "undefined") {
            const vis = new LDAvis("#" + "ldavis_el5973445783853761229503770", data);
        }

        return (
            <div>
                {(typeof(LDAvis) === "undefined" || typeof(data) === "undefined") && <CircularProgress/>}
                <div id="ldavis_el5973445783853761229503770"></div>
            </div>
        );
    }
}

// use scriptLoader to ensure the required scripts are included
export default scriptLoader(
        'ldavis.v1.0.0.js',
        'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'
)(AdvancedTopicExplorer)