const express = require('express')
const app = express()
const port = 3000

app.get('/health', (req, res) => res.send('The user profiling service is healthy'))

app.listen(port, () => console.log('user profiling service started at ${port}'))