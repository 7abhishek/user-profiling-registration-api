class MongoClientProvider {

  getMongoClient () {
    const MongoClient = require('mongodb').MongoClient
    const url = 'mongodb://localhost:27017'
    const mongoClient = MongoClient.connect(url, {useNewUrlParser: true})
    return mongoClient
  }
}

module.exports = MongoClientProvider