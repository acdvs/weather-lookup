import { NextRequest } from 'next/server';
import qs from 'query-string';

import states from '@/data/us_states.json';

const BASE_URL = 'http://api.openweathermap.org';

export async function POST(req: NextRequest) {
  const { lat, lon } = await req.json();

  let city: string | undefined;
  let state: string | undefined;
  let country: string | undefined;

  // Lat/lon to location names
  // https://openweathermap.org/api/geocoding-api#reverse
  const query = qs.stringify({
    appid: process.env.OPEN_WEATHER_API_KEY,
    lat,
    lon,
  });
  const res = await fetch(`${BASE_URL}/geo/1.0/reverse?${query}`);

  if (res.ok) {
    const data = await res.json();

    city = data[0]?.name;
    country = data[0]?.country;
    state = data[0]?.state;

    if (state) {
      Object.entries(states).forEach(([k, v]) => {
        if (v === state) {
          state = k;
        }
      });
    }
  }

  return Response.json({
    city,
    state,
    country,
  });
}
