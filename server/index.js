const express = require('express')
const axios = require('axios')
const app = express()

var parseString = require('xml2js').parseString;


const port = 3000
let key = 'X1-ZWz1hb9u92p3pn_a80zd'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getZillow', (req, res) => {
  let addr =  req.query.addr;
  let cityStateZip = req.query.cityStateZip;
  // let testAddr = '2114+Bigelow+Ave';
  // let testCitystatezip = 'Seattle%2C+WA'
  let testAddr = '14500+Sylena+Way';
  let testCitystatezip = 'OklahomaCity%2C+OK'
  
  axios(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${key}&address=${testAddr}&citystatezip=${testCitystatezip}`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  }).then(data => {
    //print xml.
    //console.log(data.data)
    let xml = data.data;
    parseString(xml, function (err, result) {
      let money = result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._;
      console.log(money);
      res.send(money);
    });
  })
});

app.get('/getPy', (req, res) => {
  console.log("SErver work")
  let exec = require('child_process').exec;
  exec("python3 py/test.py", function callback(error, stdout, stderr) {
    console.log("Something happened");
    console.log(stdout);
    res.send(stdout);
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))