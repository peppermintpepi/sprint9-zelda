import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Games from "./components/Games/Games";
import GameInfo from "./components/GameInfo/GameInfo";
import Staff from "./components/Staff/Staff";
import StaffInfo from "./components/StaffInfo/StaffInfo";
import Characters from "./components/Characters/Characters";
import CharacterInfo from "./components/CharactersInfo/CharactersInfo";
import Monsters from "./components/Monsters/Monsters";
import MonstersInfo from "./components/MonstersInfo/MonstersInfo";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/games" element={<Games />} />
          <Route path='/games/:gameId' element={<GameInfo />} />
          <Route path='/staff' element={<Staff />} />
          <Route path="/staff/:staffId" element={<StaffInfo />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:characterId" element={<CharacterInfo />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/monsters/:monsterId" element={<MonstersInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
