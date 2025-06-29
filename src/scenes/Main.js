import React from 'react';
import SearchBar from '../components/SearchBar';

const Main = ({ user }) => {
    return (
        <div className="main-page">
            {user ? (
                <div className="search-wrapper">
                    <SearchBar user={user} />
                </div>
            ) : (
                <div className="login-reminder">
                    <p>Please sign in to save GIFs!</p>
                </div>
            )}
        </div>
    );
};

export default Main;
