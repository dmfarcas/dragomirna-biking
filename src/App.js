import React, { Component } from 'react';
import './App.css';
import Harta from './Harta';
import mock_user_locations from './mock_user_locations';
import SidebarParticipanti from './SidebarParticipanti';
import firebaseConfig from './config/firebase.config.js';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
Firebase.initializeApp(firebaseConfig);


const participanti = mock_user_locations;



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
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
    const firebaseRef = Firebase.database().ref('Users');
    this.bindAsArray(firebaseRef.limitToLast(25), 'participanti');
    // console.log(this.state.participanti);
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
