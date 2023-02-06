import Square from './Square';
import { useState } from 'react';
import troops from './troops';

type Props = {
    turn: boolean;
    switchTurn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Board({ turn, switchTurn }: Props) {
    const [squareSelected, updateSelection] = useState(-1);
    const [boardTroops, setTroops] = useState(troops);
    const squares: JSX.Element[] = [];

    const changeTurn = () => {
        switchTurn(!turn);
    };

    for (let i = 0; i < 100; i++) {
        squares.push(
            <Square
                squareSelected={squareSelected}
                switchTurn={changeTurn}
                update={updateSelection}
                troops={boardTroops}
                setTroops={setTroops}
                position={i}
                key={i}
            ></Square>
        );
    }
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-10 w-fit my-8">{squares}</div>
        </div>
    );
}
