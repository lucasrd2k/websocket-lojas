const io = require('socket.io-client');
const socket = io('http://localhost:3010');

socket.on('novaCompra', (data) => {
    console.log('Nova compra recebida:', data);
});

socket.on('novaPergunta', (data) => {
    console.log('Nova pergunta recebida:', data);
});
