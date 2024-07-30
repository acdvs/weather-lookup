'use client';

import { useEffect } from 'react';
import cx from 'classnames';

import { LocationData, useLocation, useSearch } from '@/store';
import { locationToKey, locationToString } from '@/utils/location';

const loadHistory = () => {
  const session = sessionStorage.getItem('history');
  return session ? (JSON.parse(session) as LocationData[]) : [];
};

const History = ({ className }: { className?: string }) => {
  const { setCity, setCountry, setState, setZipCode } = useLocation();
  const { history, setHistory, setQuery } = useSearch();

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

    setQuery(loc);
  };

  return (
    <div
      className={cx(className, 'flex items-center gap-4')}
      tabIndex={0}
      aria-labelledby="history_title"
    >
      <p id="history_title" aria-label="Recent searches (most to least recent)">
        Recent searches
      </p>
      <div className="flex flex-wrap flex-1 gap-2">
        {history.map((v) => (
          // Would be nice to have screen readers read out
          // full state/country names, but not enough time
          <p
            key={locationToKey(v)}
            className="px-2 bg-gray-700 rounded hover:bg-gray-600 hover:cursor-pointer transition-colors"
            onClick={() => loadQuery(v)}
            tabIndex={0}
          >
            {locationToString(v)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default History;
