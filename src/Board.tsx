import Square from './Square';

const squares: JSX.Element[] = [];
for (let i = 0; i < 100; i++) {
    squares.push(<Square position={i}></Square>);
}

export default function Board() {
    return (
        <div className="grid grid-cols-10 w-fit mx-auto my-5">{squares}</div>
    );
}
