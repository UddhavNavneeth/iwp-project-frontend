const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

// we will use port 8000 for our app
server.listen(8080, () => console.log('connected to port 8080!'));

// only use this for dev purposes
app.use(cors());

// let pot = 0;
// let names = [];
// let serverNames = [];
// io.on('connection', socket => {
//   // below we listen if our pot is updated
//   // then emit an event to all connected sockets about the update
//   socket.on('UPDATE_POT', state => {
//     pot = state.pot;
//     socket.broadcast.emit('UPDATED_POT', state);
//   });

//   // get the current pot's value and emit it to clients
//   socket.on('GET_CURRENT_POT', () => socket.emit('CURRENT_POT', pot));

//   // add the newest client to the list of active clients
//   // then broadcast that to all connected clienhts 
//   socket.on('SEND_NAME_TO_SERVER', name => {
//     serverNames = [...serverNames, { socketId: socket.id, name }];
//     names = [...names, name];
//     socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
//     socket.emit('SEND_NAMES_TO_CLIENTS', names);
//   });

//   // broadcast to everyone if somebody pitched in
//   socket.on('SOMEONE_PITCHED_IN', name => {
//     socket.broadcast.emit('GUESS_WHO_PITCHED_IN', name);
//   });

//   // broadcast to everyone if somebody got one
//   socket.on('SOMEONE_GOT_ONE', name => {
//     socket.broadcast.emit('GUESS_WHO_GOT_ONE', name);
//   });


//   // this is to make sure that when a client disconnects
//   // the client's name will be removed from our server's list of names
//   // then broadcast that to everybody connected so their list will be updated
//   socket.on('disconnect', () => {
//     serverNames = serverNames.filter(data => data.socketId !== socket.id);
//     names = serverNames.map(data => data.name);
//     socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
//     socket.emit('SEND_NAMES_TO_CLIENTS', names);
//   });
// });

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('welcomeMessage', 'Welcome to the chat app');

    socket.broadcast.emit('joiningMessage', 'New user has joined');

    socket.on('createMessage', (message, callback) => {
        console.log('new Message:', message);


        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords, callback) => {
        
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        callback();
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})