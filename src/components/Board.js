import React, { useState, useEffect } from 'react';
import './board.css';

function Board({ boardSize }) {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    function generateBoard() {
        const totalCards = boardSize * boardSize;
        const pairCount = Math.floor(totalCards / 2);
        const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
        const sortedArray = [...numbers, ...numbers]
            .sort(() => Math.random() - 0.5)
            .map((number, index) => ({ id: index, number }));

        setCards(sortedArray);
        setFlipped([]);
        setSolved([]);
        setDisabled(false);
        setWon(false);
    }

    function checkMatch(id) {
        const [flippedId] = flipped;
        if (cards[flippedId].number === cards[id].number) {
            setSolved((prev) => [...prev, id, flippedId]);
            setFlipped([]);
            setDisabled(false);

            // Check if the game is won
            if (solved.length + 2 === cards.length) {
                setWon(true);
            }
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    }

    function isFlipped(id) {
        return flipped.includes(id);
    }

    const isSolved = (id) => solved.includes(id);

    function handleClick(id) {
        if (disabled || won || isFlipped(id) || isSolved(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
        } else if (flipped.length === 1) {
            setFlipped((prev) => [...prev, id]);
            setDisabled(true);
            checkMatch(id);
        }
    }
     function handleButton(){
        generateBoard();

     }

    useEffect(() => {
        generateBoard();
    }, [boardSize]);

    useEffect(() => {
        console.log('Current flipped:', flipped);
    }, [flipped]);

    return (
        <div>
        <div
            className="board-grid"
            style={{
                gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            }}
        >
            {cards.map((card) => (
                <div   className={`card ${isFlipped(card.id) || isSolved(card.id) ? 'card-flipped' : ''}`}
                    onClick={() => handleClick(card.id)}
                  
                    key={card.id}
                >
                    {isFlipped(card.id) || isSolved(card.id) ? card.number : ""}
                </div>
            ))}
            {won && <div className="win-message">You Won!</div>}
        </div>
          <div>
            <button onClick={handleButton} >{won?"Palay Again":"Restart"}</button>
          </div>

        </div>
    );
}

export default Board;
