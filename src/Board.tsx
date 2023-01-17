import Square from './Square';
import { useState } from 'react';

export default function Board() {
    const [squareSelected, updateSelection] = useState(-1);
    const squares: JSX.Element[] = [];
    let troop: 'soldier' | 'archer' | null;
    for (let i = 0; i < 100; i++) {
        if (i < 10 || i >= 90) troop = 'archer';
        else if (i < 20 || i >= 80) troop = 'soldier';
        else troop = null;

        squares.push(
            <Square
                squareSelected={squareSelected}
                update={updateSelection}
                position={i}
                troop={troop}
            ></Square>
        );
    }
    return (
        <div className="grid grid-cols-10 w-fit mx-auto my-8">{squares}</div>
    );
}
