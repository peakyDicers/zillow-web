import React from 'react';
import Button from 'react-bootstrap/Button';

export default class Vision extends React.Component {
    constructor(props) {
        super(props)
        console.log("assad")
        this.state = {
            money: 0,
            currency: 'USD'
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Button onClick={this.getPy}>Disp image</Button>
                <div dangerouslySetInnerHTML={{ __html: this.state.image }}></div>
            </div>
        )
    }

    getPy = () => {
        console.log("GEtPY");
        const axios = require('axios');
        axios.get('http://localhost:3000/getPy')
            .then((response) => {
                // handle success
                console.log(response);
                this.setState({ image: response.data })
                console.log("successful");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                console.log("hy");
            })
            .finally(function () {
                // always executed
                console.log("Whuy");
            });
    }
}