"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const Page = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();

  async function getTaskDB() {
    try {
      const res = await fetch(
        `https://crud-next13.vercel.app/api/tasks/${params.id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const data = await res.json();
      setNewTask({
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  async function createTask() {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...newTask,
          createdBy: { ...session?.user },
        }), // Enviar el ID del usuario
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTaskDB() {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      await updateTaskDB();
    }
  }

  useEffect(() => {
    if (params.id) {
      getTaskDB();
    }
  }, []);

  return (
    <motion.div
      className="flex flex-col bg-white w-72 h-67 rounded-md py-4 px-6 border"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ y: 150, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center font-bold text-xl text-gray-800 pb-2">
          {params.id ? "EDIT TASK" : "NEW TASK"}
        </h3>{" "}
        <label className="block text-sm font-medium leading-6 text-black">
          Title
        </label>
        <input
          className="py-3 px-4 mb-2 block focus:outline-none w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a title"
          name="title"
          onChange={handleChange}
          value={newTask.title}
        />
        <label className="block text-sm font-medium leading-6 text-black">
          Description
        </label>
        <textarea
          className="py-3 px-4 mb-2 block focus:outline-none w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a description"
          name="description"
          onChange={handleChange}
          value={newTask.description}
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            params.id
              ? toast.success("Task update successfully")
              : toast.success("Task create successfully");
          }}
        >
          {params.id ? "Update" : "Create"}
        </button>
      </form>
    </motion.div>
  );
};

export default Page;
