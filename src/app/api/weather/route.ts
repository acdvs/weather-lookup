import { NextRequest } from 'next/server';
import qs from 'query-string';

import { LocationData } from '@/store';

const BASE_URL = 'http://api.openweathermap.org';

export type WeatherData = {
  temp?: number;
  feelsLike?: number;
  rain?: {
    id: number;
    description: string;
    lastHour?: number;
  };
  aqi?: number;
  error?: string;
};

export async function POST(req: NextRequest) {
  const { city, country, state, zipCode }: LocationData = await req.json();

  if (!city && !country && !state && !zipCode) {
    return Response.json({ error: 'Choose a location' });
  }

  let lat: number | null = null;
  let lon: number | null = null;
  let weather: WeatherData = {};

  if (country) {
    if (zipCode) {
      // Zipcode to lat/lon
      // https://openweathermap.org/api/geocoding-api#direct_name
      const query = qs.stringify({
        appid: process.env.OPEN_WEATHER_API_KEY,
        zip: `${zipCode},${country}`,
      });
      const res = await fetch(`${BASE_URL}/geo/1.0/zip?${query}`);

      if (res.ok) {
        const data = await res.json();
        lat = data.lat;
        lon = data.lon;
      }
    } else if (city && (country !== 'US' || state)) {
      // City, state, country to lat/lon
      // https://openweathermap.org/api/geocoding-api#direct_name
      const query = qs.stringify({
        appid: process.env.OPEN_WEATHER_API_KEY,
        q:
          country === 'US'
            ? `${city},${state},${country}`
            : `${city},${country}`,
      });
      const res = await fetch(`${BASE_URL}/geo/1.0/direct?${query}`);

      if (res.ok) {
        const data = await res.json();
        lat = data[0]?.lat;
        lon = data[0]?.lon;
      }
    }
  }

  if (!lat || !lon) {
    return Response.json({ error: 'Unable to lookup your location' });
  }

  // Current weather
  // https://openweathermap.org/current
  const weatherQuery = qs.stringify({
    appid: process.env.OPEN_WEATHER_API_KEY,
    lat,
    lon,
    units: 'imperial',
  });
  const weatherReq = fetch(`${BASE_URL}/data/2.5/weather?${weatherQuery}`);

  // Current air pollution
  // https://openweathermap.org/api/air-pollution
  const pollutionQuery = qs.stringify({
    appid: process.env.OPEN_WEATHER_API_KEY,
    lat,
    lon,
  });
  const pollutionReq = fetch(
    `${BASE_URL}/data/2.5/air_pollution?${pollutionQuery}`,
  );

  const [weatherRes, pollutionRes] = await Promise.allSettled([
    weatherReq,
    pollutionReq,
  ]);

  if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
    const data = await weatherRes.value.json();

    // https://openweathermap.org/weather-conditions#drizzle
    weather.rain = {
      id: data.weather[0].id,
      description: data.weather[0].description,
      lastHour: data.rain?.['1h'],
    };

    weather.temp = data?.main.temp;
    weather.feelsLike = data?.main.feels_like;
  }

  if (pollutionRes.status === 'fulfilled' && pollutionRes.value.ok) {
    const data = await pollutionRes.value.json();

    weather.aqi = data.list[0]?.main.aqi;
  }

  return Response.json(weather);
}
