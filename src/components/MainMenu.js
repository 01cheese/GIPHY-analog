import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MainMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="main-menu">
            <button className="menu-toggle" onClick={() => setOpen(!open)}>
                ☰
            </button>

            {open && (
                <ul className="menu-dropdown" onMouseLeave={() => setOpen(false)}>
                    <li>
                        <Link to="/" className="menu-link" onClick={() => setOpen(false)}>
                            Find Gifs
                        </Link>
                    </li>
                    <li>
                        <Link to="/save_gifs" className="menu-link" onClick={() => setOpen(false)}>
                            My GIF Inventory
                        </Link>
                    </li>
                    <li>
                        <Link to="https://github.com" target="_blank" className="menu-link" onClick={() => setOpen(false)}>
                            GitHub
                        </Link>
                    </li>
                    <li>
                        <Link to="https://github.com" target="_blank" className="menu-link" onClick={() => setOpen(false)}>
                            10HL
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
