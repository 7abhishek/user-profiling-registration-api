class MongoClientProvider {

  getMongoClient () {
    const MongoClient = require('mongodb').MongoClient
    const url = 'mongodb://userProfileService:User2018@ds227110.mlab.com:27110/user-profiling-system'
    const mongoClient = MongoClient.connect(url, {useNewUrlParser: true})
    return mongoClient
  }
}

module.exports = MongoClientProvider