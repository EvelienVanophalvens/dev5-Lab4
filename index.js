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


app.get('/api/v1/messages', async (req, res)  => {
  
  const messages = await Message.find();

    res.json({
        status: "success",
        message: "GETTING messages",
        data: [
            messages
        ]
    })
})



app.get('/api/v1/messages/:id', async (req, res) => {
  const id = req.params.id;
  const message = await Message.findById(id);

  if (!message) {
    // Als het bericht niet wordt gevonden, stuur een foutreactie met status 404
    return res.json({
      status: 'error',
      message: `Could not find message with id: ${id} `,
    });
  }

    res.json({
        status: "success",
        message: "GETTING a message id 1",
        data: {
            message
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
  

app.put('/api/v1/messages/:id', async (req, res) => {
  const id = req.params.id;
  const { user, text } = req.body.message;
  
  //update message in database with new data
  try{
    const updateMessage = await Message.findByIdAndUpdate(id, {user, text}, {new: true});

    if (!updateMessage) {
      // Als het bericht niet wordt gevonden, stuur een foutreactie met status 404
      return res.json({
        status: 'error',
        message: `Could not find message with id: ${id} `,
      });
    }
  
    res.json({
        status: "success",
        message: "UPDATING a message id 1",
        data: {
          message: updateMessage
        }
    })
  } catch(err) {
    res.status(500).json({
      status: "error",
      message: "Failed to update message",
    });
    
  }


    
})

app.delete('/api/v1/messages/:id', (req, res) => {
  id = req.params.id;
  try{
    const deleteMessage = Message.findByIdAndDelete(id);

    if (!deleteMessage) {
      // Als het bericht niet wordt gevonden, stuur een foutreactie met status 404
      return res.json({
        status: 'error',
        message: `Could not find message with id: ${id} `,
      });
    }

    res.json({
      status: "success",
      message: "DELETING a message id 1"
  })
} catch(err) {
  res.status(500).json({
    status: "error",
    message: "Failed to delete message",
  });

}


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

