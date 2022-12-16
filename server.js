const { WebSocketServer } = require('ws');
const webSocket = require('ws');
const PORT = 5000;

const wsServer = new webSocket.Server({
    port : PORT
});

console.log((new Date()) + " Server listening on port: " + PORT)

wsServer.on('connection', function(client){
    //ANNOUNCE
    console.log('A new client joined');

    //Attach behaviour to incoming client
    client.on('message', function(msg)
    {
        console.log('Received messsage from client :' + msg);
        //Boadcast to all 
        //client.send('Take this back:' + msg);
        wsServer.clients.forEach(function(clientInstance)
        {
            clientInstance.send('Someone said :' + msg)
        })
    })

    client.on('close', function(){
        console.log('someone left the chat');
        wsServer.clients.forEach((c)=>
        {
            c.send('someone left the chat');
        })
    })


});