import React from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { toast } from "react-hot-toast";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();

  return (
    <div>
      <div
        className="bg-gray-800 hover:bg-slate-600 cursor-pointer px-20 py-5 m-2 flex"
        onClick={() => router.push(`/edit/${task.id}`)}
      >
        <div className="flex justify-between">
          <h1>{task.title}</h1>
          <button
            onClick={(e) => {
              // stopPropagation avisa que termian ahi el evento
              e.stopPropagation();
              const confirm = window.confirm("are you sure?");
              if (confirm) {
                deleteTask(task.id);
                toast.success("task deleted successfully");
              }
            }}
          >
            delete
          </button>
        </div>
        <p className="text-gray-300">{task.description}</p>
        <span className="text-gray-400 text-xs">{task.id}</span>
      </div>
    </div>
  );
};
