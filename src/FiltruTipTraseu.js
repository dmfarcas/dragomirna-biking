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
        <label className="filtru-tip-traseu__label">
          <input
            name="traseuScurt"
            type="checkbox"
            checked={this.props.traseuScurt}
            onChange={this.handleTipTraseuChange} />
          <svg className="icon icon--checkbox" width="24" height="24">
            <use className="off" xlinkHref="#iconCheck"></use>
            <use className="on" xlinkHref="#iconCheckOn"></use>
          </svg>
          <span>Traseu scurt</span>
        </label>        
        <label className="filtru-tip-traseu__label">
          <input
            name="traseuLung"
            type="checkbox"
            checked={this.props.traseuLung}
            onChange={this.handleTipTraseuChange} />
          <svg className="icon icon--checkbox" width="24" height="24">
            <use className="off" xlinkHref="#iconCheck"></use>
            <use className="on" xlinkHref="#iconCheckOn"></use>
          </svg>
          <span>Traseu lung</span>
        </label>
      </form>
    );
  }
}
