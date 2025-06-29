import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import GifDialog from './GifDialog';

const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const GifGrid = ({ gifs, user, isProfile, isCategoryDetails }) => {
    const [masonryKey, setMasonryKey] = useState(Date.now());
    useEffect(() => {
        setMasonryKey(Date.now());
    }, [gifs]);


    return (
        <div className="gif-grid-container">
            {gifs && gifs.length > 0 ? (
                <Masonry
                    key={masonryKey}
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {gifs.map((gif) => (
                        <div key={gif.id}>
                            <GifDialog
                                gif={isProfile || isCategoryDetails ? gif.gifData : gif}
                                gifId={(isProfile || isCategoryDetails) && gif.id}
                                isProfile={isProfile}
                                isCategoryDetails={isCategoryDetails}
                                user={user}
                            />
                        </div>
                    ))}
                </Masonry>
            ) : (
                <p className="gif-grid-empty">No Results</p>
            )}
        </div>
    );
};

GifGrid.propTypes = {
    gifs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string,
    isProfile: PropTypes.bool,
    isCategoryDetails: PropTypes.bool,
};

export default GifGrid;
