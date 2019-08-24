import React from 'react';

export default class Zillow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      addr: '',
      cityStateZip: '',
      money: 0,
      currency: 'USD'
    }
  }

  getData = () => {
    const axios = require('axios');
    axios.get(`http://localhost:3000/getZillow?addr=${this.state.addr}&cityStateZip=${this.state.cityStateZip}`)
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({money: response.data})
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  addrChange = (event) => {
    this.setState({addr: event.target.value})
  }

  cityStateZipChange = (event => {
    this.setState({cityStateZip: event.target.value})
  })

  render(){
    console.log(this.state)
    return(
      <div>
        <h1>INTACT INSURANCE</h1>
        <div>
          <h3>Address</h3>
        <input onChange={this.addrChange.bind(this)}></input>
        </div>
        <h3>City, State and ZIP</h3>
        <div>
          <input onChange={this.cityStateZipChange.bind(this)}></input>
        </div>
      <button onClick={this.getData}>
        <b>Get Estimate</b>
      </button>
      <h1>{`$ ${this.state.money} USD`}</h1>
      </div>
    )
  }
}