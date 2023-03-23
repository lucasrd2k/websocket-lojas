const https = require('https');
const fs = require('fs');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/mapapun.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mapapun.com/fullchain.pem')
};

const server = https.createServer(options, app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const cors = require('cors');
app.use(cors());

const port = 3010;
//Console.log quando nova compra é recebida
io.on('novaCompra', (data) => {
    console.log(data);
});

//Endpoints

app.post('/endpointML', function (req, res) {
    const notification = req.body;

    // Identificar o tópico da notificação
    const topic = notification.topic;

    // Exibir o tópico no console
    console.log('Notificação recebida para o tópico:', topic);

    // Executar o procedimento correspondente para cada tópico
    if (topic === 'orders_v2') {
        // Recuperar o ID do pedido
        const orderId = notification.resource.split('/').pop();

        // Buscar detalhes do pedido
        const url = `https://api.mercadolibre.com/orders/${orderId}`;
        //Bearer .env
        const headers = { 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}` };
        axios.get(url, { headers })
            .then(response => {
                // Salvar detalhes do pedido em variáveis
                const order = response.data;
                const orderStatus = order.status;
                const orderAmount = order.total_amount;

                // Emitir no socket um objeto com os detalhes do pedido
                io.emit('novaCompra', { topic, orderStatus, orderAmount });
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do pedido:', error);
            });
    }
    else if (topic === 'questions') {
        // Recuperar o ID da pergunta
        const questionId = notification.resource.split('/').pop();

        // Buscar detalhes da pergunta
        const url = `https://api.mercadolibre.com/questions/${questionId}`;
        const headers = { 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}` };
        axios.get(url, { headers })
            .then(response => {
                // Salvar detalhes da pergunta em variáveis
                const question = response.data;
                const questionText = question.text;

                // Emitir no socket um objeto com os detalhes da pergunta
                io.emit('novaPergunta', { topic, questionText });
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes da pergunta:', error);
            });
    }
    else if (topic === 'claims') {
        // Recuperar o ID da reclamação
        const claimId = notification.resource.split('/').pop();

        // Buscar detalhes da reclamação
        const url = `https://api.mercadolibre.com/v1/claims/${claimId}`;
        const headers = { 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}` };
        axios.get(url, { headers })
            .then(response => {
                // Salvar detalhes da reclamação em variáveis
                const claim = response.data;
                const claimStatus = claim.status;

                // Emitir no socket um objeto com os detalhes da reclamação
                io.emit('novaReclamacao', { topic, claimStatus });
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes da reclamação:', error);
            });
    }

    // Responder com status 200
    res.sendStatus(200);
});
app.post('/endpointShopee', function (req, res) {
    const { code, message } = req.body;
    console.log(`Nova notificação recebida da Shopee. Código: ${code}, Mensagem: ${message}`);
    io.emit('novaNotificacao', { code, message });
    res.sendStatus(200);
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



io.on('connection', (socket) => {
    console.log('WebSocket connected: ' + socket.id);
});

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
