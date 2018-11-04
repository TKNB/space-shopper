import React, { Component } from 'react';

export default class ProductAlert extends Component {
  render() {
    const { alert } = this.props
    let alertState = alert === '' ? 'noAlert' : 'alert alert-success animated flipInY';
    return (
      <div>
        <div className="container">
          <div className={alertState}>
            {alert}
          </div>
        </div>
      </div>
    )
  }
};
