class UserProfile {

  constructor (name, savingsAmount, loanAmount, profile, _id) {
    this.name = name
    this.savingsAmount = savingsAmount
    this.loanAmount = loanAmount
    this.profile = profile
  }

  setProfile (profile) {
    return new UserProfile(this.name, this.savingsAmount, this.loanAmount, profile)
  }
}

module.exports = UserProfile