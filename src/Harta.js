import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';
import * as traseuLung from './constants/traseu_lung.json';
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
          onMouseEnter={(e) => {
            this.schimbaStateHover(idParticipant)
            e.target.closest('.avatar-participant').parentElement.classList.add('avatar-index')
          }}
          onMouseLeave={(e) => {
            this.schimbaStateHover(-1)
            e.target.closest('.avatar-participant').parentElement.classList.remove('avatar-index')
          }}
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

    const loadedGMapsApi = ({map, maps}) => {
      const traseuLungPolyline = traseuLung.features["0"].geometry.coordinates["0"]
      .map((coord, index) => {
          return {lng: coord[0], lat: coord[1]}
      });
    
      const GMapsPolyline = new maps.Polyline({
        path: traseuLungPolyline,
        geodesic: true,
        strokeColor: '#00aaff',
        strokeOpacity: 0.7,
        strokeWeight: 4
      });

      GMapsPolyline.setMap(map);
    }

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        options={createMapOptions}
        onGoogleApiLoaded={loadedGMapsApi}
                       yesIWantToUseGoogleMapApiInternals
      >
        {participant}
      </GoogleMapReact>
    );
  }
}
