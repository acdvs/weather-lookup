'use client';

import cx from 'classnames';

import { LocationData, useLocation, useSearch } from '@/store';
import { locationToKey, locationToString } from '@/utils/location';
import { useEffect } from 'react';

const loadHistory = () => {
  const session = sessionStorage.getItem('history');
  return session ? (JSON.parse(session) as LocationData[]) : [];
};

const History = ({ className }: { className?: string }) => {
  const { setCity, setCountry, setState, setZipCode } = useLocation();
  const { history, setHistory, refetch } = useSearch();

  useEffect(() => {
    const initialHistory = loadHistory();
    setHistory(initialHistory);
  }, []);

  if (history.length === 0) {
    return;
  }

  const loadQuery = (loc: LocationData) => {
    setCity(loc.city);
    setCountry(loc.country);
    setState(loc.state);
    setZipCode(loc.zipCode);

    refetch();
  };

  return (
    <div className={cx(className, 'flex items-center gap-4')}>
      <p>Recent searches</p>
      <div className="flex flex-wrap flex-1 gap-2">
        {history.map((v) => (
          <p
            key={locationToKey(v)}
            className="px-2 bg-gray-700 rounded hover:bg-gray-600 hover:cursor-pointer transition-colors"
            onClick={() => loadQuery(v)}
          >
            {locationToString(v)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default History;
