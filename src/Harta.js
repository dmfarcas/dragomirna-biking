import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';
import { isActive, culoareParticipant } from './helpers'

export default class Harta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      culoriParticipanti: []
    };
    this.schimbaStateHover = this.props.schimbaStateHover.bind(this);
  }

  static defaultProps = {
    center: {lat: 47.6401534, lng: 26.2572495},
    zoom: 6,
    participanti: {},
  };

  render() {
    const Participant = ({ idParticipant, numeParticipant, active, color }) => {
      return (
        <div
          onMouseEnter={() => this.schimbaStateHover(idParticipant)}  
          onMouseLeave={() => this.schimbaStateHover(-1)}  
          style={{ borderColor: `${culoareParticipant(numeParticipant)}` }}
          className={`avatar-participant ${isActive(active)}`}>
          <span>{idParticipant}</span>
        </div>
      );
    };

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
        active={parseInt(p.id, 10) === this.props.participantHovered}
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
