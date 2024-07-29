'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSearch } from '@/store';

const useWeather = () => {
  const { query, setLoading, addHistory } = useSearch();

  const { data, isLoading } = useQuery({
    queryKey: [query.zipCode, query.city, query.state, query.country],
    queryFn: () =>
      fetch('/api/weather', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      }).then((res) => res.json()),
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data && !data.error && !isLoading) {
      addHistory(query);
    }
  }, [data, isLoading]);

  return { data, isLoading };
};

export default useWeather;
