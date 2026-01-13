"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

type ProfileAvatarProps = {
  uri?: string | null;
  name: string;
  onUpload?: (file: File) => void;
};

export default function ProfileAvatar({
  uri,
  name,
  onUpload,
}: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() ?? "";
    const second = parts[1]?.charAt(0).toUpperCase() ?? "";
    return first + second;
  };

  const initials = getInitials(name);
  const showImage = !!uri && !imageError;

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="relative flex flex-col items-center text-center gap-2 mt-4">
      <div className=" w-20 h-20 rounded-full overflow-hidden border-2 border-white">
        {showImage ? (
          <Image
            src={uri!}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
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
      <div className="absolute top-1 right-0 z-10">
        <button
          className="bg-sky-500 text-white p-1 rounded-full"
          onClick={handleClickUpload}
        >
          <MdOutlineEdit size={14} />
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
