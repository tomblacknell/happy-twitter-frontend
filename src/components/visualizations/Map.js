/*global google*/

import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import ApiUtils from "../../utils/ApiUtils";
import CircularProgress from 'material-ui/CircularProgress';

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `300px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            console.log("Next props data:");
            console.log(nextProps.data);
            this.setState({positions:nextProps.data.map(function(pos) { return new google.maps.LatLng(pos.lat, pos.lng)})})
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 54.6781, lng: -2.9360}}
        defaultOptions={{
            fullscreenControl: false,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            maxZoom: 8,
            minZoom: 6,
            styles: [
                {
                    featureType: "administrative",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },{
                    featureType: "water",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },{
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ]
        }}
    >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            <Marker position={{ lat: 51.503385, lng: -0.096136 }} label="London" clickable={true} onClick={function(event) {alert("London clicked")}} />
            <Marker position={{ lat: 51.0577, lng: -1.3081 }} label="Hampshire" />
            <Marker position={{ lat: 53.4808, lng: -2.2426 }} label="Manchester" />
            <Marker position={{ lat: 57.4596, lng: -4.2264 }} label="Highland" />
            <Marker position={{ lat: 52.4751, lng: -1.8298 }} label="West Midlands" />
            <Marker position={{ lat: 55.9533, lng: -3.1883 }} label="Edinburgh" />
            <Marker position={{ lat: 50.9086, lng: -0.2494 }} label="East Sussex" />
            <Marker position={{ lat: 52.9548, lng: -1.1581 }} label="Nottinghamshire" />
            <Marker position={{ lat: 50.7156, lng: -3.5309 }} label="Devon" />
            <Marker position={{ lat: 53.7632, lng: -2.7044 }} label="Lancashire" />
            <Marker position={{ lat: 52.8793, lng: -2.0572 }} label="Staffordshire" />
        </MarkerClusterer>

        <HeatmapLayer data={props.positions} options={{radius:15}}
        />
    </GoogleMap>
);
/*global google*/

class MyFancyComponent extends React.PureComponent {

    state = {positions:[], loading:true};

    fetchTweetLocations = () => {
        ApiUtils.fetchTweetLocations()
            .then(this.handleFetchTweetLocationsSuccess)
            .catch(this.handleFetchTweetLocationsFailure);
    };

    handleFetchTweetLocationsSuccess = response => {
        console.log("Succeeded in fetching tweet locations");
        console.log(JSON.parse(response));

        let positions = JSON.parse(response).map(function (coordinates) {
            return {
                lat: parseFloat(coordinates.coordinates.latitude),
                lng: parseFloat(coordinates.coordinates.longitude)
            }
        });

        console.log("Positions before setting to state: ");
        console.log(positions);

        this.setState({
            positions,
            loading: false
        });
    };

    handleFetchTweetLocationsFailure = error => {
        console.log("Failed to fetch tweet locations");
    };

    componentDidMount() {
        this.fetchTweetLocations();
    };

    render() {

        const loading = this.state.loading;

        return (
            <Map data={this.state.positions}/>
        )
    }
}
export default MyFancyComponent