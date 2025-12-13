"use client";

import ProfileAvatar from "@/components/profile-avatar";
import { useAuth } from "@/context/auth-context";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const handleUploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    updateUser({ imageUrl: `http://localhost:3001${data.url}` });
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center text-center gap-3 mt-6">
      <ProfileAvatar
        uri={user.imageUrl ?? null}
        name={user.name}
        onUpload={handleUploadAvatar}
      />

      <h2 className="text-sm font-semibold text-white">{user.name}</h2>

      <span className="text-xs text-zinc-400">Admin</span>
    </div>
  );
}
