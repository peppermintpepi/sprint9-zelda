import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// renderitzar la informació de cada treballador
function StaffInfo() {
    const { staffId } = useParams();
    const [programer, setProgramer] = useState(null);
    const [gameName, setGameName] = useState(null);

    useEffect(() => {
        axios.get(`https://zelda.fanapis.com/api/staff/${staffId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setProgramer(response.data);
    
                const workedOnArray = response.data.data.worked_on;
                
                if (Array.isArray(workedOnArray) && workedOnArray.length > 0) {
                    const gameURL = workedOnArray[0];
                    const gameID = gameURL.substring(gameURL.lastIndexOf('/') + 1);
    
                    return axios.get(`https://zelda.fanapis.com/api/games/${gameID}`);
                } else {
                    throw new Error('Invalid worked_on format');
                }
            })
            .then((gameResponse) => {
                console.log('Game Data from API:', gameResponse.data);
                setGameName(gameResponse.data.data.name);
            })
            .catch((error) => {
                console.error('Error fetching la información del juego: ', error);
            });
    }, [staffId]);
    

    if (!programer || !gameName) {
        return <div>Loading...</div>;
    }

    console.log('Staff object:', programer);

    return (
        <div>
            <h2>{programer.data.name}</h2>
            <p>Worked On: {gameName}</p>

            <button>
                <Link to='/staff'>Back</Link>
            </button>
        </div>
    );
}

export default StaffInfo;
