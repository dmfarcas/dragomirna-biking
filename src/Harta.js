import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';

const Participant = ({ text, color }) => {
  return (
    <div
      style={color}
      className="avatar-participant">
      <span>{text}</span>
    </div>
  );
};

const createMapOptions = (maps) => {
  return {
    mapTypeId: maps.MapTypeId.SATELLITE
  }
}

export default class Harta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      culoriParticipanti: []
    };
  }

  static defaultProps = {
    center: {lat: 47.6401534, lng: 26.2572495},
    zoom: 17,
    participanti: {},
  };

  render() {
    const participant = this.props.participanti.map((p, index) => {
      return <Participant key={index}
        lat={p.lastLocation.latitude}
        lng={p.lastLocation.longitude}
        text={p.id}
      />;
    }); 
  
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        options={createMapOptions}
      >{participant}</GoogleMapReact>
    );
  }
}
