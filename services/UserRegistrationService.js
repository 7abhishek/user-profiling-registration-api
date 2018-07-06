const profileService = require('./profileService')
const userProfileDao = require('../dao/userProfileDao')

const register = (mongoClientPromise, userProfile) => {
  return profileService.getProfile(userProfile).then((profile) => {
    const profileAssignedUserProfile = userProfile.setProfile(profile)
    return userProfileDao.insertUserProfile(mongoClientPromise, profileAssignedUserProfile).then((updatedUserProfile) => {
      console.log("updatedUserProfile : ", updatedUserProfile)
      return updatedUserProfile
    })
  })
}

module.exports.register = register