import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GifService from '../services/GifService';

function GifDialogRaw({ open, onClose, onCancel, gif, gifId, isProfile, isCategoryDetails, categories }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [gif]);

  const handleCancel = () => {
    onCancel(gif);
  };

  const handleOk = () => {
    onClose(gif);
  };

  const downloadGif = async (gif) => {
    const blob = await fetch(gif.images.original.url).then(r => r.blob());
    const link = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = link;
    a.download = `${gif.title}.gif`;
    a.click();
    URL.revokeObjectURL(link);

    try {
      await GifService.saveGif({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url
      });
    } catch (err) {
    }
  };

  const removeGifFromInventory = async (id) => {
    setIsLoading(true);
    try {
      const response = await GifService.deleteGif(id);
      if (response?.status === 200) {
        handleOk();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open || !gif) return null;

  return (
      <div className="modal-backdrop" onClick={handleCancel}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h3>{gif.title}</h3>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img src={gif.images.original.url} alt={gif.title} style={{ maxWidth: '100%' }} />
          </div>
          <div className="modal-buttons">
            {isProfile && (
                <>
                  {categories?.map(category => (
                      <button
                          key={category.id}
                          className="btn"
                          onClick={() => {/* logic save to category */}}
                      >
                        Save to {category.categoryName}
                      </button>
                  ))}
                  <button
                      className="btn"
                      onClick={() => removeGifFromInventory(gifId)}
                      disabled={isLoading}
                  >
                    {isLoading ? 'Removing…' : 'Remove'}
                  </button>
                </>
            )}
            {!isProfile && !isCategoryDetails && (
                <button className="btn" onClick={() => downloadGif(gif)}>
                  Save
                </button>
            )}
            {isCategoryDetails && gifId && (
                <button className="btn" onClick={() => {/* logic delete */}}>
                  Remove
                </button>
            )}
            <button className="btn" onClick={handleCancel}>
              Close
            </button>
          </div>
        </div>
      </div>
  );
}

GifDialogRaw.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  gif: PropTypes.object,
  gifId: PropTypes.string,
  isProfile: PropTypes.bool,
  isCategoryDetails: PropTypes.bool,
  categories: PropTypes.array,
};

export default function GifDialog({ user, gif, gifId, isProfile, isCategoryDetails, categories }) {
  const [open, setOpen] = useState(false);

  if (!gif) return null;

  const isTall = gif.images.original.height > gif.images.original.width;
  const preview = isTall
      ? gif.images.fixed_width_downsampled
      : gif.images.fixed_height_downsampled;

  return (
      <div>
        <img
            src={preview.url}
            width={preview.width}
            height={preview.height}
            alt={gif.title}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(true)}
        />
        <GifDialogRaw
            open={open}
            onClose={() => {
              setOpen(false);
              window.location.reload();
            }}
            onCancel={() => setOpen(false)}
            user={user}
            gif={gif}
            gifId={gifId}
            isProfile={isProfile}
            isCategoryDetails={isCategoryDetails}
            categories={categories}
        />
      </div>
  );
}

GifDialog.propTypes = {
  user: PropTypes.object.isRequired,
  gif: PropTypes.object,
  gifId: PropTypes.string,
  isProfile: PropTypes.bool,
  isCategoryDetails: PropTypes.bool,
  categories: PropTypes.array,
};
