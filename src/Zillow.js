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
    let response = await axios.get('http://localhost:3000/getPyData')

    let houses = response.data;
    houses = this.prepareHouses(houses);
    axios.post(`http://localhost:3000/getTotalDamage`, {
      data: houses
    })
      .then((response) => {
        this.setState({ largeScaleMoney: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  prepareHouses = (data) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
      let house = data[i];
      let newHouse = {};
      newHouse.lat = house.lat;
      newHouse.lng = house.lng;
      for (let j = 0; j < house.address.length; j++) {
        if (house.address[j] === ',') {
          newHouse.addr = house.address.slice(0, j);
          newHouse.cityStateZip = house.address.slice(j + 2, house.address.length);
          break;
        }
      }
      result.push(newHouse);
    }
    return result;
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

  getDataUri(url, callback) {
  var image = new Image();

  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);

    // Get raw image data
    callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

    // ... or get as Data URI
    callback(canvas.toDataURL('image/png'));
  };

  image.src = url;
}

  imgSelected = (e) => {

    this.setState({ file: URL.createObjectURL(e.target.files[0]) });
  }

  renderLoading = () => {
    if (this.state.loading)
      return <div>
        <Row>
          <Spinner animation="border" />
          <p className={"ml-3"}>Robots at work!</p>
        </Row>
      </div>
    else
      return <div />
  }

  renderDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Current Events
  </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">2018 Albion Montana Tornado</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2017 Hurricane Harvey</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2013 Moore Tornado</Dropdown.Item>
          <Dropdown.Item href="#/action-4">2012 Hurricane Sandy</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    return (
      <Container className='mt-3'>
        <Row className="m-3">
          <img height="60px" src="./media/logo-aai.png"></img>
          <h1 className="ml-3">Assure AI</h1>
        </Row>
        <Row className="m-3"> 
          <h5>Large-scale insurance assurance!</h5>
        </Row>
        <Row>
          <Col>
            <Card>

              <Card.Body>
                <Card.Title>Estimate Damage Cost of Affected Area</Card.Title>
                <Card.Text>
                  Choose an event from the dropdown below and import an image to get your estimate.
                </Card.Text>
                {this.renderDropdown()}
                <Card.Img variant="top" src={this.state.file} />
                <input type='file' onChange={(e) => this.imgSelected(e)} style={{ marginTop: -15, marginBottom: 15 }} />
                <div className={"mt-2"}>
                  <Row style={{ marginLeft: 0 }}>
                    <Col className="centered">
                      <Button onClick={this.getTotalDamage}>Get Total Damage Cost</Button>
                    </Col>
                    <Col className="centered">
                      <Button onClick={this.runApp} className={"ml-3"}>GO</Button>

                    </Col>
                    <Col className="text-right">
                      <Button className="disabled btn-light">{`$ ${this.state.largeScaleMoney} USD`}</Button>
                    </Col>
                  </Row>
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
                    <Col style={{ marginTop: 5 }} className="centered">
                      <Button onClick={this.getData}>Get Estimate</Button>
                    </Col>
                    <Col className="text-right">
                      <Button className="disabled btn-light">{`$ ${this.state.money} USD`}</Button>
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