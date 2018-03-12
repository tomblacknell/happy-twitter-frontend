import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ApiUtils from '../../utils/ApiUtils';

class Map extends Component {
    static defaultProps = {
        center: {lat: 55.3781, lng: 3.4360},
        zoom: 11
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchTweetLocations = () => {
        ApiUtils.fetchTweetLocations()
            .then(this.handleFetchTweetLocationsSuccess)
            .catch(this.handleFetchTweetLocationsFailure);
    };

    handleFetchTweetLocationsSuccess = response => {
        console.log("Succeeded in fetching tweet locations");
        console.log(JSON.parse(response));

        let positions = JSON.parse(response).slice(0,3).map(function(coordinates) {
            return {lat: parseFloat(coordinates.coordinates.latitude), lng: parseFloat(coordinates.coordinates.longitude)}
        });

        let heatMap = {
            positions,
            options: {
                radius: 10,
                opacity: 0.6,
                gradient: [
                    'rgba(0, 255, 255, 0)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(0, 127, 255, 1)',
                    'rgba(0, 63, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 0, 223, 1)',
                    'rgba(0, 0, 191, 1)',
                    'rgba(0, 0, 159, 1)',
                    'rgba(0, 0, 127, 1)',
                    'rgba(63, 0, 91, 1)',
                    'rgba(127, 0, 63, 1)',
                    'rgba(191, 0, 31, 1)',
                    'rgba(255, 0, 0, 1)'
                ]
            }
        };

        console.log("Heatmap:");
        console.log(heatMap);

        console.log("Example:");

        this.setState({heatMap: heatMap});
    };

    handleFetchTweetLocationsFailure = error => {
        console.log("Failed to fetch tweet locations");
    };


    componentWillMount() {
        this.fetchTweetLocations();
    }

    render() {
        const style = {
            width: "400px",
            height: "400px"
        };

        const example = {
            positions: [
                {
                    lat: 54.952185,
                    lng: -3.758846,
                },
                {
                    lat: 60.734305,
                    lng: 47.061773,
                },
                {
                    lat: 60.754305,
                    lng: 47.081773,
                },
            ],
            options: {
                radius: 20,
                opacity: 0.7,
                gradient: [
                    'rgba(0, 255, 255, 0)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(0, 127, 255, 1)',
                    'rgba(0, 63, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 0, 223, 1)',
                    'rgba(0, 0, 191, 1)',
                    'rgba(0, 0, 159, 1)',
                    'rgba(0, 0, 127, 1)',
                    'rgba(63, 0, 91, 1)',
                    'rgba(127, 0, 63, 1)',
                    'rgba(191, 0, 31, 1)',
                    'rgba(255, 0, 0, 1)'
                ]
            },
        };

        const heatmap = this.state.heatMap;

        return (
            <div style={style}>
                <GoogleMapReact
                    defaultCenter={{lat: 54.952185, lng: -3.758846}}
                    defaultZoom={5}
                    heatmapLibrary={true}
                    heatmap={heatmap || example}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map