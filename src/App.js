import React, { Component } from 'react';
import './App.css';
import Harta from './Harta';
import mock_user_locations from './mock_user_locations';
import SidebarParticipanti from './SidebarParticipanti';

const participanti = mock_user_locations;

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <div id="clasament">
          <SidebarParticipanti participanti={participanti}></SidebarParticipanti>
        </div>

        <div id="map">
          <Harta participanti={participanti} />
        </div>
      </div>
     );
  }
}

export default App;
