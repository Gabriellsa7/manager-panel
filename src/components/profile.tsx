"use client";

import ProfileAvatar from "@/src/components/profile-avatar";
import { useAuth } from "@/src/context/auth-context";

type UploadResponse = {
  url: string;
};

export default function Profile() {
  const { user, updateUser } = useAuth();

  const handleUploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data: UploadResponse = await response.json();
    updateUser({ image_url: data.url });
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center text-center gap-3 mt-2">
      <ProfileAvatar
        image_url={user.image_url ?? null}
        name={user.name}
        onUpload={handleUploadAvatar}
      />

      <h2 className="text-sm font-semibold text-white">{user.name}</h2>

      <span className="text-xs text-zinc-400">Admin</span>
    </div>
  );
}
