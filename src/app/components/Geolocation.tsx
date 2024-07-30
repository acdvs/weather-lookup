'use client';

import { useEffect } from 'react';
import { useLocation, useSearch } from '@/store';

const Geolocation = () => {
  const { setCity, setCountry, setState } = useLocation();
  const setQuery = useSearch((state) => state.setQuery);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        const res = await fetch('/api/location', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat: latitude, lon: longitude }),
        });

        if (res.ok) {
          const data = await res.json();

          setCity(data.city);
          setCountry(data.country);
          setState(data.state);

          setQuery({
            city: data.city,
            country: data.country,
            state: data.state,
          });
        }
      });
    }
  }, []);

  return <></>;
};

export default Geolocation;
