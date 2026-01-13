"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/auth-context";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow dark:bg-zinc-900"
      >
        <h1 className="mb-6 text-center text-xl font-semibold">Login</h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm">Senha</label>
          <input
            type="password"
            className="w-full rounded border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
