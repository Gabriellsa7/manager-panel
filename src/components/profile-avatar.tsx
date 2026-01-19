"use client";

import Image from "next/image";
import { useRef } from "react";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useAuth } from "../context/auth-context";

type ProfileAvatarProps = {
  image_url?: string | null;
  name: string;
  onUpload?: (file: File) => void;
};

export default function ProfileAvatar({
  image_url,
  name,
  onUpload,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() ?? "";
    const second = parts[1]?.charAt(0).toUpperCase() ?? "";
    return first + second;
  };

  const initials = getInitials(name);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const isValidUrl =
    typeof image_url === "string" &&
    image_url.length > 0 &&
    image_url.startsWith("http");

  const { logout } = useAuth();

  return (
    <div className="relative flex flex-col items-center text-center gap-2 mt-4">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
        {isValidUrl ? (
          <Image
            src={image_url}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#1C84FF] flex items-center justify-center">
            <span className="text-white font-bold text-4xl tracking-widest">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 z-10">
        <button
          type="button"
          className="bg-sky-500 text-white p-1 rounded-full cursor-pointer"
          onClick={handleClickUpload}
        >
          <MdOutlineEdit size={14} />
        </button>
      </div>

      <div className="absolute top-0 left-0 z-10">
        <button
          type="button"
          className="bg-red-50 text-white p-0.5 rounded-full cursor-pointer"
          onClick={logout}
        >
          <IoLogOut size={20} color="red" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
