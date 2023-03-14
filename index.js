const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3010;
//Console.log quando nova compra é recebida
io.on('novaCompra', (data) => {
    console.log(data);
});

//Compras

app.post('/compraMl', function (req, res) {
    console.log('Nova compra recebida no Mercado Livre!');
    io.emit('novaCompra', '1');
    res.status(200).end();
});
app.post('/compraShopee', function (req, res) {
    console.log('Nova compra recebida na Shopee!');
    io.emit('novaCompra', '2');
    res.status(200).end();
});
app.post('/compraSubmarino', function (req, res) {
    console.log('Nova compra recebida no Submarino!');
    io.emit('novaCompra', '3');
    res.status(200).end();
});
app.post('/compraAmazon', function (req, res) {
    console.log('Nova compra recebida na Amazon!');
    io.emit('novaCompra', '4');
    res.status(200).end();
});
app.post('/compraMagalu', function (req, res) {
    console.log('Nova compra recebida no Magalu!');
    io.emit('novaCompra', '5');
    res.status(200).end();
});
app.post('/compraLojaInt', function (req, res) {
    console.log('Nova compra recebida na Loja Integrada!');
    io.emit('novaCompra', '6');
    res.status(200).end();
});

//Perguntas

app.post('/perguntaMl', function (req, res) {
    console.log('Nova pergunta recebida no Mercado Livre!');
    io.emit('novaPergunta', '1');
    res.status(200).end();
});
app.post('/perguntaShopee', function (req, res) {
    console.log('Nova pergunta recebida na Shopee!');
    io.emit('novaPergunta', '2');
    res.status(200).end();
});
app.post('/perguntaSubmarino', function (req, res) {
    console.log('Nova pergunta recebida no Submarino!');
    io.emit('novaPergunta', '3');
    res.status(200).end();
});
app.post('/perguntaAmazon', function (req, res) {
    console.log('Nova pergunta recebida na Amazon!');
    io.emit('novaPergunta', '4');
    res.status(200).end();
});
app.post('/perguntaMagalu', function (req, res) {
    console.log('Nova pergunta recebida no Magalu!');
    io.emit('novaPergunta', '5');
    res.status(200).end();
});
app.post('/perguntaLojaInt', function (req, res) {
    console.log('Nova pergunta recebida na Loja Integrada!');
    io.emit('novaPergunta', '6');
    res.status(200).end();
});


io.on('connection', (socket) => {
    console.log('WebSocket connected');
});

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
