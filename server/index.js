const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path');

var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser')
app.use(bodyParser.json());

const port = 3000
let key = 'X1-ZWz1hb9u92p3pn_a80zd'

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/getPy', (req, res) => {
  var isWin = process.platform === "win32";
  let py = isWin ? 'python' : 'python3';

  
  let exec = require('child_process').exec;
  exec(`${py} py/test.py`, function callback(error, stdout, stderr) {
  
  
    res.send(stdout);
  })
});

app.post('/getMorePyData', (req, res) => {
  var isWin = process.platform === "win32";
  let py = isWin ? 'python' : 'python3';
  
  let damn_data = req.body.data;

  let exec = require('child_process').exec;
  exec(`cd py/mask-rcnn/program/cat3damage/ && ${py} get_more_data.py '${damn_data}'`, function callback(error, stdout, stderr) {
    console.log(stdout);
    res.send(stdout);
  })
});

app.get('/getPyData', (req, res) => {
  var isWin = process.platform === "win32";
  let py = isWin ? 'python' : 'python3';

  let exec = require('child_process').exec;
  exec(`cd py/mask-rcnn/program/cat3damage/ && ${py} get_data.py`, function callback(error, stdout, stderr) {
    res.send(stdout);
  })
});

app.post('/getImgData', (req, res) => {

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
    if (houseVal === -1 || houseVal === undefined || isNaN(houseVal) ){
      console.log("No house val.")
      return;
    }
    console.log(houseVal);
    totalCost += houseVal;
    housesCounted++;
  })
  //calculate avg cost of a house, and use these vals for houses we couldn't query.
  let avgHouseCost = totalCost / housesCounted;
  totalCost += avgHouseCost * (houses.length - housesCounted)
  totalCost = parseInt(totalCost);
  res.send(totalCost.toString());
});

let getHouseValue = async (addr, cityStateZip) => {
  try {
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
  } catch(err){
    
  }
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
    
    let isFail = result["SearchResults:searchresults"].message[0].code[0];
    if (isFail !== "0") {
      res.send('N/A')
      return;
    }

    let money = result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._;
    res.send(money);
  });
})

app.get('/getImage', (req, res) => {
  // res.sendFile('/py/mask-rcnn/program/cat3damage/output.png');
  res.sendFile(path.join(__dirname, 'py/mask-rcnn/program/cat3damage/output.png'));

})

async function xml2json(xml) {
  
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