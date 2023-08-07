"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  function handleChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  async function createTask() {
    const res = fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-type": "application/json",
      },
    });

    router.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createTask();
  }

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
        <label className="block text-sm font-medium leading-6 text-black">
          Title
        </label>
        <input
          className="py-3 px-4 mb-2 block focus:outline-none w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a title"
          name="title"
          onChange={handleChange}
        />
        <label className="block text-sm font-medium leading-6 text-black">
          Description
        </label>
        <textarea
          className="py-3 px-4 mb-2 block focus:outline-none w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a description"
          name="description"
          onChange={handleChange}
        />
        <button className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default page;
