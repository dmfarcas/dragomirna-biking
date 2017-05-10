import React, { Component } from 'react';

export default class SidebarParticipanti extends Component {
  constructor(props) {
    super(props);
    this.veziTotiParticipantii = this.props.veziTotiParticipantii.bind(this);
    this.veziParticipantiSelectati = this.props.veziParticipantiSelectati.bind(this);
  }

  render() {
    const listaParticipanti = (participanti) => {
      return participanti.map((p, index) => {
        return (
          <tr key={p.id}>
            <td>              
              <input
                id={p.id}
                name="checkboxParticipant"
                onChange={this.veziParticipantiSelectati}
                checked={this.props.participantiSelectati.includes(parseInt(p.id, 10))}
                type="checkbox" />
            </td>
            <td>{p.name}</td>
            <td>{p.id}</td>
            <td>{p.circuit}</td>
          </tr>
        );
      });
    };

    return (
      <div>
        <table>
          <tbody>
          <tr>
            <th>
              <input
                  name="veziTotiParticipantii"
                  onChange={this.veziTotiParticipantii}
                  checked={this.props.totiParticipantiiState}
                  type="checkbox" />
            </th>
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
