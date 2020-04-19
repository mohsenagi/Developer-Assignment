import React, { Component } from 'react';

import { Contents } from './components/Contents.js';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
  return (
    <div className="App">
          <Contents/>
    </div>
  );
  }
}
