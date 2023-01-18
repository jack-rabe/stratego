const water_tiles = [42, 43, 46, 47, 52, 53, 56, 57];

export default function Square(props: {
    position: number;
    squareSelected: number;
    update: any;
    troops: any;
    setTroops: any;
    troop: string | null;
}) {
    const ss = props.squareSelected;
    const pos = props.position;

    let bgColor = ss == pos ? 'bg-red-700' : 'bg-slate-700';
    if (isAdjacent(pos, ss, props.troop))
        bgColor = ' bg-slate-500 hover:bg-blue-600';
    else bgColor = ` ${bgColor} hover:${bgColor}`;
    // water tiles
    if (water_tiles.includes(pos)) bgColor = ' bg-blue-800';

    // handles click to attempt to select this square
    const clickToSelect = () => {
        // return early if square is adjacent
        if (isAdjacent(pos, ss, props.troop)) {
            handleMove();
            return;
        }
        // return early if another square is already selected or no troop is on square
        if ((props.squareSelected != -1 && ss != pos) || props.troop == null)
            return;

        if (ss != pos) props.update(props.position);
        else props.update(-1);
    };
    // handles moving to an ajacent square
    const handleMove = () => {
        const tmp = props.troops[props.position];
        props.troops[props.position] = props.troops[props.squareSelected];
        props.troops[props.squareSelected] = tmp;
        props.setTroops(props.troops);
        console.log('hi');
        props.update(-1);
    };

    return (
        <div
            className={
                'border-l border-t border-black text-center h-16 w-16 ' +
                getBorderClasses(props.position) +
                bgColor
            }
            // select or deselect square when clicked
            onClick={clickToSelect}
        >
            {props.troop ? props.troop : ''}
        </div>
    );
}

// only add right right border to the far right elements and bottom borders to the bottom elements
function getBorderClasses(position: number) {
    let classes: string[] = [];

    let posStr: 'bottomRight' | 'bottom' | 'right' | 'middle' = 'middle';
    if (position < 90 && position % 10 != 9) posStr = 'middle';
    else if (position == 99) posStr = 'bottomRight';
    else if (position >= 90) posStr = 'bottom';
    else posStr = 'right';

    switch (posStr) {
        case 'middle':
            break;
        case 'right':
            classes.push('border-r');
            break;
        case 'bottom':
            classes.push('border-b');
            break;
        case 'bottomRight':
            classes.push('border-b');
            classes.push('border-r');
            break;
    }
    return classes.join(' ');
}

// check if square is adjacent to selected square
function isAdjacent(pos: number, ss: number, currentTroop: any) {
    return (
        (ss + 10 == pos ||
            ss - 10 == pos ||
            (Math.abs(pos - ss) == 1 &&
                Math.floor(ss / 10) == Math.floor(pos / 10))) &&
        ss != -1 &&
        currentTroop == null &&
        !water_tiles.includes(pos)
    );
}
