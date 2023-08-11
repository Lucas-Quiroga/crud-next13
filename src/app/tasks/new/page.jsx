"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

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
      const res = await fetch(`/api/tasks/${params.id}`);
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
      const res = fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...newTask,
          createdBy: { ...session?.user },
        }), // Enviar el ID del usuario
        headers: {
          "Content-type": "application/json",
        },
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTaskDB() {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
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
      updateTaskDB();
    }
  }

  useEffect(() => {
    if (params.id) {
      getTaskDB();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-gray-700 p-10 card"
        style={{
          borderRadius: "50px",
          background: "#e1e0e0",
          boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
          {params.id ? "EDIT TASK" : "NEW TASK"}
        </h2>
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
    </div>
  );
};

export default Page;
