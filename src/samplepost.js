var supertest = require('supertest'),
    api = supertest('http://localhost:3030');

var endpoints = '/stores';
class samplepost
{

createNewStores()
{
    api.post(endpoints, function(req, res){
        console.log(req.log());
        console.log(res.body());
    })
    
api.post(endpoints).send({
    "name": "satwik",
    "type": "storeName",
    "address": "sec 65 Noida",
    "address2": "GC2",
    "city": "Noida",
    "state": "UP",
    "zip": "201309",
    "lat": 0,
    "lng": 0,
    "hours": "24",
    "services": {}
  }).set('Accept', 'application/json')
.expect('Content-Type', /json/)
.expect(201)
}
}

module.exports = samplepost;