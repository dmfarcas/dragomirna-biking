import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import firebaseConfig from './config/firebase.config.js';
import './App.css';
import Harta from './Harta';
import Participanti from './Participanti';
import Cautare from './Cautare';
import FiltruTipTraseu from './FiltruTipTraseu';

Firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      participanti: [],
      traseuScurt: true,
      traseuLung: true,
      totiParticipantiiState: true,
      participantiSelectati: [],
      participantHovered: -1,
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleTipTraseuChange = this.handleTipTraseuChange.bind(this);
    this.veziTotiParticipantii = this.veziTotiParticipantii.bind(this);
    this.veziParticipantiSelectati = this.veziParticipantiSelectati.bind(this);
    this.schimbaStateHover = this.schimbaStateHover.bind(this);
  }

  schimbaStateHover(participantHovered) {
    this.setState({
      participantHovered: parseInt(participantHovered, 10)
    });
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText
    });
  }

  handleTipTraseuChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  veziTotiParticipantii(event) {
    const checked = event.target.checked;
    this.setState({
      totiParticipantiiState: checked,
      participantiSelectati: checked ? this.state.participanti.map(e => parseInt(e.id, 10)) : []
    });
  }

  veziParticipantiSelectati(event) {
    const aratParticipantPeHarta = event.target.checked;
    const participantSelectat = parseInt(event.currentTarget.id, 10);
    const prevState = this.state.participantiSelectati;

    if (aratParticipantPeHarta) {
      this.setState({
        participantiSelectati: [...prevState, participantSelectat]
      });
    } else {
      this.setState({
        participantiSelectati: prevState.filter((e) => e !== participantSelectat)
      });
    }

  }

  render() {
    const participantiActivi = this.state.participanti.filter((p) => {
      const filtruTraseuScurt = p.circuit === "traseu scurt" && this.state.traseuScurt;
      const filtruTraseuLung = p.circuit === "traseu lung" && this.state.traseuLung;

      if((filtruTraseuScurt || filtruTraseuLung)) { 
        if (this.state.filterText !== "") {
          // cautare dupa nume, id, doar participanti activi.
          const filtruNume = p.name.toUpperCase().includes(this.state.filterText.toUpperCase());
          const filtruNumarParticipant = p.id.toString().includes(this.state.filterText);
          
          return (filtruNume || filtruNumarParticipant) && p.active === true;
        }
        // daca nu se filtreaza nimic, returneaza toti utilizatorii activi
        return p.active === true
      }
      return false; // nothing to return
    });

    const participantiActiviPeHarta = participantiActivi.filter(e => this.state.participantiSelectati.includes(parseInt(e.id, 10)));

    return (
      <div id="wrapper">
        <svg style={{display: 'none'}}>
          <symbol id="iconCheck" viewBox="0 0 24 24">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </symbol>
          <symbol id="iconCheckOn" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </symbol>
        </svg>
        <div id="clasament">
          <Cautare 
            filterText={this.state.filterText}
            onFilterTextInput={this.handleFilterTextInput}
          />
          <FiltruTipTraseu
            traseuScurt={this.state.traseuScurt}
            traseuLung={this.state.traseuLung}
            handleTipTraseuChange={this.handleTipTraseuChange} />
          <Participanti 
            veziTotiParticipantii={this.veziTotiParticipantii}
            totiParticipantiiState={this.state.totiParticipantiiState}
            participantiSelectati={this.state.participantiSelectati}
            veziParticipantiSelectati={this.veziParticipantiSelectati}
            schimbaStateHover={this.schimbaStateHover}
            participantHovered={this.state.participantHovered}
            participanti={participantiActivi} />
        </div>
        <div id="map">
          <Harta 
            participanti={participantiActiviPeHarta} 
            schimbaStateHover={this.schimbaStateHover}
            participantHovered={this.state.participantHovered}
            />
        </div>
      </div>
     );
  }
  componentWillMount() {
    const firebaseRef = Firebase.database().ref('Users');
    this.bindAsArray(firebaseRef, 'participanti');
    
    firebaseRef.once("value", (dataSnapshot) => { // la initializare, toti participantii sunt vizibili.
      this.setState({
        participantiSelectati: this.state.participanti.map(e => parseInt(e.id, 10))
      });
    });
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
