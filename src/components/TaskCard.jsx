"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "../styles/TaskCards.css";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { connectDB } from "../utils/mongoose";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { data: session } = useSession();

  function handleDeleteDB(id) {
    try {
      fetch(`https://nextjs-context-crud-kohl.vercel.app/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  const isUserTask = session?.user._id === task.createdBy;

  // useEffect(() => {
  //   connectDB();
  // }, [task]);

  return (
    <>
      {isUserTask && (
        <motion.div
          className="flex justify-center md:flex-row cursor-pointer p-5 m-5 card "
          initial={{ y: 150, opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="flex flex-col justify-between items-center w-full md:w-auto">
            <h1 className="title">📌 {task.title}</h1>

            <p className="description">{task.description}</p>
            <p className="description">
              <span>Create at:</span>
              {session.user.fullname}
            </p>
            <div className="flex gap-2 justify-between">
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={() => {
                  router.push(`/tasks/${task._id}`);
                }}
              >
                Edit
              </button>

              <button
                className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-700 rounded"
                onClick={(e) => {
                  e.stopPropagation();

                  handleDeleteDB(task._id);
                  toast.success("Task deleted successfully");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
