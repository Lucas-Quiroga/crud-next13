// "use client";
// import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "../components/TaskCard";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Task";

async function loadTasksBD() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

async function Page() {
  // const { tasks } = useTasks();
  const tasks = await loadTasksBD();

  if (tasks.length <= 0) {
    return (
      <section className="h-[calc(100vh-7rem)] flex items-center justify-center ">
        <h1 className="text-black 7xl font-bold block">Not tasks found </h1>
      </section>
    );
  }

  return (
    <div
      className="flex justify-center items-center"
      style={{
        flexWrap: "wrap",
      }}
    >
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
export default Page;
