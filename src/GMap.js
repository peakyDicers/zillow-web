import React from 'react';
import GoogleMapReact from 'google-map-react';
import Container from 'react-bootstrap/Container';

export default class GMap extends React.Component {
    static defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11
    };

    constructor() {
        super();
        this.state = {
            lat: 30.337844,
            lng: 30.337844,
            center: { lat: 59.95, lng: 30.33 },
            zoom: 11
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <div
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}