import Square from './Square';
import { useState } from 'react';

export default function Board() {
    const [squareSelected, updateSelection] = useState(false);
    const squares: JSX.Element[] = [];
    for (let i = 0; i < 100; i++) {
        squares.push(
            <Square
                squareSelected={squareSelected}
                update={updateSelection}
                position={i}
            ></Square>
        );
    }
    return (
        <div className="grid grid-cols-10 w-fit mx-auto my-5">{squares}</div>
    );
}
