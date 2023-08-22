/**
 * CONEXIÓN CON LA BASA DE DATOS
 */
import { connect, connection } from "mongoose";

// const { MONGODB_URI_DEPLOY } = process.env;

const URI = "mongodb://127.0.0.1:27017/nextmongocrud";
if (!URI) {
  throw new Error("MONGODB_URI_DEPLOY must be defined");
}

const conn = {
  isConnected: false,
};
//CHANGE
export async function connectDB() {
  if (conn.isConnected) return;
  const db = await connect(URI);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Conectado a mongoose"));

connection.on("error", (error) => console.log("mongoose error", error));
