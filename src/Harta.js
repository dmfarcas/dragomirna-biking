import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Participant = ({ text }) => <div>{text}</div>;

const afiseazaParticipanti = (participanti) => {
  console.log(participanti);
  return participanti.map((p, index) => {
    return <Participant key={index}
      lat={p.lastLocation.latitude}
      lng={p.lastLocation.longitude}
      text={p.id}
    />;
  });
}

export default class Harta extends Component {
  static defaultProps = {
    center: {lat: 47.6401534, lng: 26.2572495},
    zoom: 17,
    participanti: {}
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >{afiseazaParticipanti(this.props.participanti)}</GoogleMapReact>
    );
  }
}
