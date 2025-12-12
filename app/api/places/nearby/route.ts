import { NextResponse } from "next/server";

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY!;

type GeoapifyFeature = {
  properties: {
    place_id: string;
    name: string;
    lat: number;
    lon: number;
    city?: string;
    suburb?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    rating?: number;
  };
};

export async function GET(req: Request) {
  const urlObj = new URL(req.url);
  const lat = urlObj.searchParams.get("lat");
  const lng = urlObj.searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { message: "lat and lng are required" },
      { status: 400 }
    );
  }

  const apiUrl = new URL("https://api.geoapify.com/v2/places");
  apiUrl.searchParams.set("categories", "catering.restaurant");
  apiUrl.searchParams.set("filter", `circle:${lng},${lat},2500`);
  apiUrl.searchParams.set("limit", "20");
  apiUrl.searchParams.set("apiKey", GEOAPIFY_KEY);

  const res = await fetch(apiUrl.toString());
  const raw = await res.json();

  const restaurants = (raw.features as GeoapifyFeature[]).map((f) => {
    const p = f.properties;
    const area = p.suburb || p.city || "Unknown area";
    return {
      id: p.place_id,
      name: p.name || "Unnamed Restaurant",
      cuisines: [], // Geoapify doesn’t give cuisines directly
      rating: p.rating ?? 4.0,
      deliveryTime: 30,
      area,
      imageUrl: "",
      isTopRestaurant: true,
    };
  });

  return NextResponse.json(restaurants);
}
