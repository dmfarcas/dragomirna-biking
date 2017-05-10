import React, { Component } from 'react';
import './Cautare.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleTipTraseuChange = this.handleTipTraseuChange.bind(this);
  }


  handleTipTraseuChange(e) {
    this.props.handleTipTraseuChange(e);
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
            onChange={this.handleTipTraseuChange} />
        </label>        
        <label>
          Traseu lung
          <input
            name="traseuLung"
            type="checkbox"
            checked={this.props.traseuLung}
            onChange={this.handleTipTraseuChange} />
        </label>
      </form>
    );
  }
}
