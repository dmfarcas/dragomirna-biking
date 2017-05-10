import React, { Component } from 'react';
import './Cautare.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  handleFilterChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <div>
        <input 
          id="cautare"
          type="text" 
          onChange={this.handleFilterTextInputChange} 
          value={this.props.filterText}
          placeholder="Căutare după Nume sau Număr" />
      </div>
    );
  }
}
