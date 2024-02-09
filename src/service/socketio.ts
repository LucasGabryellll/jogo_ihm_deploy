import { io } from 'socket.io-client';

const serverHTTP = "ws://192.141.250.21:5000";
//const serverHTTP = "ws://192.168.99.28:5000"

const socket = io(serverHTTP, {
  transports: ['websocket'],
  autoConnect: false
});

export { socket };