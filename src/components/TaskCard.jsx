import React from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();

  return (
    <div>
      <div
        style={{ background: "#202020", color: "white" }}
        onClick={() => router.push(`/edit/${task.id}`)}
      >
        <h1>{task.title}</h1>
        <button
          onClick={(e) => {
            // stopPropagation avisa que termian ahi el evento
            e.stopPropagation();
            const confirm = window.confirm("are you sure?");
            if (confirm) {
              deleteTask(task.id);
            }
          }}
        >
          delete
        </button>
        <p>{task.description}</p>
      </div>
      <br />
    </div>
  );
};
