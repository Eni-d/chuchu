const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./Routes/routes')
const app = express()

// mongoose.connect('mongodb://localhost/spaces', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://dbDaniel:dbDaniel@cluster0.rcsbe.mongodb.net/space?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})