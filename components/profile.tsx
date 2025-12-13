import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import boruto from "../public/assets/boruto.jpeg";

export default function Profile() {
  return (
    <div className="flex flex-col items-center text-center gap-2 mt-4">
      <div className="relative">
        <Image
          src={boruto}
          width={80}
          alt="Boruto Image"
          className="rounded-full"
        />
        <div className="absolute -bottom-1 left-4 flex gap-1">
          <button className="bg-blue-600 text-white p-1 rounded-full">
            <FiSettings size={14} />
          </button>
        </div>
        <div className="absolute -bottom-1 right-4 flex gap-1">
          <button className="bg-sky-500 text-white p-1 rounded-full">
            <MdOutlineEdit size={14} />
          </button>
        </div>
      </div>
      <h2 className="text-sm font-semibold">Outsutsuki Boruto</h2>
      <span className="text-xs text-white">Admin</span>
    </div>
  );
}
