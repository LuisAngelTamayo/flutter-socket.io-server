const { io } = require('../index');
//mensajes de Sockets ->
io.on('connection', client => {
    console.log('cliente conectado')

    client.on('disconnect', () => { console.log('cliente desconectado') });

    client.on('Mensaje', ( payload ) => {
        console.log('Mensaje', payload );


        io.emit('Mensaje', {admin: 'nuevo mensaje'});
    });
});