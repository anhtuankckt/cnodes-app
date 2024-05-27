const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes/index')

const corsOptions = { origin: "*" }

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors(corsOptions))

// routes
app.use('/api/v1', routes)

const port = process.env.PORT || 8001

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('DB Connected!')
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
