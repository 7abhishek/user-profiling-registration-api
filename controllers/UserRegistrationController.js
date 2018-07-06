const userRegistrationService = require('./../services/UserRegistrationService')
const UserProfile = require('../models/UserProfile')
const contentTypeHeader = 'Content-Type'
const contentApplicationJson = 'application/json'
const ProfileScoreException = require('../exceptions/ProfileScoreException')

const register = (mongoClientPromise, req, res) => {
  const requestBody = req.body
  console.log("The requestBody for /register is ", requestBody)
  const userProfile = new UserProfile(requestBody.name, requestBody.savingsAmount, requestBody.loanAmount)
  userRegistrationService.register(mongoClientPromise, userProfile).then((updatedUserProfile) => {
    res.setHeader(contentTypeHeader, contentApplicationJson);
    res.send(updatedUserProfile)
  }).catch((error) => {
    console.log("error during user registration , error : ", error)
    if (error instanceof ProfileScoreException) {
      res.status(400).send(JSON.stringify({message: error.message}))
    }
    res.status(500).send("Service encountered an error, please contact administrator")
  })
}

module.exports = register