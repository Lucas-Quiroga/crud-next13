"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import { useTasks } from "@/context/TaskContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "../styles/TaskCards.css";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  // const { deleteTask } = useTasks();

  function handleDeleteDB(id) {
    try {
      fetch(`api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center md:flex-row cursor-pointer p-5 m-5 card">
      <div className="flex flex-col justify-between items-center w-full md:w-auto">
        <h1 className="title">📌 {task.title}</h1>

        <p className="description">{task.description}</p>
        <p className="description">
          <span>Create at:</span>
          {/* {new Date(task.createdAt).toLocaleDateString()} */}
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
    </div>
  );
};
