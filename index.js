import 'dotenv/config'
import webSocket from 'ws';
import onConnect from './handlers/connect';

const { SERVER_PORT } = process.env;

try {
    const server = new webSocket.Server({port: SERVER_PORT});
    server.on('connection', onConnect);
    console.log(`[Server is started]`);
    console.log(`Port: ${SERVER_PORT}`);
} catch (e) {
    console.log(e);
}
