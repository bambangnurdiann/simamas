import { NextResponse } from "next/server";
export async function POST() { const res = NextResponse.json({ message: "logout" }); res.cookies.delete("token"); return res; }
