"use client";
import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "../components/TaskCard";

function Page() {
  const { tasks } = useTasks();

  return (
    <div
      className="flex justify-center items-center"
      style={{ flexWrap: "wrap" }}
    >
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
export default Page;
