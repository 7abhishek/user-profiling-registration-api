const assert = require('assert')
const dbName = 'user-profiling-system'
const collectionName = 'userProfile'

const insertUserProfile = function(mongoClientPromise, userProfile) {
  return mongoClientPromise.then((client) => {
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