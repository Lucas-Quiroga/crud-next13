"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
// import { useTasks } from "@/context/TaskContext";
import Image from "next/image";
import todoIcon from "../../public/todoIcon.jpg";
import { useSession } from "next-auth/react";

export const NavBar = () => {
  const router = useRouter();
  const params = useParams();

  const { data: session } = useSession();

  // console.log(status);
  // const { tasks } = useTasks();

  return (
    <header className="flex justify-between items-center bg-gray-800 px-28 py-3">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <Image
              src={todoIcon}
              style={{ borderRadius: 100 }}
              width={30}
              height={30}
              alt="TodoIcon"
            />
          </Link>
          <ul className="flex justify-between gap-x-2 text-white">
            {session ? (
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
            ) : (
              <>
                <li className="px-3 py-1">
                  <Link href="/about">About</Link>
                </li>
                <li className="px-3 py-1">
                  <Link href="/login">Login</Link>
                </li>
                <li className="px-3 py-1">
                  <Link href="/register">Registro</Link>
                </li>
              </>
            )}
          </ul>
          {session && (
            <div className="flex md:order-2">
              <button
                type="button"
                onClick={() => router.push("tasks/new")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ display: `${!params.id ? "" : "none"}` }}
              >
                Add tasks
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
