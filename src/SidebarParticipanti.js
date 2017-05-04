import React, { Component } from 'react';

const listaParticipanti = (participanti) => {
  return participanti.map((p, index) => {
    return (
      <tr key={index}>
        <td>{p.name}</td>
        <td>{p.id}</td>
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
      <table>
        <thead>Lista Participanti</thead>
        <tbody>
        <th>Nume</th><th>Numar</th>
        {listaParticipanti(this.props.participanti)}
        </tbody>
      </table>
      // </ul>
    );
  }
}
