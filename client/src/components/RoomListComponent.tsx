import {useEffect, useState} from "react";
import './RoomListComponent.css';
import {getRooms} from "../services/RoomService.ts";

interface IRoom {
  id: number;
  name: string;
}

interface IPropsRoom {
  selectedRoom: (id: number) => void;
  roomId: number | undefined;
}

export function RoomListComponent({selectedRoom, roomId}: IPropsRoom) {
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  useEffect(() => {
    setRoomList(getRooms)
  }, []);

  return (
    <div className='roomContent'>
      {
        roomList.map((room, index) => (
          <div key={index} onClick={() => selectedRoom(room.id)} className={roomId === room.id ? 'activeRoom' : ''}>{room.name}</div>
        ))
      }
    </div>
  )
}