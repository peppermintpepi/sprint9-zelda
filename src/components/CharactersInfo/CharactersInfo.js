import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// renderitzar les dades dels personatges
function CharacterInfo() {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [gameName, setGameName] = useState(null);

    useEffect(() => {
        axios.get(`https://zelda.fanapis.com/api/characters/${characterId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setCharacter(response.data);

                const appearancesArray = response.data.data.appearances;
                
                if (Array.isArray(appearancesArray) && appearancesArray.length > 0) {
                    const gameURL = appearancesArray[0];
                    const gameID = gameURL.substring(gameURL.lastIndexOf('/') + 1);
    
                    return axios.get(`https://zelda.fanapis.com/api/games/${gameID}`);
                } else {
                    throw new Error('Invalid appearances format');
                }
            })
            .then((gameResponse) => {
                console.log('Game Data from API:', gameResponse.data);
                setGameName(gameResponse.data.data.name);
            })
            .catch((error) => {
                console.error('Error fetching la información del personatge: ', error);
            });
    }, [characterId]);

    if (!character) {
        return <div>Loading...</div>;
    }

    console.log('Character object:', character);

    return (
        <div>
            <h2>{character.data.name}</h2>
            <p>Appearances: {gameName}</p>
            <p>About the character: {character.data.description}</p>
            <p>Gender: {character.data.gender}</p>
            <p>Race: {character.data.race}</p>

            <button>
                <Link to='/characters'>Back</Link>
            </button>
        </div>
    );
}

export default CharacterInfo;
