'use client';

import { useLocation } from '@/store';
import ZipCode from './inputs/ZipCode';
import City from './inputs/City';
import USStateSelect from './inputs/USStateSelect';
import CountrySelect from './inputs/CountrySelect';
import SearchButton from './inputs/SearchButton';

const Search = ({ className }: { className?: string }) => {
  const country = useLocation((state) => state.country);

  return (
    <div className={className}>
      <div className="flex items-center gap-5">
        <SearchSection>
          <CountrySelect />
        </SearchSection>
        <SearchSection>
          <ZipCode />
          <p>or</p>
          <City />
          {country == 'US' && <USStateSelect />}
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
