import { FormEvent, useEffect, useRef, useState } from "react";
import { createRoom, getDisponibleRooms } from "../services/game";
import { Room } from "../types";
import Modal from "../components/Modal";
import RoomLink from "../components/RoomLink";
import { Link } from "react-router-dom";

const Room = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const name = useRef<HTMLInputElement>(null);

  const getRooms = async () => {
    const resp = await getDisponibleRooms();
    setRooms(resp);
  };

  const createNewRoom = async () => {
    const body = name.current?.value;
    if (body === undefined) return;
    try {
      await createRoom(body || "");
      name.current!.value = "";
      await getRooms();
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
  }, []);

  return (
    <>
      <h1 className="text-white text-4xl text-center h-1/6">Rooms</h1>
      <section className="flex flex-col p-4 gap-2 h-5/6">
        <ul className="flex flex-col gap-2 h-4/6 overflow-y-auto sm:items-center sm:h-3/6 md:items-center xl:items-center xl:text-lg">
          {rooms.map((room) => (
            <RoomLink key={room.id} room={room}></RoomLink>
          ))}
        </ul>
        <div className="grid place-content-center">
          <Link
            className="text-white text-center border-2 p-2 hover:border-red-600"
            to="/"
          >
            Back to home
          </Link>
        </div>
        <div className="flex justify-end mt-auto h-[10%]">
          <button
            onClick={() => setIsOpen(true)}
            className="border-2 text-white p-3 rounded-md hover:border-sky-400"
          >
            Create a new room
          </button>
        </div>
      </section>
      {isOpen ? (
        <Modal handleClose={closeModal}>
          <form className="flex flex-col gap-2 p-2">
            <h1 className="text-white text-center">Create new room</h1>
            <input
              placeholder="name of room"
              type="text"
              className="w-full p-2"
              ref={name}
            />
            <button
              onClick={handleClick}
              className="text-white p-2 border-2 rounded-md"
            >
              Add
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default Room;
