import React, { Component } from 'react';
export default class Harta extends Component {
  constructor(props) {
  }

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
      >{participant}</GoogleMapReact>
    );
  }
}
