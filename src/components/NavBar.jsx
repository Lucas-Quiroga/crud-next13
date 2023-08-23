"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import todoIcon from "../../public/todoIcon.jpg";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export const NavBar = () => {
  const params = useParams();

  const { data: session } = useSession();

  return (
    <header
      className={`flex justify-between items-center bg-gray-800 px-28 py-3`}
    >
      <nav className="bg-gray-700 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center"
            style={{ gap: "0.5rem" }}
          >
            <Image
              src={todoIcon}
              style={{ borderRadius: 100 }}
              width={30}
              height={30}
              alt="TodoIcon"
            />
            <span className="text-white">Home</span>
          </Link>
          <ul className="flex justify-between gap-x-2 text-white">
            {session ? (
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Profile
                  </motion.button>
                </Link>
              </li>
            ) : (
              <>
                <li className="px-3 py-1">
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                </li>
                <li className="px-3 py-1">
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                </li>
              </>
            )}
          </ul>
          {session && (
            <div className="flex md:order-2">
              <Link
                href={"/tasks/new"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ display: `${!params.id ? "" : "none"}` }}
              >
                {" "}
                Add tasks
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
