const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Heroes del silencio'));
bands.addBand( new Band('Metalica'));
console.log(bands)
//mensajes de Sockets ->
io.on('connection', client => {
    console.log('cliente conectado')
    client.emit('active-bands', bands.getBands());//para emitir a los clientes las bandas registradas
    client.on('disconnect', () => { console.log('cliente desconectado') });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload );


        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });




    client.on('vote-band', ( payload ) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());//para emitir a los clientes las bandas registradas
    });


    client.on('add-band', ( payload ) => {
        const newBand = new Band(payload.name);
        bands.addBand( newBand);
        io.emit('active-bands', bands.getBands());//para emitir a los clientes las bandas registradas
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());//para emitir a los clientes las bandas registradas
    });
  
});