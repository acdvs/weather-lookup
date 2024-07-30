'use client';

import dynamic from 'next/dynamic';

import useWeather from '@/utils/useWeather';
const Rain = dynamic(() => import('./weather-factors/Rain'));
const Temperature = dynamic(() => import('./weather-factors/Temperature'));
const AirQuality = dynamic(() => import('./weather-factors/AirQuality'));

const Results = () => {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return <p aria-live="polite">Loading...</p>;
  } else if (data?.error) {
    return <p aria-live="polite">{data.error}</p>;
  } else if (!data) {
    return <p aria-live="polite">No weather data</p>;
  }

  return (
    <div
      className="flex flex-col gap-6"
      tabIndex={0}
      aria-label="Search results"
      aria-live="polite"
      aria-atomic="true"
    >
      <Rain {...data.rain} />
      <Temperature base={data.temp} feelsLike={data.feelsLike} />
      <AirQuality value={data.aqi} />
    </div>
  );
};

export default Results;
