import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import firebaseConfig from './config/firebase.config.js';
import './App.css';
import Harta from './Harta';
import SidebarParticipanti from './SidebarParticipanti';

Firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {participanti: {}}
  }
  render() {
    return (
      <div id="wrapper">
        <div id="clasament">
          <SidebarParticipanti participanti={this.state.participanti} />
        </div>

        <div id="map">
          <Harta participanti={this.state.participanti} />
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
