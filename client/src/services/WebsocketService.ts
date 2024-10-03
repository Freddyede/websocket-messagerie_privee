import {sockets} from "../constants/socket.ts";

/**
 * TODO:
 *  - [ ] Send message: émet message sur la room
 *  - [ ] Join room: Rejoins une room
 *  - [ ] Change room: leave room and join new room
 *  - [ ] on message => Que sur la room sur laquelle tu es déjà sinon rien du tout
 */
// sendMessage => Send new message
const sendMessage = (websocketMessage: {roomId: number; message: {content: string; author: string}}) => sockets.emit('message', websocketMessage);
const onMessage = (callback: any) => sockets.on('newMessage', (data) => {
 // console.log("Received message", data);
  callback(data);
});
const offMessage = (callback: any) => sockets.off('newMessage', callback);

// changeRoom / offJoinRoom => Join room
const changeRoom = (roomId: number) => sockets.emit('joinRoom', {roomId});
const leaveRoom = (roomId: number) => sockets.emit('leaveRoom', {roomId});
const onJoinRoom = (callback: any) => sockets.on('joinRoom', callback);
const offJoinRoom = (callback: any) => sockets.off('joinRoom', callback);
const offLeaveRoom = () => sockets.off('leaveRoom');


export { sendMessage, changeRoom, onJoinRoom, offJoinRoom, offMessage, leaveRoom, onMessage, offLeaveRoom};