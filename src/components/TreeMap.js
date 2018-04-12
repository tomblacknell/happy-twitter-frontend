import React from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import ApiUtils from '../utils/ApiUtils';

export default class TreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "name": "TIC",
                "color": "#FFF",
                "children": [
                    {
                        "name": "",
                        "size": 1
                    }
                ]
            },
            width:100
        }
    }

    sumByCount(d) {
        return d.children ? 0 : 1;
    }

    sumBySize(d) {
        return d.size;
    }

    createTreeMap(dom) {

        let svg = d3.select(dom),
            width = +svg._groups[0][0].clientWidth,
            height = +svg.attr("height");

        svg.selectAll("*").remove();

        let fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
            color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
            format = d3.format(",d");

        let treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(1);

        let root = d3.hierarchy(this.state.data)
                .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
                .sum(this.sumBySize)
                .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

            treemap(root);

        let cell = svg.selectAll("g")
                .data(root.leaves())
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

            cell.append("rect")
                .attr("id", function(d) { return d.data.id; })
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { return d.data.color; });

            cell.append("clipPath")
                .attr("id", function(d) { return "clip-" + d.data.id; })
                .append("use")
                .attr("xlink:href", function(d) { return "#" + d.data.id; });

            cell.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
                .selectAll("tspan")
                .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
                .enter().append("tspan")
                .attr("x", 4)
                .attr("y", function(d, i) { return 13 + i * 10; })
                .text(function(d) { return d; });

            cell.append("title")
                .text(function(d) { return d.data.id + "\n" + format(d.value); });

            d3.selectAll("input")
                .data([this.sumBySize, this.sumByCount], function(d) { return d ? d.name : this.value; })
                .on("change", changed);

        let timeout = d3.timeout(function() {
                d3.select("input[value=\"sumByCount\"]")
                    .property("checked", true)
                    .dispatch("change");
            }, 2000);

            function changed(sum) {
                timeout.stop();

                treemap(root.sum(sum));

                cell.transition()
                    .duration(750)
                    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
                    .select("rect")
                    .attr("width", function(d) { return d.x1 - d.x0; })
                    .attr("height", function(d) { return d.y1 - d.y0; });
            }
    }

    fetchTopics = (weekView) => {
        ApiUtils.fetchTopics(weekView)
            .then(this.handleFetchTopicsSuccess)
            .catch(this.handleFetchTopicsFailure);
    };

    handleFetchTopicsSuccess = response => {
        console.log("Succeeded in fetching topics");

        const topics = JSON.parse(JSON.parse(response)[0]['data']);
        const treeMapData = {
            "name": "topics",
            "children": [
                {
                   "name": "topic 1",
                    "children": [
                        {"name": topics[0]['terms'][0]['term'], "size": topics[0]['terms'][0]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][1]['term'], "size": topics[0]['terms'][1]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][2]['term'], "size": topics[0]['terms'][2]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][3]['term'], "size": topics[0]['terms'][3]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][4]['term'], "size": topics[0]['terms'][4]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][5]['term'], "size": topics[0]['terms'][5]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][6]['term'], "size": topics[0]['terms'][6]['freq']*10000, "color":"#2196F3"},
                        {"name": topics[0]['terms'][7]['term'], "size": topics[0]['terms'][7]['freq']*10000, "color":"#2196F3"},
                    ]
                },
                {
                    "name": "topic 2",
                    "children": [
                        {"name": topics[1]['terms'][0]['term'], "size": topics[1]['terms'][0]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][1]['term'], "size": topics[1]['terms'][1]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][2]['term'], "size": topics[1]['terms'][2]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][3]['term'], "size": topics[1]['terms'][3]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][4]['term'], "size": topics[1]['terms'][4]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][5]['term'], "size": topics[1]['terms'][5]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][6]['term'], "size": topics[1]['terms'][6]['freq']*10000, "color":"#F44336"},
                        {"name": topics[1]['terms'][7]['term'], "size": topics[1]['terms'][7]['freq']*10000, "color":"#F44336"},
                    ]
                },
                {
                    "name": "topic 3",
                    "children": [
                        {"name": topics[2]['terms'][0]['term'], "size": topics[2]['terms'][0]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][1]['term'], "size": topics[2]['terms'][1]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][2]['term'], "size": topics[2]['terms'][2]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][3]['term'], "size": topics[2]['terms'][3]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][4]['term'], "size": topics[2]['terms'][4]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][5]['term'], "size": topics[2]['terms'][5]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][6]['term'], "size": topics[2]['terms'][6]['freq']*10000, "color":"#4CAF50"},
                        {"name": topics[2]['terms'][7]['term'], "size": topics[2]['terms'][7]['freq']*10000, "color":"#4CAF50"},
                    ]
                },
                {
                    "name": "topic 4",
                    "children": [
                        {"name": topics[3]['terms'][0]['term'], "size": topics[3]['terms'][0]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][1]['term'], "size": topics[3]['terms'][1]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][2]['term'], "size": topics[3]['terms'][2]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][3]['term'], "size": topics[3]['terms'][3]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][4]['term'], "size": topics[3]['terms'][4]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][5]['term'], "size": topics[3]['terms'][5]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][6]['term'], "size": topics[3]['terms'][6]['freq']*10000, "color":"#FFC107"},
                        {"name": topics[3]['terms'][7]['term'], "size": topics[3]['terms'][7]['freq']*10000, "color":"#FFC107"},
                    ]
                },
                {
                    "name": "topic 5",
                    "children": [
                        {"name": topics[4]['terms'][0]['term'], "size": topics[4]['terms'][0]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][1]['term'], "size": topics[4]['terms'][1]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][2]['term'], "size": topics[4]['terms'][2]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][3]['term'], "size": topics[4]['terms'][3]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][4]['term'], "size": topics[4]['terms'][4]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][5]['term'], "size": topics[4]['terms'][5]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][6]['term'], "size": topics[4]['terms'][6]['freq']*10000, "color":"#009688"},
                        {"name": topics[4]['terms'][7]['term'], "size": topics[4]['terms'][7]['freq']*10000, "color":"#009688"},
                    ]
                },
                {
                    "name": "topic 6",
                    "children": [
                        {"name": topics[5]['terms'][0]['term'], "size": topics[5]['terms'][0]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][1]['term'], "size": topics[5]['terms'][1]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][2]['term'], "size": topics[5]['terms'][2]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][3]['term'], "size": topics[5]['terms'][3]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][4]['term'], "size": topics[5]['terms'][4]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][5]['term'], "size": topics[5]['terms'][5]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][6]['term'], "size": topics[5]['terms'][6]['freq']*10000, "color":"#9C27B0"},
                        {"name": topics[5]['terms'][7]['term'], "size": topics[5]['terms'][7]['freq']*10000, "color":"#9C27B0"},
                    ]
                },
                {
                    "name": "topic 7",
                    "children": [
                        {"name": topics[6]['terms'][0]['term'], "size": topics[6]['terms'][0]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][1]['term'], "size": topics[6]['terms'][1]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][2]['term'], "size": topics[6]['terms'][2]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][3]['term'], "size": topics[6]['terms'][3]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][4]['term'], "size": topics[6]['terms'][4]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][5]['term'], "size": topics[6]['terms'][5]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][6]['term'], "size": topics[6]['terms'][6]['freq']*10000, "color":"#FF5722"},
                        {"name": topics[6]['terms'][7]['term'], "size": topics[6]['terms'][7]['freq']*10000, "color":"#FF5722"},
                    ]
                },
                {
                    "name": "topic 8",
                    "children": [
                        {"name": topics[7]['terms'][0]['term'], "size": topics[7]['terms'][0]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][1]['term'], "size": topics[7]['terms'][1]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][2]['term'], "size": topics[7]['terms'][2]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][3]['term'], "size": topics[7]['terms'][3]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][4]['term'], "size": topics[7]['terms'][4]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][5]['term'], "size": topics[7]['terms'][5]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][6]['term'], "size": topics[7]['terms'][6]['freq']*10000, "color":"#CDDC39"},
                        {"name": topics[7]['terms'][7]['term'], "size": topics[7]['terms'][7]['freq']*10000, "color":"#CDDC39"},
                    ]
                },
                {
                    "name": "topic 9",
                    "children": [
                        {"name": topics[8]['terms'][0]['term'], "size": topics[8]['terms'][0]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][1]['term'], "size": topics[8]['terms'][1]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][2]['term'], "size": topics[8]['terms'][2]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][3]['term'], "size": topics[8]['terms'][3]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][4]['term'], "size": topics[8]['terms'][4]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][5]['term'], "size": topics[8]['terms'][5]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][6]['term'], "size": topics[8]['terms'][6]['freq']*10000, "color":"#3F51B5"},
                        {"name": topics[8]['terms'][7]['term'], "size": topics[8]['terms'][7]['freq']*10000, "color":"#3F51B5"},
                    ]
                },
                {
                    "name": "topic 10",
                    "children": [
                        {"name": topics[9]['terms'][0]['term'], "size": topics[9]['terms'][0]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][1]['term'], "size": topics[9]['terms'][1]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][2]['term'], "size": topics[9]['terms'][2]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][3]['term'], "size": topics[9]['terms'][3]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][4]['term'], "size": topics[9]['terms'][4]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][5]['term'], "size": topics[9]['terms'][5]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][6]['term'], "size": topics[9]['terms'][6]['freq']*10000, "color":"#03A9F4"},
                        {"name": topics[9]['terms'][7]['term'], "size": topics[9]['terms'][7]['freq']*10000, "color":"#03A9F4"},
                    ]
                },
            ]
        };

        this.setState({data: treeMapData}, function() {
            let dom = ReactDOM.findDOMNode(this);
            this.createTreeMap(dom);
        });

    };

    handleFetchTopicsFailure = error => {
        console.log("Failed to fetch topics");
    };

    componentWillMount() {
        this.fetchTopics(this.props.weekView ? 1 : 0);
    }

    componentDidMount() {
        let dom = ReactDOM.findDOMNode(this);
        this.createTreeMap(dom);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Component recieved new props: ");
        console.log(nextProps);
        this.setState({width:nextProps.width});
    }

    componentWillUpdate(nextProps) {
        if (this.props.weekView !== nextProps.weekView) {
            this.fetchTopics(nextProps.weekView ? 1 : 0);
        }
    }

    render() {
        console.log("Rendering treemap SVG");
        return(
            <svg width="100%" height="543"></svg>
        );
    }
}