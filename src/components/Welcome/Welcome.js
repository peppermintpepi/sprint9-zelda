import React from "react";
import { Link } from 'react-router-dom';

// pàgina d'inici amb la informació
function Welcome() {
    return (
        <div>
            <h1>Welcome to Zelda's main database</h1>
            <p>Choose a category</p>

            <ul>
                <li>
                    <Link to='/games'>Games</Link>
                </li>
                <li>
                    <Link to='/staff'>Staff</Link>
                </li>
                <li>
                    <Link to='/characters'>Characters</Link>
                </li>
                <li>
                    <Link to='/monsters'>Monsters</Link>
                </li>
            </ul>
        </div>
    );
}

export default Welcome;