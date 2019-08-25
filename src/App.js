import React from 'react';
import logo from './logo.svg';
import './App.css';
import Zillow from './Zillow';
import Vision from './Vision';
import Gmap from './GMap'

function App() {
  return (
    <div className="App">

      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />

      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossorigin
      />

      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin
      />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <script>var Alert = ReactBootstrap.Alert;</script>
      <Zillow />
      <Vision />

    </div>
  );
}

export default App;
