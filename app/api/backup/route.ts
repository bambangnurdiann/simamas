import { NextResponse } from "next/server";
export async function POST(){ return NextResponse.json({message:"Backup manual gunakan pg_dump di server"}); }
