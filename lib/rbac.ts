import { NextResponse } from "next/server";
import { getSession } from "./auth";

export async function requireRole(roles: string[]) {
  const session = await getSession();
  if (!session || !roles.includes(session.role)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }
  return null;
}
