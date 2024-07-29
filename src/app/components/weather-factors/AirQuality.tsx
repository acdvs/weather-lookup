import { RiFoggyLine } from '@remixicon/react';

import { WeatherData } from '@/app/api/weather/route';
import WeatherFactor from './WeatherFactor';

const indexNames = ['Good', 'Fair', 'Moderate', 'Poor', 'Very poor'];

const AirQuality = ({ value }: { value: NonNullable<WeatherData['aqi']> }) => {
  const data = (
    <>
      <p className="mb-3">{value} out of 5</p>
      <p>{indexNames[value - 1]}</p>
    </>
  );

  let message;

  if (value === 4 || value === 5) {
    message = 'Uh oh. You should probably wear a face mask.';
  }

  return (
    <WeatherFactor
      icon={RiFoggyLine}
      name="Air Quality Index"
      data={data}
      message={message}
    />
  );
};

export default AirQuality;
