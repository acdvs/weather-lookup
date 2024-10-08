'use client';

import cx from 'classnames';

import { LocationData, useLocation } from '@/store';
import useValidation from '@/utils/useValidation';

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
  const { handleSubmit, errors, resetError } = useValidation();

  const handleChange = <V extends any>(
    value: V,
    action: (x: V) => void,
    errorKey: keyof LocationData,
  ) => {
    action(value);
    resetError(errorKey);

    if (errorKey === 'country') {
      resetError('city');
      resetError('state');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cx(className, 'flex items-stretch gap-5')}
    >
      <SearchSection>
        <CountrySelect
          value={country}
          onValueChange={(v) => handleChange(v, setCountry, 'country')}
          error={!!errors.country}
          errorMessage={errors.country}
        />
      </SearchSection>
      <SearchSection>
        <ZipCode
          value={zipCode || ''}
          onValueChange={(v) => handleChange(v, setZipCode, 'zipCode')}
          className="basis-[150px]"
        />
        <p className="self-start py-2">or</p>
        <City
          value={city || ''}
          onValueChange={(v) => handleChange(v, setCity, 'city')}
          error={!!errors.city}
          errorMessage={errors.city}
        />
        {country === 'US' && (
          <USStateSelect
            value={state}
            onValueChange={(v) => handleChange(v, setState, 'state')}
            error={!!errors.state}
            errorMessage={errors.state}
          />
        )}
      </SearchSection>
      <SearchButton />
    </form>
  );
};

function SearchSection({ children }: React.PropsWithChildren) {
  return (
    <div className="flex grow items-start gap-4 border-b-2 border-gray-700 pb-4 hover:border-gray-500 transition-colors">
      {children}
    </div>
  );
}

export default Search;
