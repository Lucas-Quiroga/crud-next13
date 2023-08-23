import { TaskCard } from "../components/TaskCard";
import Home from "../components/Home";

const loadTasksBD = async () => {
  try {
    const res = await fetch("https://crud-next13.vercel.app/api/tasks", {
      method: "GET",
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
  const tasks = await loadTasksBD();

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
