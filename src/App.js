import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import firebaseConfig from './config/firebase.config.js';
import './App.css';
import Harta from './Harta';
import Participanti from './Participanti';
import Cautare from './Cautare';

Firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      participanti: {},
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    const participantiActivi = this.state.participanti.filter((p) => {
      if (this.state.filterText !== "") {
        console.log(p);
        return (
          p.name.toUpperCase().includes(this.state.filterText.toUpperCase()) 
       || p.id.toString().includes(this.state.filterText))
       && p.active === true;
      }
      return p.active === true
    });

    return (
      <div id="wrapper">
        <div id="clasament">
          <Cautare 
            filterText={this.state.filterText}
            onFilterTextInput={this.handleFilterTextInput}
          />
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
