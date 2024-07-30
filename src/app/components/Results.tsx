'use client';

import dynamic from 'next/dynamic';

import useWeather from '@/utils/useWeather';
const Rain = dynamic(() => import('./weather-factors/Rain'));
const Temperature = dynamic(() => import('./weather-factors/Temperature'));
const AirQuality = dynamic(() => import('./weather-factors/AirQuality'));

const Results = () => {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (data?.error) {
    return <p>{data.error}</p>;
  } else if (!data) {
    return <p>No weather data</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Rain {...data.rain} />
      <Temperature base={data.temp} feelsLike={data.feelsLike} />
      <AirQuality value={data.aqi} />
    </div>
  );
};

export default Results;
