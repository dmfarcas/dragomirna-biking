import React, { Component } from 'react';
import Filter from './Filter';
const listaParticipanti = (participanti) => {
  return participanti.map((p, index) => {
    console.log(p);
    return (
      <tr key={index}>
        <td>{p.name}</td>
        <td>{p.id}</td>
        <td>{p.circuit}</td>
      </tr>
    );
  });
};

export default class SidebarParticipanti extends Component {
  static defaultProps = {
    participanti: {}
  };

  render() {
    return (
      <div>
        <Filter />
        <table>
          <tbody>
          <tr>
            <th>Nume</th>
            <th>Numar</th>
            <th>Traseu</th>
          </tr>
          {listaParticipanti(this.props.participanti)}
          </tbody>
        </table>
      </div>
    );
  }
}
