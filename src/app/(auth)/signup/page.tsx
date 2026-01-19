"use client";
import { useCreateUser } from "@/src/api/post-create-user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutateAsync, isPending } = useCreateUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync({
        name,
        email,
        password,
      });

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center 
  bg-linear-to-b from-zinc-950 via-black to-purple-900"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl 
  bg-black/60 backdrop-blur 
  p-6 shadow-xl border border-white/10"
      >
        <h1 className="mb-6 text-center text-xl font-semibold text-white">
          Login
        </h1>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-white">Name</label>
          <input
            type="name"
            placeholder="Enter Your Name"
            className="w-full rounded border-none bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-white">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full rounded border-none bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm text-white">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full rounded border-none bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-[#8162FF] py-2 text-white disabled:opacity-60"
          >
            {isPending ? "Creating..." : "Signup"}
          </button>
          <div className="flex justify-center">
            <span className="text-white text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.replace("/login")}
                className="text-[#8162FF] underline cursor-pointer"
              >
                Signin
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
