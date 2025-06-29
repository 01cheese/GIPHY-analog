import React, { useEffect, useState } from 'react';
import { GiphyService } from '../services';
import { Validation } from '../helpers';
import GifGrid from "./GifGrid";

const SearchBar = ({ user }) => {
  const [gifs, setGifs] = useState([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [queryState, setQueryState] = useState('');

  useEffect(() => {
    if (query) {
      fetchGifs(query);
    } else {
      fetchTrendingGifs();
    }
  }, [query, offset]);


  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  const fetchTrendingGifs = async () => {
    try {
      const response = await GiphyService.getTrending({ limit, offset });
      if (response?.status === 200) {
        setGifs(response.data?.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGifs = async (searchQuery) => {
    try {
      const response = await GiphyService.gifSearch({ q: searchQuery, limit, offset });
      if (response?.status === 200) {
        setGifs(response.data?.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setOffset(0);

    if (Validation.verifyLength(value, 1)) {
      setQueryState('success');
      fetchGifs(value);
    } else {
      setQueryState('error');
      fetchTrendingGifs();
    }
  };

  const setFirstPage = () => {
    setOffset(0);
  };

  const pageUp = () => {
    setOffset(prev => prev + limit);
  };

  const pageDown = () => {
    setOffset(prev => Math.max(prev - limit, 0));
  };

  return (
      <div className="search-bar">
        <div className="search-input">
          <input
              type="text"
              placeholder="Search for GIFs"
              value={query}
              onChange={handleChange}
              className={queryState === 'error' ? 'input-error' : ''}
          />
        </div>

        <div className="search-buttons">
          <button onClick={setFirstPage} disabled={offset === 0}>First Page</button>
          <button onClick={pageDown} disabled={offset === 0}>Prev Page</button>
          <button onClick={pageUp} disabled={gifs.length < limit}>Next Page</button>
        </div>
        {gifs.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>No results</p>
        ) : (
            <div style={{ marginTop: '2rem' }}>
              <GifGrid gifs={gifs} user={user} />
            </div>
        )}


      </div>
  );
};

export default SearchBar;
