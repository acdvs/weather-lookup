'use client';

import { useLocation } from '@/store';
import ZipCode from './inputs/ZipCode';
import City from './inputs/City';
import USStateSelect from './inputs/USStateSelect';
import CountrySelect from './inputs/CountrySelect';
import SearchButton from './inputs/SearchButton';

const Search = ({ className }: { className?: string }) => {
  const {
    city,
    country,
    state,
    zipCode,
    setCity,
    setCountry,
    setState,
    setZipCode,
  } = useLocation();

  return (
    <div className={className}>
      <div className="flex items-center gap-5">
        <SearchSection>
          <CountrySelect
            value={country}
            onValueChange={(v) => handleChange(v, setCountry, 'country')}
          />
        </SearchSection>
        <SearchSection>
          <p>or</p>
          <ZipCode
            value={zipCode || ''}
            onValueChange={(v) => handleChange(v, setZipCode, 'zipCode')}
          />
          <City
            value={city}
            onValueChange={(v) => handleChange(v, setCity, 'city')}
          />
          {country === 'US' && (
            <USStateSelect
              value={state}
              onValueChange={(v) => handleChange(v, setState, 'state')}
            />
          )}
        </SearchSection>
        <SearchButton />
      </div>
    </div>
  );
};

function SearchSection({ children }: React.PropsWithChildren) {
  return (
    <div className="flex grow items-center gap-4 border-b-2 border-gray-700 pb-4 hover:border-gray-500 transition-colors">
      {children}
    </div>
  );
}

export default Search;
