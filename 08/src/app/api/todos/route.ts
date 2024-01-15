import { NextResponse } from "next/server";
import { json } from "stream/consumers";

const Data_Source = "https://jsonplaceholder.typicode.com/todos";
const apiKey: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(Data_Source);
  const todo: todo[] = await res.json();
  return NextResponse.json(todo);
}

export async function DELETE(r: Request) {
  const { id }: Partial<todo> = await r.json();
  if (!id) return NextResponse.json({ message: "todo Id Required" });
  await fetch(`${Data_Source}/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "API-Key": apiKey,
    },
  });
  return NextResponse.json({ message: `Todo ${id} Deleted` });
}
export async function POST(r: Request) {
  const { userId, title }: Partial<todo> = await r.json();
  if (!userId || !title)  
  {  return NextResponse.json({ message: "Missing Required Data!!!" });}
  const res = await fetch(Data_Source, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "API-Key": apiKey,
    },
    body: JSON.stringify({ userId, title, status:false }),
  });
  const newTodo: todo = await res.json();
  return NextResponse.json(newTodo);
}
export async function PUT(r: Request) {
  const { id,userId, title,status }:todo = await r.json();
  if (!id || !userId || !title || typeof(status)!='boolean')  
  {  return NextResponse.json({ message: "Missing Required Data!!!" });}
  const res = await fetch(`${Data_Source}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "API-Key": apiKey,
    },
    body: JSON.stringify({ userId, title, status }),
  });
  const updatedTodo: todo = await res.json();
  return NextResponse.json(updatedTodo);
}
