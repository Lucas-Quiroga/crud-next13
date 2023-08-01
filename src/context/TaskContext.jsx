"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("UseTasks must used within a provider");

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("tasks");
    const tasks = JSON.parse(item);
    if (tasks.length > 0) {
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
