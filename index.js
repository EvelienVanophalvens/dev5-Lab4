const express = require('express')
const app = express()
const port = 3000

//cors allow all
const cors = require('cors');
app.use(cors());


app.get('/api/v1/messages', (req, res) => {
    res.json({
        "status": "success",
        "message": "GETTING messages",
        "data": [
            {
                "user": "John",
                "message": "Hello"
            },
            {
                "user": "Jane",
                "message": "Hi"
            }
        ]
    })
})

app.get('/api/v1/messages/:id', (req, res) => {
    res.json({
        "status": "success",
        "message": "GETTING a message id 1",
        "data": {
            "user": "John",
            "message": "Hello"
        }
    })
})

app.post('/api/v1/messages', (req, res) => {
    res.json({
        "status": "success",
        "message": "POSTING a new message for user John",
        "data": {
            "user": "John",
            "message": "How are you?"
        }
    })
})

app.put('/api/v1/messages/:id', (req, res) => {
    res.json({
        "status": "success",
        "message": "UPDATING a message id 1",
        "data": {
            "user": "John",
            "message": "Hello"
        }
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})