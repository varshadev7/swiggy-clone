import { NextResponse } from "next/server";

const BASE_URL =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.38430&lng=78.45830&restaurantId=408177&submitAction=ENTER";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const url = BASE_URL + encodeURIComponent(id);

  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch restaurant details" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
