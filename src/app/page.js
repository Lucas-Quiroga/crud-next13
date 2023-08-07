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

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
export default Page;
