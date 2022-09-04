const { io } = require('../index')

//* Sockets Messages
io.on('connection', (client) => {
    console.log('client connected')
	
    client.on('message', (data) => {
		console.log(`message: ${data.name}`)
        io.emit('message', {admin: 'New message'})
	});
	client.on('disconnect', () => {
		console.log('client disconnected')
	});
});