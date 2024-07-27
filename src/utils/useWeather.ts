'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useLocation, useSearch } from '@/store';

const useWeather = () => {
  const { zipCode, city, state, country } = useLocation();
  const { queryTrigger, setLoading, addHistory } = useSearch();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [zipCode, city, state, country],
    queryFn: () =>
      fetch('/api/weather', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode, city, state, country }),
      }).then((res) => res.json()),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [queryTrigger]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data && !data.error && !isLoading) {
      // A bit ugly but necessary for history check
      addHistory({
        ...(city && { city }),
        ...(country && { country }),
        ...(state && { state }),
        ...(zipCode && { zipCode }),
      });
    }
  }, [data, isLoading]);

  return { data, isLoading };
};

export default useWeather;
