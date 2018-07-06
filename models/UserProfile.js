class UserProfile {

  constructor (name, savingsAmount, loanAmount, profile) {
    this.name = name
    this.savingsAmount = savingsAmount
    this.loanAmount = loanAmount
    this.profile = profile
    Object.freeze(this)
  }

  setProfile (profile) {
    return new UserProfile(this.name, this.savingsAmount, this.loanAmount, profile)
  }
}

module.exports = UserProfile