import React, { Component } from 'react';

const listaParticipanti = (participanti) => {
  return participanti.map((p, index) => <li key={index}>{p.nume} {p.id}</li> );
};

export default class SidebarParticipanti extends Component {
  static defaultProps = {
    participanti: {}
  };

  render() {
    return (
      <ul>
      {listaParticipanti(this.props.participanti)}
      </ul>
    );
  }
}
