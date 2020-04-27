export const state = () => ({})

export const actions = {
    SOCKET_newMessage(ctx, data) { // calling our action , when 
        console.log('Message received', data)// We will receive this message if server sends response to us
    }
}