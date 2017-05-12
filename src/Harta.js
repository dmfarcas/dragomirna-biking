import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';

const Participant = ({ idParticipant, numeParticipant, color }) => {
  const culoareParticipant = (str) => { // http://stackoverflow.com/a/16348977
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  return (
    <div
      style={{ borderColor: `${culoareParticipant(numeParticipant)}` }}
      className="avatar-participant">
      <span>{idParticipant}</span>
    </div>
  );
};

export default class Harta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      culoriParticipanti: []
    };
  }

  static defaultProps = {
    center: {lat: 47.6401534, lng: 26.2572495},
    zoom: 6,
    participanti: {},
  };

  render() {
    const createMapOptions = maps => {
      return {
        mapTypeId: maps.MapTypeId.SATELLITE
      }
    }

    const participant = this.props.participanti.map((p, index) => {
      return <Participant key={index}
        lat={p.lastLocation.latitude}
        lng={p.lastLocation.longitude}
        idParticipant={p.id}
        numeParticipant={p.name}
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
