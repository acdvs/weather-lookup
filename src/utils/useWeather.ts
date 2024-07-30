'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSearch } from '@/store';
import { WeatherResponse } from '@/app/api/weather/route';

const useWeather = () => {
  const { query, setLoading, addHistory } = useSearch();

  const { data, isLoading, isFetching } = useQuery<WeatherResponse>({
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
    refetchOnMount: false,
    initialData: { message: 'Choose a location' },
  });

  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (data.results) {
      addHistory(query);
    }
  }, [data.results]);

  return { data, isLoading: isLoading || isFetching };
};

export default useWeather;
