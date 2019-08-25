import React from 'react';
import DropdownComp from './DropdownComp'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown'

export default class Zillow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addr: '',
      cityStateZip: '',
      money: 0,
      largeScaleMoney: 0,
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

  getTotalDamage = async () => {
    const axios = require('axios');
    let houses = await axios.get('http://localhost:3000/getPy')

    axios.post(`http://localhost:3000/getTotalDamage`, {
      data: houses
      // data:[
      //   {
      //     addr: '2114+Bigelow+Ave',
      //     cityStateZip:'Seattle%2C+WA'
      //   },
      //   {
      //     addr: '2114+Bigelow+Ave',
      //     cityStateZip:'Seattle%2C+WA'
      //   }
      // ]
    })
      .then((response) => {
        console.log(response);
        this.setState({ largeScaleMoney: response.data })
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

  uploadCompleted = () => {
    this.setState({ loading: false })
  }

  runApp = () => {
    this.setState({ loading: true })
    setTimeout(this.uploadCompleted, 3000, 'funky');
  }

  imgSelected = (e) => {

    this.setState({ file: URL.createObjectURL(e.target.files[0]) });
  }

  renderLoading = () => {
    if (this.state.loading)
      return <Spinner animation="border" />
    else
      return <div />
  }

  renderDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Natural Disasters
  </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Tornados</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Hurricanes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Floods</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Wildfires</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Earthquakes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Drought</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    return (
      <Container className='mt-3'>
        <Row>
          <h1 style={{ marginTop: 15, marginLeft: 18 }}>Assure AI</h1>
        </Row>
        <Row style={{ marginBottom: 5 }}>
          <h5 style={{ marginTop: -5, marginLeft: 18 }}>Large-scale insurrance assurance.</h5>
        </Row>
        <Row>
          <Col>
            <Card>

              <Card.Body>
                <Card.Title>Estimate Cost of Large Affected Area</Card.Title>
                <Card.Text>
                  Estimate the cost of catestrophic damage affecting a large area.
                </Card.Text>
                {this.renderDropdown()}
                <Card.Img variant="top" src={this.state.file} />
                <input type='file' onChange={(e) => this.imgSelected(e)} />
                <div className={"mt-2"}>
                  <Button onClick={this.getTotalDamage}>Get Total Damage Cost</Button>
                  <Button onClick={this.runApp} className={"ml-3"}>GO</Button>
                  <h2>{`$ ${this.state.largeScaleMoney} USD`}</h2>
                </div>
                {this.renderLoading()}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Estimate cost of single property.
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
                <div>
                  <Row>
                    <Col>
                      <Button onClick={this.getData}>Get Estimate</Button>
                    </Col>
                    <Col>
                      <h2>{`$ ${this.state.money} USD`}</h2>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}