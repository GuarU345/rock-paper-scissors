import { FormEvent, useEffect, useRef, useState } from "react";
import { createRoom, getDisponibleRooms } from "../services/game";
import { Room } from "../types";
import Modal from "../components/Modal";
import RoomLink from "../components/RoomLink";
import { Link } from "react-router-dom";
import { socket } from "../socket/socket";
import useAuthStore from "../contexts/AuthContext";
import { toast } from "sonner";

const Room = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const name = useRef<HTMLInputElement>(null);
  const { getToken } = useAuthStore();
  const token = getToken();

  const getRooms = async () => {
    const resp = await getDisponibleRooms();
    setRooms(resp as Room[]);
  };

  const createNewRoom = async () => {
    const body = name.current?.value;
    if (body === undefined) return;
    try {
      await createRoom(body || "");
      socket.emit("newRoomCreated");
      name.current!.value = "";
      socket.on("roomDataUpdated", async () => {
        console.log("si llego aqui we");
        await getRooms();
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    createNewRoom();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getRooms();

    socket.on("roomDataUpdated", async () => {
      await getRooms();
    });
  }, []);

  useEffect(() => {
    if (token) {
      socket.connect();
    }
  });

  return (
    <>
      <h1 className="text-white text-4xl text-center h-1/6">Rooms</h1>
      <div className="flex justify-center mt-auto">
        <button onClick={() => setIsOpen(true)} className="nes-btn text-sm">
          Create a new room
        </button>
      </div>
      <section className="flex flex-col p-4 gap-2 h-5/6">
        <ul className="flex flex-col gap-2 rounded-md text-white">
          {rooms.map((room) => (
            <RoomLink
              key={room.id}
              room={room}
              updateRooms={getRooms}
            ></RoomLink>
          ))}
        </ul>
        <div className="grid place-content-center">
          <Link
            className="nes-btn text-white text-center border-2 p-2 hover:border-red-600"
            to="/home"
          >
            Back to home
          </Link>
        </div>
      </section>
      {isOpen ? (
        <Modal handleClose={closeModal}>
          <form className="flex flex-col gap-2 p-2">
            <div className="flex justify-end text-red-600" onClick={closeModal}>
              X
            </div>
            <h1 className="text-white text-center">Create new room</h1>
            <input
              placeholder="name of room"
              type="text"
              className="w-full p-2"
              ref={name}
            />
            <button onClick={handleClick} className="nes-btn text-white p-2">
              Add
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default Room;
