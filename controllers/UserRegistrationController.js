const userRegistrationService = require('./../services/UserRegistrationService')
const UserProfile = require('../models/UserProfile')

const register = (request, response) => {
  const requestBody = request.body
  console.log("the requestBody for register method is ", requestBody)
  const userProfile = new UserProfile(requestBody.name, requestBody.savingsAmount, requestBody.loanAmount)
  const updatedUserProfile = userRegistrationService.register(userProfile)
  response.send(updatedUserProfile)
}

module.exports = register