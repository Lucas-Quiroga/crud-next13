"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const NavBar = () => {
  const router = useRouter();

  return (
    <header>
      <Link href="/">
        <h1>Task APP</h1>
      </Link>
      <div>
        <button onClick={() => router.push("/new")}>Add tasks</button>
      </div>
    </header>
  );
};
