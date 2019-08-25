const express = require('express')
const axios = require('axios')
const app = express()

var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser')
app.use(bodyParser.json());

const port = 3000
let key = 'X1-ZWz1hb9u92p3pn_a80zd'

app.get('/getPy', (req, res) => {
  var isWin = process.platform === "win32";
  let py = isWin ? 'python' : 'python3';

  console.log("SErver work")
  let exec = require('child_process').exec;
  exec(`${py} py/test.py`, function callback(error, stdout, stderr) {
    console.log("Something happened");
    console.log(stdout);
    res.send(stdout);
  })
});


app.get('/getPyData', (req, res) => {
  var isWin = process.platform === "win32";
  let py = isWin ? 'python' : 'python3';

  console.log("SErver work")
  let exec = require('child_process').exec;
  exec(`cd py/mask-rcnn/program/cat3damage/ && ${py} get_data.py`, function callback(error, stdout, stderr) {
    console.log("Something happened");
    console.log(stdout);
    console.log(stderr);
    res.send(stdout);
  })
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/getTotalDamage', async (req, res) => {

  let houses = req.body.data; //array of house objects.

  let totalCost = 0;
  let housesCounted = 0;
  let houseVals = []

  houses.forEach(house => {
    houseVals.push(getHouseValue(house.addr, house.cityStateZip)) //TODO: make sure these parameters are correct.
  });

  houseVals = await Promise.all(houseVals);

  houseVals.forEach(houseVal => {

    if (houseVal === -1)
      return;

    totalCost += houseVal;
    housesCounted++;
  })
  console.log('hello world', totalCost, ' ', housesCounted)
  //calculate avg cost of a house, and use these vals for houses we couldn't query.
  let avgHouseCost = totalCost / housesCounted;
  totalCost += avgHouseCost * (houses.length - housesCounted)

  res.send(totalCost.toString());
});

let getHouseValue = async (addr, cityStateZip) => {
  let data = await axios(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${key}&address=${addr}&citystatezip=${cityStateZip}`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  });

  let xml = data.data;

  let result = await xml2json(xml)

  //check if query failed.
  let isFail = result["SearchResults:searchresults"].message[0].code[0];
  if (isFail !== "0") return -1;

  let money = result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._;

  return parseInt(money);
}


app.get('/getZillow', (req, res) => {
  let addr = req.query.addr;
  let cityStateZip = req.query.cityStateZip;
  // let testAddr = '2114+Bigelow+Ave';
  // let testCitystatezip = 'Seattle%2C+WA'
  let testAddr = '14500+Sylena+Way';
  let testCitystatezip = 'OklahomaCity%2C+OK'


  axios(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${key}&address=${addr}&citystatezip=${cityStateZip}`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  }).then(async data => {


    

    let result = await xml2json(data.data);
    console.log(JSON.stringify(result));
    let isFail = result["SearchResults:searchresults"].message[0].code[0];
    if (isFail !== "0") {
      res.send('N/A')
      return;
    }

    let money = result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._;
    res.send(money);
  });
})

async function xml2json(xml) {
  console.log(xml)
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, json) {
      if (err)
        reject(err);
      else
        resolve(json);
    });
  });
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))