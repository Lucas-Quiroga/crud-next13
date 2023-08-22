"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import "../../styles/FormPage.css";

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

      if (res?.ok) return router.push("/dashboard/profile");

      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <motion.div className="form-box" animate={{ y: 150 }}>
      <form onSubmit={handleSubmit} className="form bg-gray-700">
        {error && (
          <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
            {error}
          </div>
        )}
        <span className="title">SignUp</span>
        <span className="subtitle">Create a free account with your email.</span>
        <div className="form-container">
          <input
            type="text"
            name="fullname"
            placeholder="Write you fullname"
            className="input"
          />

          <input
            type="email"
            name="email"
            placeholder="Write you email"
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Write you password"
            className="input"
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <div className="form-section bg-gray-700">
        <p>
          Have an account? <Link href="/login">Log in</Link>{" "}
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
