import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/mongoose";

export async function POST(request) {
  const { email, password, fullname } = await request.json();

  //Verificación simple si la contraseña no existe o si es menor a 6 digitos
  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();
    //Verificación si el correo está registrado o no
    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }

    //encriptación de la constraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      fullname,
    });

    const savedUser = await user.save();

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
