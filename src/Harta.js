import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Harta.css';
import * as traseuLung from './constants/traseu_lung.json';
import * as traseuScurt from './constants/traseu_scurt.json';
import { isActive, culoareParticipant } from './helpers'

export default class Harta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      culoriParticipanti: [],
      mapLoaded: false,
      rendered: false
    };
    this.schimbaStateHover = this.props.schimbaStateHover.bind(this);
  }

  static defaultProps = {
    center: {lat: 47.76, lng: 26.20},
    zoom: 12,
    participanti: {},
    map: {},
    maps: {},
  };

  componentDidUpdate() {
    if (!this.state.mapLoaded) return

    const createPolyline = (traseu, culoare) => {
      return new this.state.maps.Polyline({
        path: traseu.features["0"].geometry.coordinates["0"]
          .map((coord, index) => {
            return {
              lng: coord[0],
              lat: coord[1]
            }
          }),
        geodesic: true,
        strokeColor: culoare,
        strokeOpacity: 1,
        strokeWeight: 4
      });
    };

    if (!this.state.rendered) {
      this.polylinetraseuLung = createPolyline(traseuLung, '#2fff00');
      this.polylinetraseuScurt = createPolyline(traseuScurt, '#00aaff');
      this.polylinetraseuLung.setMap(this.state.map);
      this.polylinetraseuScurt.setMap(this.state.map);
      this.setState({
        rendered: true
      });
    }

    if (!this.props.traseuLung) {
      this.polylinetraseuLung.setMap(null);
    } else if (this.state.rendered && this.props.traseuLung) {
      this.polylinetraseuLung.setMap(this.state.map);
    }

    if (!this.props.traseuScurt) {
      this.polylinetraseuScurt.setMap(null);
    } else if (this.state.rendered && this.props.traseuScurt) {
      this.polylinetraseuScurt.setMap(this.state.map);
    }

  }

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
        mapTypeId: maps.MapTypeId.SATELLITE,
        minZoom: 12,
        maxZoom: 16,
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
        onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps:maps, mapLoaded: true }) }}
          yesIWantToUseGoogleMapApiInternals
      >
        {participant}
      </GoogleMapReact>
    );
  }
}
