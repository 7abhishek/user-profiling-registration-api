const profileService = require('./profileService')

const register = (userProfile) => {
  let profile = profileService.getProfile(userProfile)
  const updatedUserProfile = userProfile.setProfile(profile)
  console.log("updatedUserProfile : ", updatedUserProfile)
  return updatedUserProfile
}

module.exports.register = register