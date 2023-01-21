import Square from './Square';
import { useState } from 'react';
import troops from './troops';

export default function Board() {
    const [squareSelected, updateSelection] = useState(-1);
    const [boardTroops, setTroops] = useState(troops);
    const squares: JSX.Element[] = [];

    for (let i = 0; i < 100; i++) {
        squares.push(
            <Square
                squareSelected={squareSelected}
                update={updateSelection}
                troops={boardTroops}
                setTroops={setTroops}
                position={i}
                key={i}
            ></Square>
        );
    }
    return (
        <div className="grid grid-cols-10 w-fit mx-auto my-8">{squares}</div>
    );
}
