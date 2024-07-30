type Props = {
  icon: React.ComponentType;
  name: string;
  data: React.ReactNode;
  message?: string;
};

const WeatherFactor = ({ name, data, message, ...props }: Props) => {
  return (
    <div
      className="flex flex-col border-2 border-gray-700 rounded-lg"
      tabIndex={0}
      aria-labelledby={`${name} ${name}_data ${name}_msg`}
    >
      <div className="flex justify-between items-center px-8 py-8">
        <div className="flex gap-4">
          <props.icon />
          <p id={name} className="font-bold">
            {name}
          </p>
        </div>
        <div id={`${name}_data`} className="flex flex-col items-end">
          {data}
        </div>
      </div>
      {message && (
        <p
          id={`${name}_msg`}
          className="bg-gray-700 p-2"
          aria-label={`Note: ${message}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default WeatherFactor;
