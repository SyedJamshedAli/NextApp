import { NextResponse } from "next/server";
import { json } from "stream/consumers";

const Data_Source = "https://jsonplaceholder.typicode.com/todos";
const apiKey: string = process.env.DATA_API_KEY as string;
type Props={
    params:{
        id:string
    }
}

export async function GET(r: Request,{params:{id}}:Props) {
  //const id = r.url.slice(r.url.lastIndexOf("/") + 1);

  const res = await fetch(`${Data_Source}/${id}`);
  const Todo: todo = await res.json();
  
  if (!Todo.id) return NextResponse.json({ "message": "Todo ID not found" });

  return NextResponse.json(Todo);
}
