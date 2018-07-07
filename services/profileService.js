const profileEnum = Object.freeze({A: "A", B: "B", C: "C", D: "D"})
const savingAmountScoreMap = Object.freeze({0: 0, 2000: 1, 4000: 2, 6000: 3, 8000: 4, 10000: 5})
const loanAmountScoreMap = Object.freeze({0: 5, 2000: 4, 4000: 3, 6000: 2, 8000: 1, 10000: 0})
const _ = require('lodash')
const ProfileScoreException = require('../exceptions/ProfileScoreException')

const getProfile = (userProfile) => {
  return new Promise(function(resolve, reject) {
    const savingsAmount = userProfile.savingsAmount
    const loanAmount = userProfile.loanAmount
    const savingAmountScore = savingAmountScoreMap[savingsAmount]
    const loanAmountScore = loanAmountScoreMap[loanAmount]
    if (_.isUndefined(savingAmountScore)) {
      reject(ProfileScoreException(`savingsAmount ${savingsAmount} does not matching the denominations available`))
    }
    if (_.isUndefined(loanAmountScore)) {
      reject(new ProfileScoreException(`loanAmount ${loanAmount} does not matching the denominations available`))
    }
    const totalScore = savingAmountScore + loanAmountScore
    switch (true) {
      case (totalScore >= 8) :
        resolve(profileEnum.A)
      case (totalScore >= 6 && totalScore < 8) :
        resolve(profileEnum.B)
      case (totalScore >= 4 && totalScore < 6) :
        resolve(profileEnum.C)
      default:
        resolve(profileEnum.D)
    }
  });

}

module.exports.getProfile = getProfile