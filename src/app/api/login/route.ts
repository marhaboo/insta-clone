import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();


    console.log("Login attempt for user:", username);


    const { data } = await axios.post("https://instagram-api.softclub.tj/Account/Login", { username, password });
    const token = data.data;

    const response = NextResponse.json({ message: "Login successful", token });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
