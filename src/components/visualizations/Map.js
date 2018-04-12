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
        containerElement: <div style={{ height: `600px` }} />,
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
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={40}
            maxZoom={8}
        >
            <Marker position={{ lat: 51.503385, lng: -0.096136 }} label="London" clickable={true} onClick={(e) => props.action("London")} />
            <Marker position={{ lat: 53.4808, lng: -2.2426 }} label="Manchester" clickable={true} onClick={(e) => props.action("Greater Manchester")}/>
            <Marker position={{ lat: 52.4751, lng: -1.8298 }} label="West Midlands" clickable={true} onClick={(e) => props.action("West Midlands")}/>
            <Marker position={{ lat: 52.9548, lng: -1.1581 }} label="Nottinghamshire" clickable={true} onClick={(e) => props.action("Nottinghamshire")}/>
            <Marker position={{ lat: 53.7632, lng: -2.7044 }} label="Lancashire" clickable={true} onClick={(e) => props.action("Lancashire")}/>
            <Marker position={{ lat: 50.7156, lng: -3.5309 }} label="Devon" clickable={true} onClick={(e) => props.action("Devon")}/>
            <Marker position={{ lat: 52.8793, lng: -2.0572 }} label="Staffordshire" clickable={true} onClick={(e) => props.action("Staffordshire")}/>
            <Marker position={{ lat: 51.0577, lng: -1.3081 }} label="Hampshire" clickable={true} onClick={(e) => props.action("Hampshire")}/>
            <Marker position={{ lat: 54.9783, lng: -1.6178 }} label="Tyne and Wear" clickable={true} onClick={(e) => props.action("Tyne and Wear")}/>
            <Marker position={{ lat: 55.8642, lng: -4.2518 }} label="Glasgow" clickable={true} onClick={(e) => props.action("Glasgow City")}/>
            <Marker position={{ lat: 52.2053, lng: 0.1218 }} label="Cambridgeshire" clickable={true} onClick={(e) => props.action("Cambridgeshire")}/>
            <Marker position={{ lat: 52.7726, lng: -1.2052 }} label="Leicestershire" clickable={true} onClick={(e) => props.action("Leicestershire")}/>
            <Marker position={{ lat: 51.7343, lng: 0.4691 }} label="Essex" clickable={true} onClick={(e) => props.action("Essex")}/>
            <Marker position={{ lat: 53.9915, lng: -1.5412 }} label="North Yorkshire" clickable={true} onClick={(e) => props.action("North Yorkshire")}/>
            <Marker position={{ lat: 53.2326, lng: -2.6103 }} label="Cheshire" clickable={true} onClick={(e) => props.action("Cheshire")}/>
            <Marker position={{ lat: 51.2787, lng: -0.5217 }} label="Kent" clickable={true} onClick={(e) => props.action("Kent")}/>
            <Marker position={{ lat: 55.9533, lng: -3.1883 }} label="Edinburgh" clickable={true} onClick={(e) => props.action("City of Edinburgh")}/>
            <Marker position={{ lat: 57.4596, lng: -4.2264 }} label="Highland" clickable={true} onClick={(e) => props.action("Highland")}/>
            <Marker position={{ lat: 51.8098, lng: -0.2377 }} label="Hertfordshire" clickable={true} onClick={(e) => props.action("Hertfordshire")}/>
            <Marker position={{ lat: 50.9086, lng: -0.2494 }} label="East Sussex" clickable={true} onClick={(e) => props.action("East Sussex")}/>
            <Marker position={{ lat: 53.1047, lng: -1.5624 }} label="Derbyshire" clickable={true} onClick={(e) => props.action("Derbyshire")}/>
            <Marker position={{ lat: 51.3148, lng: -0.5600 }} label="Surrey" clickable={true} onClick={(e) => props.action("Surrey")}/>
            <Marker position={{ lat: 51.4816, lng: -3.1791 }} label="Cardiff" clickable={true} onClick={(e) => props.action("Cardiff")}/>
            <Marker position={{ lat: 54.5973, lng: -5.9301 }} label="County Antrim" clickable={true} onClick={(e) => props.action("County Antrim")}/>
            <Marker position={{ lat: 51.105097, lng: -2.926231 }} label="Somerset" clickable={true} onClick={(e) => props.action("Somerset")}/>
        </MarkerClusterer>
        <HeatmapLayer data={props.positions} options={{radius:15}}
        />
    </GoogleMap>
);
/*global google*/

class MapContainer extends React.PureComponent {

    state = {positions:[], loading:true};

    fetchTweetLocations = (weekView) => {
        ApiUtils.fetchTweetLocations(weekView ? 1 : 0)
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
        this.fetchTweetLocations(this.props.weekView);
    };

    componentWillReceiveProps(nextProps) {
        this.fetchTweetLocations(nextProps.weekView);
    }

    render() {

        const loading = this.state.loading;

        return (
            <Map data={this.state.positions} action={this.props.action}/>
        )
    }
}
export default MapContainer