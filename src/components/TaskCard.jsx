import React from "react";
import { useRouter } from "next/navigation";

export const TaskCard = ({ task }) => {
  const router = useRouter();

  return (
    <div>
      <div
        style={{ background: "#202020", color: "white" }}
        onClick={() => router.push(`/edit/${task.id}`)}
      >
        <h1>{task.title}</h1>
        <button>delete</button>
        <p>{task.description}</p>
      </div>
      <br />
    </div>
  );
};
