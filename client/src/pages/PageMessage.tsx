import {useEffect, useState} from "react";
import './pageMessage.css';
import {RoomListComponent} from "../components/RoomListComponent.tsx";
import {
  changeRoom, leaveRoom,
  offJoinRoom,
  offMessage,
  onMessage,
  sendMessage
} from "../services/WebsocketService.ts";

interface IMessage {
  content: string;
  author: string;
}

const author = 'Bob';

export function PageMessage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [roomId, setRoomId] = useState<number>(1);

  const handleMessage = (message: any) => {
   setMessages([...messages, message]);
  }
  const handleJoinRoom = (room: any) => {
    console.log(room.roomId);
    setRoomId(room.roomId);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(inputValue !== '') {
      console.log('SEND TO ' + roomId);
      const message ={author, content: inputValue};
      sendMessage({roomId, message});
      setInputValue('');
    }
  }
  useEffect(() => {
    onMessage(handleMessage);
    return () => {
      offMessage(handleMessage);
    }
  });

  const handleChangeRoom = (id: number) => setRoomId(id);

  useEffect(() => {
    leaveRoom(roomId);
    changeRoom(roomId);
    // TODO load old messages
    return () => {
      offJoinRoom(handleJoinRoom);
      setMessages([]);
    }
  }, [roomId]);
  return (
    <>
      <RoomListComponent
        selectedRoom={handleChangeRoom}
        roomId={roomId}
      />
      <div className='pageMessageContainer'>
        <div className='display-message'>
          {
            messages.map((message, index) => (
              <div key={index}>{message.author} : {message.content}</div>
            ))
          }
        </div>
        <div className="display-form">
          <form onSubmit={handleSubmit}>
            <input type="text"
                   onChange={(e) => setInputValue(e.target.value)}
                   value={inputValue}
            />
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>

    </>
  );
}