"use strict";

const env = require('dotenv').config();
const express = require('express');
const app = express();
const superRequest = require('superagent'); //request alt
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.AUTHORIZATION);
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));



app.get('/geolocation/*', proxy);
app.get('/yelp/search', yelpSearchProxy);
app.get('/yelp/business', yelpBusinessProxy);
  
function googleProxy(request, response) {
  console.log('received google request!' + request.body);
  superRequest
    .post(`https://www.googleapis.com/geolocation/v1/geolocate?${process.env.KEY}`)
    .end((err, resp) => response.send(resp));
} 

function yelpSearchProxy(request, response) {
  client.search(request.query)
    .then(resp => response.send(resp.jsonBody.businesses))
    .catch(err => console.error(err));
}

function yelpBusinessProxy(request, response) { // to get photos
  client.business(request.query.id)
    .then(resp => response.send(resp.jsonBody.photos))
    .catch(err => console.error(err));
}



app.listen(PORT,()=>console.log(`server started: ${PORT}`));