"use client";
import React, { useEffect } from "react";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Page = ({ params }) => {
  const { tasks, createTask, updateTask } = useTasks();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success("task updated successfully");
    } else {
      createTask(data.title, data.description);
      toast.success("task created successfully");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full ">
      <form
        onSubmit={onSubmit}
        className="bg-gray-700 p-10 card"
        style={{
          borderRadius: "50px",
          background: "#e1e0e0",
          boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            {params.id ? "EDIT TASK" : "NEW TASK"}
          </h2>
        </div>
        <label className="block text-sm font-medium leading-6 text-black">
          Title
        </label>
        <input
          className="py-3 px-4 mb-2 focus:ouline-none block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a title"
          {...register("title", { required: true })}
        />

        {errors.title && (
          <span className="block text-red-400 mb-2">
            this field is required
          </span>
        )}
        <label className="block text-sm font-medium leading-6 text-black">
          Description
        </label>
        <textarea
          className="py-3 px-4 mb-2 focus:ouline-none block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Write a description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            this field is required
          </span>
        )}
        <button
          className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Page;
