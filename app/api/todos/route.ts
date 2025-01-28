// import dbConnect from "@/lib/connectToDb";
// import { NextRequest } from "next/server";

// import { NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   await dbConnect();

//   const searchParams = request.nextUrl.searchParams;
//   const id = searchParams.get("id");

//   const todos = await Todo.find({ userId: id });

//   return NextResponse.json({
//     message: "Hello World",
//   });

//   // return NextResponse.json(todos);
// }
