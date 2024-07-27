import { RiTempColdLine } from '@remixicon/react';

import { WeatherData } from '@/app/api/weather/route';
import WeatherFactor from './WeatherFactor';

type Props = {
  base: NonNullable<WeatherData['temp']>;
  feelsLike: NonNullable<WeatherData['feelsLike']>;
  className?: string;
};

const Temperature = ({ base, feelsLike, className }: Props) => {
  const cBase = ((base - 32) / 1.8).toFixed(2);
  const cFeelsLike = ((feelsLike - 32) / 1.8).toFixed(2);

  const data = (
    <div className="flex flex-col items-end gap-4">
      <div className="flex gap-8">
        <p>{base} °F</p>
        <p>Feels like {feelsLike} °F</p>
      </div>
      <div className="w-full border-b-2 border-gray-600" />
      <div className="flex gap-8">
        <p>{cBase} °C</p>
        <p>Feels like {cFeelsLike} °C</p>
      </div>
    </div>
  );

  let message;

  if (feelsLike < 55) {
    message = 'You might want a heavy jacket.';
  } else if (feelsLike > 100) {
    message = 'Flip flops would be nice today.';
  }

  return (
    <WeatherFactor
      icon={<RiTempColdLine />}
      name="Temperature"
      data={data}
      message={message}
    />
  );
};

export default Temperature;
