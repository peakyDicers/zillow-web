import React from 'react';
import DropdownComp from './DropdownComp'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default class Zillow extends React.Component {
  constructor(props) {
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
        this.setState({ money: response.data })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  getTotalDamage = () => {
    const axios = require('axios');
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/getTotalDamage',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   }
    // });
    axios.post(`http://localhost:3000/getTotalDamage`, {
      data:[
        {
          addr: '2114+Bigelow+Ave',
          cityStateZip:'Seattle%2C+WA'
        },
        {
          addr: '2114+Bigelow+Ave',
          cityStateZip:'Seattle%2C+WA'
        }
      ]
    })
      .then((response) => {
        console.log(response);
        this.setState({ money: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  addrChange = (event) => {
    this.setState({ addr: event.target.value })
  }

  cityStateZipChange = (event => {
    this.setState({ cityStateZip: event.target.value })
  })

  render() {
    return (
      <Container className='mt-5'>
        <Row>
          <Col>
            <Container>
              <h1 style={{ marginTop: 15 }}>INTACT INSURANCE</h1>
              <DropdownComp />
            </Container>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Find cost of a property
              </Card.Title>
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={this.addrChange.bind(this)} placeholder="742 Evergreen Terrace" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>City, State and ZIP</Form.Label>
                    <Form.Control onChange={this.cityStateZipChange.bind(this)} placeholder="Springfield 0293A" />
                  </Form.Group>
                </Form>
                <Container>
                  <Row>
                    <Col>
                      <Button onClick={this.getData}>Get Estimate</Button>
                    </Col>
                    <Col>
                      <h2>{`$ ${this.state.money} USD`}</h2>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    )
  }
}