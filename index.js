const express = require('express')
const app = express()
const port = 3000

app.get('/api/v1/messages', (req, res) => {
    res.json({
        "status": "success",
        "message": "GETTING messages",
        "data": [
            {
                "id": 1,
                "text": "Hello World"
            },
            {
                "id": 2,
                "text": "Bye World"
            }
        ]
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})