import { io } from 'socket.io-client';

let socket;
export function getSocket(){
  if(!socket){
    const path=import.meta.env.VITE_SOCKET_PATH||'/socket.io';
    socket=io({withCredentials:true,autoConnect:false,path,transports:import.meta.env.PROD?['websocket']:['websocket','polling']});
  }
  return socket;
}
