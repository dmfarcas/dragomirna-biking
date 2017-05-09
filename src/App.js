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
      participanti: {},
      traseuScurt: true,
      traseuLung: true
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    const participantiActivi = this.state.participanti.filter((p) => {
      if((p.circuit === "traseu scurt" && this.state.traseuScurt) || (p.circuit === "traseu lung" && this.state.traseuLung)) { 
        if (this.state.filterText !== "") {
        // cautare dupa nume, id, doar participanti activi.
        return (
          p.name.toUpperCase().includes(this.state.filterText.toUpperCase()) 
       || p.id.toString().includes(this.state.filterText)
       ) && p.active === true;
      }
      return p.active === true
      }

    });


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
            handleInputChange={this.handleInputChange} />

          <Participanti participanti={participantiActivi} />
        </div>
        <div id="map">
          <Harta participanti={participantiActivi} />
        </div>
      </div>
     );
  }
  componentWillMount() {
    const firebaseRef = Firebase.database().ref('Users');
    this.bindAsArray(firebaseRef, 'participanti');
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
