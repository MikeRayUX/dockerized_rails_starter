import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

const SampleComponent = () => {
  return (
    <div>
      <h1>this is a sample react component</h1>
    </div>
  );
};

const App = document.createElement('div');

App.setAttribute('id', 'App');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<SampleComponent />, document.body.appendChild(App));
});
