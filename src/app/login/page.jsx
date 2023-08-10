"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error);

    if (res?.ok) return router.push("/dashboard/profile");

    console.log(res);
  }

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="bg-black">Signin</h1>
        <input
          type="email"
          name="email"
          placeholder="Write you email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Write you password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
