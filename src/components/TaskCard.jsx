"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import { useTasks } from "@/context/TaskContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "../styles/TaskCards.css";
import { useSession } from "next-auth/react";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  // const { deleteTask } = useTasks();
  const { data: session } = useSession();
  // console.log(session);
  // console.log("soy task:", task.createdBy);
  // console.log("soy session:", session?.user._id);

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

  // if (session.user.) {

  // }

  // console.log(session.user._id);
  // console.log(task.createdBy);

  // if (!session) {
  //   return;
  // }
  // if (session.user._id === task.createdBy) {
  //   console.log("hay tareas del usuario");
  // } else {
  //   console.log("no hay tareas del usuario existe");
  // }

  const isUserTask = session?.user._id === task.createdBy;
  // Verificar si al menos una tarea pertenece al usuario actual
  // const hasUserTasks = task.some(
  //   (tasks) => tasks.createdBy._id === session?.user._id
  // );

  // if (session?.user._id === task.createdBy && null) {
  //   return (
  //     <section className="h-[calc(100vh-7rem)] flex items-center justify-center ">
  //       <h1 className="text-black 7xl font-bold block">
  //         No hay tareas del usuario creadas en la base de datos{" "}
  //       </h1>
  //     </section>
  //   );
  // }

  return (
    <>
      {isUserTask && (
        <div className="flex justify-center md:flex-row cursor-pointer p-5 m-5 card">
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
        </div>
      )}
    </>
  );
};
