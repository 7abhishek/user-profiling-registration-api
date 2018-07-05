const profileService = require('./profileService')
const userProfileDao = require('../dao/userProfileDao')

const register = (userProfile) => {
  const profile = profileService.getProfile(userProfile)
  const profileAssignedUserProfile = userProfile.setProfile(profile)
  return userProfileDao.insertUserProfile(profileAssignedUserProfile).then((updatedUserProfile) => {
    console.log("updatedUserProfile : ", updatedUserProfile)
    return updatedUserProfile
  })
}

module.exports.register = register