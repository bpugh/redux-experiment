import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
require('./style.css');
const pair = ['Transpotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="Transpotting"/>,
  document.getElementById('app')
);
