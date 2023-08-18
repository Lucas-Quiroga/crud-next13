/**
 * CONEXIÓN CON LA BASA DE DATOS
 */
import { connect, connection } from "mongoose";

//connect
// const { MONGODB_URI_DEPLOY } = process.env;
if (!process.env.MONGODB_URI_DEPLOY) {
  throw new Error("MONGODB_URI_DEPLOY must be defined");
}

const conn = {
  isConnected: false,
};
//CHANGE
export async function connectDB() {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGODB_URI_DEPLOY);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Conectado a mongoose"));

connection.on("error", (error) => console.log("mongoose error", error));
