# Api de conexão como endpoint das lojas Hidrohot

# Versão
1.0.0 - Estrutura inicial com websocket e mercado livre inicial
1.1.0 - Adicionado shopee

# Passos a seguir

1. Testar websocket
   1. PC (Ok)
   2. Vps (Ok)
2. Implementar Mercado livre (Falta integrar)
3. Implementar Shopee (Integrando)

# Como rodar

1. git clone https://github.com/Mapapon/websocket-lojas.git
2. cd websocket-lojas
3. npm install
4. npm start ou npm run dev ou pm2 start index.js

# Como testar

1. enviar post para ip:3010/compraSubmarino
2. Verificar o console do servidor
3. Verificar nos dispositivos conectados ao websocket