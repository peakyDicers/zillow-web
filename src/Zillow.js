import React from 'react';

export default class Zillow extends React.Component{
  constructor(props){
    super(props)

  }

  getData = () => {
    const axios = require('axios');

    // Make a request for a user with a given ID
  //   var config = {
  //     headers: {'Access-Control-Allow-Origin': '*'}
  // };
  //   axios.get('http://www.zillow.com/webservice/GetZestimate.htm?zws-id=<X1-ZWz1hb9u92p3pn_a80zd>&zpid=48749425', { crossdomain: true })
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {

  //     });
    console.log("lmao")
      fetch("https://crossorigin.me/https://www.zillow.com/webservice/GetZestimate.htm?zws-id=<X1-ZWz1hb9u92p3pn_a80zd>&zpid=48749425")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
          console.log('askjdlkasjd')
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    console.log(this.state)
    return(
      <div>
      <input></input>
      <button onClick={this.getData}></button>
      <h1>HELLLLLLO THERE</h1>
      </div>
    )
  }
}