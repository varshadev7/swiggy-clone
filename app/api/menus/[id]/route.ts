import { NextResponse } from "next/server";
import { menus } from "@/lib/data/menus";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  await params; 

  const menu = menus[0]; 

  return NextResponse.json(menu);
}
