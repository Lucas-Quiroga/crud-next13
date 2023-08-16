"use client";
import React from "react";
import { useSession } from "next-auth/react";
import RegisterPage from "../app/register/page";

const Home = () => {
  const { status } = useSession();

  return <>{status === "unauthenticated" && <RegisterPage />}</>;
};

export default Home;
