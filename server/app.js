const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const toObject = (name, text, id) => ({ name, text, id })
io.on('connection', socket => {
    socket.on('newUser', (data, newcallback) => {
        if (typeof data.name == 'null' || typeof data.room == 'null') {
            return newcallback('Try again')
        }

        newcallback({ userid: socket.id })
        socket.emit('newMessage', toObject('admin', `Welcome ${data.name}`))
    })

    socket.on('createMessage', data => {
        setTimeout(() => {
            socket.emit('newMessage', {
                text: data.text + 'Server'
            })
        }, 500)
    })
})

module.exports = {
    app,
    server
}
