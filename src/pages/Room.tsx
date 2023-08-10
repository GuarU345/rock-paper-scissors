import { FormEvent, useEffect, useRef, useState } from "react";
import { createRoom, getDisponibleRooms } from "../services/game";
import { Room } from "../types";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

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
      console.error(error.message);
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
        <ul className="flex flex-col gap-2 h-5/6 overflow-y-auto sm:items-center md:items-center xl:items-center xl:text-lg">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to="/game"
              className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
            >
              {room.name}
            </Link>
          ))}
        </ul>
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