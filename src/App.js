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
      participantiSelectati: []
    };

    // this.state.participantiSelectati = this.state.participanti.map(e => parseInt(e.id, 10));


    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleTipTraseuChange = this.handleTipTraseuChange.bind(this);
    this.veziTotiParticipantii = this.veziTotiParticipantii.bind(this);
    this.veziParticipantiSelectati = this.veziParticipantiSelectati.bind(this);
    
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
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
            participanti={participantiActivi} />
        </div>
        <div id="map">
          <Harta participanti={participantiActiviPeHarta} />
        </div>
      </div>
     );
  }
  componentWillMount() {
    const firebaseRef = Firebase.database().ref('Users');
    this.bindAsArray(firebaseRef, 'participanti');
    
    firebaseRef.once("value", (dataSnapshot) => { 
      this.setState({
        participantiSelectati: this.state.participanti.map(e => parseInt(e.id, 10))
      });
    });
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
