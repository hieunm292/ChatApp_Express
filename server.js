const express = require('express')
const app = express()
const path =require('path')
const port = 4000
const http=require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const io=require('socket.io')(http)

io.on('connection', socket => {
  console.log('oke oke')

  socket.on('sendMessage', msg=>{
    socket.broadcast.emit('sendToAll', msg)
  })
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})