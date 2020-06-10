/* Create server using Express*/
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users.js')()


const toObject = (name, text, id) => ({ name, text, id })



io.on('connection', socket => {
    socket.on('newUser', (data, newcallback) => {
        if (!data.name || !data.room) {
            return newcallback('Try again')
        }

        socket.join(data.room)

        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        newcallback({ userId: socket.id })
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        socket.emit('newMessage', toObject('admin', `Welcome ${data.name}`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', toObject('admin', `User ${data.name} connected`))
    })
    /*This method creates messages */
    socket.on('createMessage', (data, newcallback) => {
        let userID = data.id
        if (!data.text) {
            return newcallback('Write something')
        }
        let user = users.getUser(data.id)
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', toObject(user.name, data.text, data.id))
        }
        newcallback()
    })
    socket.on('userLeft', (id, cb) => {
        const user = users.remove(id)
        if (user) {
            io.to(user.room).emit('newMessage', toObject('admin', `User ${user.room} has left`))
        }
        cb()
    })
    socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', toObject('admin', `User ${user.room} has left`))
        }
    })
})

module.exports = {
    app,
    server
}
