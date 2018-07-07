process.env.NODE_ENV = 'test'
require('express-di')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../server')
const should = chai.should();
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient;
MongoClient.persist = "mongo.js"

chai.use(chaiHttp)

describe('UserRegistration', () => {
  beforeEach((done) => { //Before each test we empty the database
    server.factory('mongoClientPromise', (req, res, next) => {
      next(null, getFakeMongoClient())
    })
    done()
  })

  afterEach((done) => {
    done()
  })

  const registerEndpoint = '/v1/register'
  describe(`POST ${registerEndpoint}`, () => {

    it('should successfully register user with profile A', (done) => {
      let user = {
        name: "John",
        savingsAmount: 10000,
        loanAmount: 0
      }
      let expectedProfile = 'A'

      chai.request(server)
        .post(registerEndpoint)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('savingsAmount');
          res.body.should.have.property('loanAmount');
          res.body.should.have.property('profile').eql(expectedProfile);
          done();
        });
    })

    it('should successfully register user with profile B', (done) => {
      let user = {
        name: "John",
        savingsAmount: 6000,
        loanAmount: 4000
      }
      let expectedProfile = 'B'

      chai.request(server)
        .post(registerEndpoint)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('savingsAmount')
          res.body.should.have.property('loanAmount')
          res.body.should.have.property('profile').eql(expectedProfile)
          done()
        })
    })

    it('should successfully register user with profile C', (done) => {
      let user = {
        name: "John",
        savingsAmount: 6000,
        loanAmount: 6000
      }
      let expectedProfile = 'C'

      chai.request(server)
        .post(registerEndpoint)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('savingsAmount')
          res.body.should.have.property('loanAmount')
          res.body.should.have.property('profile').eql(expectedProfile)
          done()
        })
    })

    it('should successfully register user with profile D', (done) => {
      let user = {
        name: "John",
        savingsAmount: 6000,
        loanAmount: 10000
      }
      let expectedProfile = 'D'

      chai.request(server)
        .post(registerEndpoint)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('savingsAmount')
          res.body.should.have.property('loanAmount')
          res.body.should.have.property('profile').eql(expectedProfile)
          done()
        })
    })
  })
})

const getFakeMongoClient = () => {
  const testMongoUrl = 'mongodb://localhost:27017/fakeDb'
  return MongoClient.connect(testMongoUrl, {useNewUrlParser: true})
}