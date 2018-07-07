const userRegsitrationController = require('../../../controllers/UserRegistrationController')
const userRegistrationService = require('../../../services/UserRegistrationService')
const sinon = require('sinon')
const expect = require('chai').expect
const mongoClientPromise = sinon.fake()
const fakeRequestBody = Object({
  name: "John",
  savingsAmount: 2000,
  loanAmount: 8000
})

const fakeResponseObject = Object({
  name: "John",
  savingsAmount: 2000,
  loanAmount: 8000,
  profile: "A"
})
const fakeRequest = {
  body: fakeRequestBody
}
const fakeSendSpy = sinon.spy()
const fakeStatusSpy = sinon.spy()
const fakeSetHeader = sinon.spy()
const fakeResponseHandler = sinon.spy()

describe('UserRegsitrationController', () => {

  beforeEach((done) => {
    sinon.stub(userRegistrationService, 'register').resolves(Promise.resolve(fakeResponseObject))
    fakeResponseHandler.send = fakeSendSpy
    fakeResponseHandler.status = fakeStatusSpy
    fakeResponseHandler.setHeader = fakeSetHeader
    done()
  })

  describe('register', () => {
    it('should call the userRegistrationService once', async () => {
      await userRegsitrationController.register(mongoClientPromise, fakeRequest, fakeResponseHandler)
      expect(userRegistrationService.register.calledOnce).to.be.true;
      expect(fakeResponseHandler.setHeader.calledOnce).to.be.true
      expect(fakeResponseHandler.send.calledOnce).to.be.true
    })
  })
})