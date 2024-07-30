'use client';

import dynamic from 'next/dynamic';

import useWeather from '@/utils/useWeather';
import { WeatherData } from '@/app/api/weather/route';
const Rain = dynamic(() => import('./weather-factors/Rain'));
const Temperature = dynamic(() => import('./weather-factors/Temperature'));
const AirQuality = dynamic(() => import('./weather-factors/AirQuality'));

const Results = () => {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return <p aria-live="polite">Loading...</p>;
  } else if (data.error || data.message) {
    return <p aria-live="polite">{data.error || data.message}</p>;
  } else if (!data.results) {
    return <p aria-live="polite">Something went horribly wrong</p>;
  }

  return (
    <div
      className="flex flex-col gap-6"
      tabIndex={0}
      aria-label="Search results"
      aria-live="polite"
      aria-atomic="true"
    >
      <Rain {...data.results.weather} />
      <Temperature
        base={data.results.temp}
        feelsLike={data.results.feelsLike}
      />
      <AirQuality value={data.results.aqi} />
    </div>
  );
};

export default Results;
