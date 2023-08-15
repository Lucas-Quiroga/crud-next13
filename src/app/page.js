import { TaskCard } from "../components/TaskCard";
import { connectDB } from "../utils/mongoose";
import Task from "../models/Task";

async function loadTasksBD() {
  connectDB();
  const tasks = await Task.find();
  return tasks.map((task) => JSON.parse(JSON.stringify(task)));
}

async function Page() {
  const tasks = await loadTasksBD();

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
