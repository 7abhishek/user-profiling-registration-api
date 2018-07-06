const userRegistrationService = require('./../services/UserRegistrationService')
const UserProfile = require('../models/UserProfile')
const contentTypeHeader = 'Content-Type'
const contentApplicationJson = 'application/json'

const register = (request, response) => {
  const requestBody = request.body
  console.log("the requestBody for register method is ", requestBody)
  const userProfile = new UserProfile(requestBody.name, requestBody.savingsAmount, requestBody.loanAmount)
  userRegistrationService.register(userProfile).then((updatedUserProfile) => {
    response.setHeader(contentTypeHeader, contentApplicationJson);
    response.send(updatedUserProfile)
  }).catch((error) => {
    console.log("error during user registration ", error)
    response.status(500).send("Service encountered an error, please contact administrator")
  })
}

module.exports = register