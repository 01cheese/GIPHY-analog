import React from 'react';
import MainMenu from './MainMenu';

export default function NavBar({ user, signOut, signInWithGoogle }) {
    return (
        <header className="navbar">
            <MainMenu />
            <h1 className="navbar-title"></h1>
            {user ? (
                <button className="btn" onClick={signOut}>
                    LogOut
                </button>


            ) : (
                <button className="btn" onClick={signInWithGoogle}>
                    Sign
                </button>
            )}
        </header>
    );
}
