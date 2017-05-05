import React, { Component } from 'react';

export default class Filter extends Component {
  static defaultProps = {
    participanti: {}
  };

  constructor(props) {
   super(props);
  //  this.state = {value: ''};

   this.handleFilterChange = this.handleFilterChange.bind(this);
 }


  handleFilterChange(e) {
    const value = e.target.value;
    console.log(this);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleFilterChange} placeholder="Filter" />
      </div>
    );
  }
}
