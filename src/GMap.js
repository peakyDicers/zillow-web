import React from 'react';
import GoogleMapReact from 'google-map-react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Marker from './Marker'


class Location {
    lat;
    lng;
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    };
}

export default class GMap extends React.Component {
    static defaultProps = {
        //center: { lat: 43.6596, lng: -79.3977 },
        //zoom: 15,
        visibleRowFirst: -1,
        visibleRowLast: -1,
        hoveredRowIndex: -1
    };

    // static propTypes = {
    //     onCenterChange: PropTypes.func, // @controllable generated fn
    //     onZoomChange: PropTypes.func, // @controllable generated fn
    //     onBoundsChange: PropTypes.func,
    //     onMarkerHover: PropTypes.func,
    //     onChildClick: PropTypes.func,
    //     center: PropTypes.any,
    //     zoom: PropTypes.number,
    //     markers: PropTypes.any,
    //     visibleRowFirst: PropTypes.number,
    //     visibleRowLast: PropTypes.number,
    //     maxVisibleRows: PropTypes.number,
    //     hoveredRowIndex: PropTypes.number,
    //     openBallonIndex: PropTypes.number
    // }

    constructor(props) {
        super(props);

        // let locations = [];
        // locations.push(new Location(59.95, 30), new Location(59.95, 30.33), new Location(59.95, 31));

        this.state = {
            lat: 30.337844,
            lng: 30.337844,
            center: { lat: 59.95, lng: 30.33 },
            zoom: 11
            // locations: locations
        }
    }

    renderMarkers = () => {
        return this.props.locations.map(location => {
            return(
                <Marker
                    lat={location.lat}
                    lng={location.lng}
                    text={'My Marker'}
                />
            )
        })
    }

    render() {
        return (
            <Container style={{ height: '50vh',paddingBottom: 20, marginTop: 25 }}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    bootstrapURLKeys={{key: "AIzaSyC8J4GIYVFZ4uKtsgXcOfAEZtHMSy-TdEc"}}
                >
                {this.renderMarkers()}
                </GoogleMapReact>
            </Container>
        );
    }

}