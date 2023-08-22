import { TaskCard } from "../components/TaskCard";
import { GET as loadTasksBD } from "../app/api/tasks/route";
import Task from "../models/Task";
import Home from "../components/Home";

// async function loadTasksBD() {
//   connectDB();
//   const tasks = await Task.find();
//   return tasks.map((task) => JSON.parse(JSON.stringify(task)));
// }

async function Page() {
  const tasksResponse = await loadTasksBD(); // Llama a la función GET
  const tasks = await tasksResponse.json(); // Convierte la respuesta a formato JSON

  return (
    <div
      className="flex justify-center items-center"
      style={{
        flexWrap: "wrap",
      }}
    >
      <Home />
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
export default Page;
