import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// renderitzar la informació de cada monster
function MonstersInfo() {
    const { monsterId } = useParams();
    const [monster, setMonster] = useState(null);
    const [gameName, setGameName] = useState(null);

    useEffect(() => {
        axios.get(`https://zelda.fanapis.com/api/monsters/${monsterId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setMonster(response.data);
    
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
                console.error('Error fetching la informació del monstre: ', error);
            });
    }, [monsterId]);
    

    if (!monster || !gameName) {
        return <div>Loading...</div>;
    }

    console.log('Monster object:', monster);

    return (
        <div>
            <h2>{monster.data.name}</h2>
            <p>Appearances: {gameName}</p>
            <p>About the monster: {monster.data.description}</p>

            <button>
                <Link to='/monsters'>Back</Link>
            </button>
        </div>
    );
}

export default MonstersInfo;
