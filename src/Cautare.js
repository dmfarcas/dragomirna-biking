import React, { Component } from 'react';

export default class Filter extends Component {
  static defaultProps = {
    participanti: {}
  };

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
          type="text" 
          onChange={this.handleFilterTextInputChange} 
          value={this.props.filterText}
          placeholder="Filter" />
      </div>
    );
  }
}
