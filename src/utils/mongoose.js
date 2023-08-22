/**
 * CONEXIÓN CON LA BASA DE DATOS
 */
import { connect, connection } from "mongoose";

//connect
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

const conn = {
  isConnected: false,
};
//CHANGE
export async function connectDB() {
  if (conn.isConnected) return;
  const db = await connect("mongodb://127.0.0.1:27017/nextmongocrud");
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Conectado a mongoose"));

connection.on("error", (error) => console.log("mongoose error", error));
