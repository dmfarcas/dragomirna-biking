import React, { Component } from 'react';
import { flatten, partition } from 'lodash';

export default class SidebarParticipanti extends Component {
  constructor(props) {
    super(props);
    this.veziTotiParticipantii = this.props.veziTotiParticipantii.bind(this);
    this.veziParticipantiSelectati = this.props.veziParticipantiSelectati.bind(this);
    this.schimbaStateHover = this.props.schimbaStateHover.bind(this);
  }

  render() {
    const listaParticipanti = (participanti) => {
      const eParticipantulSelectat = p => this.props.participantiSelectati.includes(parseInt(p.id, 10));

      return flatten(partition(participanti, eParticipantulSelectat))
      .map((p, index) => {
        return (
          <label 
            key={p.id} 
            onMouseEnter={() => this.schimbaStateHover(p.id)}

            className="table-row"
            >
            <input
              id={p.id}
              name="checkboxParticipant"
              onChange={this.veziParticipantiSelectati}
              checked={this.props.participantiSelectati.includes(parseInt(p.id, 10))}
              type="checkbox" />
            <svg className="icon icon--checkbox" width="24" height="24">
              <use className="off" xlinkHref="#iconCheck"></use>
              <use className="on" xlinkHref="#iconCheckOn"></use>
            </svg>
            <div className="table-name">{p.name}</div>
            <div className="table-number">{p.id}</div>
            <div className="table-circuit">{p.circuit}</div>
          </label>
        );
      });
    };

    return (
      <div 
        id="participanti-wrapper"
        onMouseLeave={() => this.schimbaStateHover(-1)}
        >
        <label className="table-row table-row--head">
          <input
            name="veziTotiParticipantii"
            onChange={this.veziTotiParticipantii}
            checked={this.props.totiParticipantiiState}
            type="checkbox" />
          <svg className="icon icon--checkbox" width="24" height="24">
            <use className="off" xlinkHref="#iconCheck"></use>
            <use className="on" xlinkHref="#iconCheckOn"></use>
          </svg>
          <div className="table-name">Nume</div>
          <div className="table-number">Număr</div>
          <div className="table-circuit">Traseu</div>
        </label>  
        {listaParticipanti(this.props.participanti)}
      </div>
    );
  }
}
