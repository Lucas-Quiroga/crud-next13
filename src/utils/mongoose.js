import mongoose, { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

// Función para establecer la conexión
async function connectDB() {
  if (conn.isConnected) return;

  try {
    // Conexión a la base de datos
    const uri = `mongodb://localhost/${process.env.DB_NAME}`;
    const db = await mongoose.connect(uri, { useNewUrlParser: true });

    // console.log(`Connected to database: ${db.connection.db.databaseName}`);
    conn.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Evento de conexión establecida
connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// Evento de error de conexión
connection.on("error", (err) => {
  console.log("Mongoose connection error", err);
});

export default connectDB;
