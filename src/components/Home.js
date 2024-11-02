import React, { useState } from 'react';
import Board from './Board';

function Home() {
    const [size, setSize] = useState(2);

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        if (newSize >= 2 && newSize <= 10)
        setSize(newSize); // Use 2 as a default if parsing fails
    };

    console.log('Size in Home:', size); // Logging size for debugging

    return (
        <div>
            <h1>Memory Game</h1>
            <div>
                <span>Size: </span>
                <input
                    type="number"
                    value={size}
                    onChange={handleSizeChange}
                />
            </div>
            <div>
                <Board boardSize={size} />
            </div>
        </div>
    );
}

export default Home;
