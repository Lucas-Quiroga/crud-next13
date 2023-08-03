"use client";

import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("UseTasks must used within a provider");

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  function createTask(title, description) {
    setTasks([
      ...tasks,
      {
        title,
        description,
        id: uuid(),
      },
    ]);
  }

  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);

  const updateTask = (id, newData) =>
    setTasks([
      ...tasks.map((task) => (task.id == id ? { ...task, ...newData } : task)),
    ]);

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
