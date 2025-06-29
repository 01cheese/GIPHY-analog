import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';

export default function SavedGifs() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadGif = async (url, title = 'download') => {
    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${title}.gif`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
            `${process.env.REACT_APP_API_BASEURL}api/user/saved-gifs`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setGifs(res.data);
      } catch (e) {

      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1
  };

  return (
      <div className="main-page">
        <div className="search-wrapper">

          {loading && <p>Loading...</p>}
          {!loading && gifs.length === 0 && (
              <div className="login-reminder">No saved yet</div>
          )}

          {!loading && gifs.length > 0 && (
              <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
              >
                {gifs.map(g => (
                    <div key={g.id}>
                      <img
                          src={g.url}
                          alt={g.title}
                          className="card"
                          onClick={() => downloadGif(g.url, g.title)}
                      />
                    </div>
                ))}
              </Masonry>
          )}
        </div>
      </div>
  );
}
