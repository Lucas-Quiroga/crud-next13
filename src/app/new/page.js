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
        setValue("title", taskFound.description);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Write a title"
        {...register("title", { required: true })}
      />

      {errors.title && <span>this field is required</span>}
      <textarea
        placeholder="Write a description"
        {...register("description", { required: true })}
      />
      {errors.description && <span>this field is required</span>}
      <button type="submit">save</button>
    </form>
  );
};

export default Page;
