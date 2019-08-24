import React from 'react';

export default class Zillow extends React.Component{
  constructor(props){
    super(props)
    console.log("assad")
    this.state = {
      money: 0,
      currency: 'USD'
    }
  }

  getData = () => {
    const axios = require('axios');
    axios.get('http://localhost:3000/getZillow')
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

  render(){
    console.log(this.state)
    return(
      <div>
        <div>
        <input></input>
        </div>
        <div>
        <input></input>
        </div>
        <button>go</button>
      <input></input>
      <button onClick={this.getData}></button>
      <h1>HELLLLLLO THERE</h1>
      <h1>{`$ ${this.state.money} USD`}</h1>
      </div>
    )
  }
}