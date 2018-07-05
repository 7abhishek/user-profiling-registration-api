const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRegistrationController = require('./controllers/userRegistrationController')
const healthEndPointPath = "/health"
const userRegistrationEndPointPath = "/register"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get(healthEndPointPath, (req, res) => res.send('The user profiling service is healthy'))
app.post(userRegistrationEndPointPath, userRegistrationController)

app.listen(port, () => console.log(`user profiling service started at ${port}`))