"use client";

import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("UseTasks must used within a provider");

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "My first tasks",
      description: "some tasks",
    },
    {
      id: 2,
      title: "My second tasks",
      description: "some tasks",
    },
    {
      id: 3,
      title: "My third tasks",
      description: "some tasks",
    },
  ]);

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

  return (
    <TaskContext.Provider value={{ tasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
