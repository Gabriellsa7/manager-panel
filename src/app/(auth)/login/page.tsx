"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/auth-context";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer login";
      setError(errorMessage);
    } finally {
      setLoading(false);
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

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

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
          <div className="flex justify-end">
            <span className="text-white text-sm">Forgot your password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#8162FF] py-2 text-white disabled:opacity-60"
          >
            {loading ? "Entering..." : "Enter"}
          </button>
          <div className="flex justify-center">
            <span className="text-white text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => router.replace("/signup")}
                className="text-[#8162FF] underline cursor-pointer"
              >
                Sign up
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
