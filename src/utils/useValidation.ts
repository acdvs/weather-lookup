import { useState } from 'react';
import { LocationData, useSearch } from '@/store';

const useValidation = () => {
  const setQuery = useSearch((state) => state.setQuery);
  const [errors, setErrors] = useState<LocationData>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let query: LocationData = {};
    let _errors: LocationData = {};

    const form = new FormData(e.currentTarget);
    const city = form.get('city');
    const country = form.get('country');
    const state = form.get('state');
    const zipCode = form.get('zip');

    if (country) {
      query.country = country as string;

      if (zipCode) {
        query.zipCode = parseInt(zipCode as string);
      } else {
        if (city) {
          query.city = city as string;
        } else {
          _errors.city = 'Select a city';
        }

        if (country === 'US') {
          if (state) {
            query.state = state as string;
          } else {
            _errors.state = 'Select a state';
          }
        }
      }
    } else {
      _errors.country = 'Select a country';
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    setQuery(query);
    setErrors({});
  };

  const resetError = (key: keyof LocationData) => {
    setErrors(({ [key]: _, ...state }) => state);
  };

  return { handleSubmit, errors, resetError };
};

export default useValidation;
