const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017'
const dbName = 'userProfileSystem'
const collectionName = 'userProfile'

const insertUserProfile = function(userProfile) {
  return MongoClient.connect(url, {useNewUrlParser: true}).then((client) => {
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    return collection.insertOne(userProfile).then((result) => {
      assert.equal(1, result.result.n)
      assert.equal(1, result.ops.length)
      console.debug("result of insert userProfile into database : ", result)
      console.debug("Inserted 1 userProfile into the collection")
      return userProfile;
    })
  })
}

module.exports.insertUserProfile = insertUserProfile