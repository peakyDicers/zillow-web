import React from 'react';

export default class Zillow extends React.Component{
  constructor(props){
    super(props)

  }

  getData = () => {
    const axios = require('axios');

    // Make a request for a user with a given ID
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
  };
    axios.get('http://www.zillow.com/webservice/GetZestimate.htm?zws-id=<X1-ZWz1hb9u92p3pn_a80zd>&zpid=48749425', config)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {

      });
  }

  render(){
    return(
      <div>
      <input></input>
      <button onClick={this.getData}></button>
      <h1>HELLLLLLO THERE</h1>
      </div>
    )
  }
}