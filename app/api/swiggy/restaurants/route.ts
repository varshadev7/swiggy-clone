
import { NextResponse } from "next/server";

const SWIGGY_URL =
  "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=17.3843&lng=78.4583&carousel=true&third_party_vendor=1";

export async function GET() {
  const res = await fetch(SWIGGY_URL, { cache: "no-store" });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch from Swiggy" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
