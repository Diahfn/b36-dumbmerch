const express = require('express')
require('dotenv').config()

const router = require('./src/routes')

const cors = require('cors')

// import server for Socket.io
const http = require('http')
const { Server } = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL 
    }
})

// Import socket function and call it with paramater io
require('./src/socket')(io)

const PORT = 5000 || process.env.PORT ||

app.use(express.json())
app.use(cors())

app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

app.get('/', function (req, res) {
    res.send({
      message: 'Hello World',
    });
  });

server.listen(process.env.PORT || PORT, () => console.log(`Server running on port: ${PORT}`))