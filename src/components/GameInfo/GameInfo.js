import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// renderitzar les dades del joc triat
function GameInfo() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        axios.get(`https://zelda.fanapis.com/api/games/${gameId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setGame(response.data);
            })
            .catch((error) => {
                console.error('Error fetching la información del juego: ', error);
            });
    }, [gameId]);

    if (!game) {
        return <div>Loading...</div>;
    }

    console.log('Game object:', game);

    return (
        <div>
            <h2>{game.data.name}</h2>
            <p>{game.data.description}</p>
            <p>Developer: {game.data.developer}</p>
            <p>Publisher: {game.data.publisher}</p>
            <p>Released Date: {game.data.released_date}</p>

            <button>
                <Link to='/games'>Back</Link>
            </button>
        </div>
    );
}

export default GameInfo;
