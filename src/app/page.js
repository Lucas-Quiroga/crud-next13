import { TaskCard } from "../components/TaskCard";
// import { GET as loadTasksBD } from "../app/api/tasks/route";
// import Task from "../models/Task";
import Home from "../components/Home";

// async function loadTasksBD() {
//   connectDB();
//   const tasks = await Task.find();
//   return tasks.map((task) => JSON.parse(JSON.stringify(task)));
// }

const loadTasksBD = async () => {
  try {
    const res = await fetch("/api/tasks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading tasks: ", error);
  }
};

async function Page() {
  const { tasks } = await loadTasksBD();

  // const tasksResponse = await loadTasksBD(); // Llama a la función GET
  // const tasks = await tasksResponse.json(); // Convierte la respuesta a formato JSON

  // console.log("soy la tarea", tasks);
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
