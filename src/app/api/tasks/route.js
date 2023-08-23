import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/mongoose";
import Task from "../../../models/Task";

export async function GET() {
  connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(req) {
  try {
    //recibir información del cliente
    const data = await req.json();
    //crear tarea
    const newTask = new Task(data);
    //guardarla en base de datos
    const saveTask = await newTask.save();

    return NextResponse.json(saveTask);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
