type Props = {
  icon: React.ComponentType;
  name: string;
  data: React.ReactNode;
  message?: string;
};

const WeatherFactor = ({ name, data, message, ...props }: Props) => {
  return (
    <div className="flex flex-col border-2 border-gray-700 rounded-lg">
      <div className="flex justify-between items-center px-8 py-8">
        <div className="flex gap-4">
          <props.icon />
          <p className="font-bold">{name}</p>
        </div>
        <div className="flex flex-col items-end">{data}</div>
      </div>
      {message && <p className="bg-gray-700 p-2">{message}</p>}
    </div>
  );
};

export default WeatherFactor;
