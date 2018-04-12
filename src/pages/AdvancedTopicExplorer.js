import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import CircularProgress from 'material-ui/CircularProgress';
import ApiUtils from '../utils/ApiUtils';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

/*global LDAvis*/
/*global d3*/

class AdvancedTopicExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {data:undefined};
    }

    fetchTopicExplore = () => {
        ApiUtils.fetchTopicExplore(this.props.weekView ? "1" : "0")
            .then(this.handleFetchTopicExploreSuccess)
            .catch(this.handleFetchTopicExploreFailure);
    };

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

export default scriptLoader(
        'ldavis.v1.0.0.js',
        'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'
)(AdvancedTopicExplorer)