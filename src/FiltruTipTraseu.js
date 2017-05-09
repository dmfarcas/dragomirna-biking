import React, { Component } from 'react';
import './Cautare.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(e) {
    this.props.handleInputChange(e);
  }

  render() {
    return (
      <form id="filtru-tip-traseu">      
        <label>
          Traseu scurt
          <input
            name="traseuScurt"
            type="checkbox"
            checked={this.props.traseuScurt}
            onChange={this.handleInputChange} />
        </label>        
        <label>
          Traseu lung
          <input
            name="traseuLung"
            type="checkbox"
            checked={this.props.traseuLung}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
