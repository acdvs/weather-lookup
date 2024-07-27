import Geolocation from './components/Geolocation';
import Search from './components/Search';
import History from './components/History';
import Results from './components/Results';

export default function Index() {
  return (
    <div className="max-w-[800px] mx-auto mt-20 text-center">
      <h1 className="mb-10">Current Weather</h1>
      <Geolocation />
      <Search className="mb-8" />
      <History className="mb-8" />
      <Results />
    </div>
  );
}
