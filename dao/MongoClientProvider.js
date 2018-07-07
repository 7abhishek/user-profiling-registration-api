const config = require('config')
const mongodb = 'mongodb'
const MongoClient = require(mongodb).MongoClient
const mongoDbConfig = config.get('mongoDbConfig')
const mongoDbHost = mongoDbConfig['host']
const mongoDbPort = mongoDbConfig['port']
const mongoDbName = mongoDbConfig['dbName']
const mongoDbUserName = process.env.MONGODB_USER_NAME
const mongoDbUserPassword = process.env.MONGODB_USER_PASSWORD

class MongoClientProvider {

  getMongoClient () {
    const url = `${mongodb}://${mongoDbUserName}:${mongoDbUserPassword}@${mongoDbHost}:${mongoDbPort}/${mongoDbName}`
    const mongoClient = MongoClient.connect(url, {useNewUrlParser: true})
    return mongoClient
  }
}

module.exports = MongoClientProvider