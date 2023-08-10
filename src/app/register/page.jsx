"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });

      console.log(signupResponse);

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard");

      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="bg-black">SignUp</h1>
        <input
          type="text"
          name="fullname"
          placeholder="Write you fullname"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Write you email"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Write you password"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
