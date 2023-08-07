import React from "react";
// import { useRouter } from "next/navigation";
// import { useTasks } from "@/context/TaskContext";
import { toast } from "react-hot-toast";

export const TaskCard = ({ task }) => {
  // const router = useRouter();
  // const { deleteTask } = useTasks();

  return (
    <div
      className="flex md:flex-row cursor-pointer p-5 m-5"
      style={{
        borderRadius: "10px",
        background: "#e1e0e0",
        boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
      }}
    >
      <div className="flex flex-col justify-between items-center w-full md:w-auto">
        <h1 className="text-md text-black font-bold mb-1 md:mb-0 md:mr-4">
          {task.title}
        </h1>
        <hr className="w-full h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700" />
        <p className="text-black text-sm">{task.description}</p>
        <hr className="w-full h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700" />
        <div className="flex gap-2">
          {" "}
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            // onClick={() => router.push(`/edit/${task._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-700 rounded"
            // onClick={(e) => {
            //   e.stopPropagation();

            //   deleteTask(task._id);
            //   toast.success("Task deleted successfully");
            // }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
