const express = require('express');
const app = express();
const port = 3000;

//cors allow all
const cors = require('cors');
app.use(cors());

//env
require('dotenv').config();

//moogoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);




const messageSchema = new mongoose.Schema(
    {
      user: String,
      text: String,
    },
    {
      collection: "messages",
    }
  );

const Message = mongoose.model("Message", messageSchema);

app.use(express.json());


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

app.post("/api/v1/messages", async (req, res) => {

    const { user, text } = req.body.message;
  
    const newMessage = new Message({
      user,
      text
    });

    try {
      const message = await newMessage.save();
      res.json({
        status: "success",
        message: `POSTING a new message for user ${user}`,
        data: {
          message,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to save message",
      });
    }
  });
  

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

app.delete('/api/v1/messages/:id', (req, res) => {
    res.json({
        "status": "success",
        "message": "DELETING a message id 1"
    })
})

app.get('/api/v1/messages?user="username"', (req, res) => {
    res.json({
        "status": "success",
        "message": "GETTING message for username John",
        "data": {
            "user": "John",
            "message": "How are you?"
        }
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

