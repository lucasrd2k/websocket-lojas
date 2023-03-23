const io = require('socket.io-client');
const socket = io('https://143.198.186.69:3010');

socket.on('connect', () => {
    console.log('Conectado ao servidor');
});


socket.on('novaCompra', (data) => {
    console.log('Nova compra recebida:', data);
});

socket.on('novaPergunta', (data) => {
    console.log('Nova pergunta recebida:', data);
});
