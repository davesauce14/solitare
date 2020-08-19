import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Deck } from './deck/Deck';
import { DeckComponent } from './deck/DeckComponent';
import { Stage } from './stage/Stage';
import { Resolved } from './resolved/Resolved';

function App() {

  let [cards, updateCards] = useState(new Deck().cards);

  return (
    <div className="App">
      <div className="row">
        <DeckComponent />
        <Resolved />
      </div>
      <div className="row">
        <Stage />
      </div>
    </div>
  );
}

export default App;
