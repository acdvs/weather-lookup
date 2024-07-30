import { RiRainyLine } from '@remixicon/react';

import { WeatherData } from '@/app/api/weather/route';
import WeatherFactor from './WeatherFactor';

const Weather = ({
  id,
  description,
  lastHour,
}: NonNullable<WeatherData['rain']>) => {
  const millis = lastHour?.toFixed(2) || null;
  const inches = lastHour ? (lastHour / 25.4).toFixed(2) : null;

  const data = (
    <>
      {lastHour && (
        <p className="mb-3">
          {inches} in ({millis} mm)
        </p>
      )}
      <p aria-label={`Description: ${description}`}>
        {description.replace(/^(.)/, (x) => x.toUpperCase())}
      </p>
    </>
  );

  let message;

  if (id >= 300 && id < 312) {
    message = "You'll need a raincoat. There's a drizzle.";
  } else if (id >= 313 && id < 501) {
    message = '"Yeah, we needed this." —Dad';
  } else if (id >= 502 && id < 600) {
    message = "You'll need a raincoat. It's raining cats and dogs out there.";
  }

  return (
    <WeatherFactor
      icon={RiRainyLine}
      name="Weather"
      data={data}
      message={message}
    />
  );
};

export default Weather;
