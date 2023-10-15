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
                "user": 2,
                "message": "Hi"
            }
        ]
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})