import { NextResponse } from "next/server";

export function GET(req, { params }) {
  console.log(params);
  return NextResponse.json({
    message: `obteniendo tarea...${params.id}`,
  });
}

export function DELETE(req, { params }) {
  console.log(params);
  return NextResponse.json({
    message: `eliminando tarea...${params.id}`,
  });
}

export function PUT(req, { params }) {
  console.log(params);
  return NextResponse.json({
    message: `actualizando tarea...${params.id}`,
  });
}
