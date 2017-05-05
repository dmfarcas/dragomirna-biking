import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';

function getRandomColor(p) {
    return `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.5)`;
}

console.log(getRandomColor());
const Participant = ({ text, color }) => {
  return (
    <div
      style={color}
      className="avatar-participant">
      <span>{text}</span>
    </div>
  );
};

const afiseazaParticipanti = (participanti) => {
  return participanti.map((p, index) => {
    return <Participant key={index}
      lat={p.lastLocation.latitude}
      lng={p.lastLocation.longitude}
      text={p.id}
      color={{backgroundColor: getRandomColor()}} //FIXME: la fiecare update din firebase isi ia random color, ar trebui sa fie aceeasi culoare de la start la finish
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
