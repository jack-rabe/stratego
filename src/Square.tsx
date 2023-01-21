import EnemyTroop from './EnemyTroop';
import FriendlyTroop from './FriendlyTroop';
import { Troop } from './troop';

const ownerId = 2;
const water_tiles = [42, 43, 46, 47, 52, 53, 56, 57];
type Props = {
    position: number;
    squareSelected: number;
    update: any;
    troops: (Troop | null)[];
    setTroops: any;
};

export default function Square(props: Props) {
    const ss = props.squareSelected;
    const pos = props.position;
    const isSelected = ss == pos;
    const myTroop = props.troops[pos];

    let bgColor: string;
    if (water_tiles.includes(pos)) bgColor = 'bg-blue-800';
    else if (isAdjacent(pos, ss, myTroop))
        bgColor = 'bg-slate-500 hover:bg-blue-600';
    else bgColor = 'bg-slate-700';

    // handles click to attempt to select this square
    const clickToSelect = () => {
        // return early if the troop is the other player's
        if (myTroop?.ownerId && myTroop?.ownerId != ownerId) return;
        // return early if square is adjacent
        if (isAdjacent(pos, ss, myTroop)) {
            handleMove();
            return;
        }
        // return early if another square is already selected or no troop is on square
        if ((props.squareSelected != -1 && ss != pos) || myTroop == null)
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
        props.update(-1);
    };

    return (
        <div
            className={
                'flex border-l border-t border-black text-center h-16 w-16 ' +
                getBorderClasses(props.position) +
                ` ${bgColor}`
            }
            // select or deselect square when clicked
            onClick={clickToSelect}
        >
            {myTroop && myTroop.ownerId == ownerId ? (
                <FriendlyTroop
                    val={myTroop.representation}
                    isSelected={isSelected}
                />
            ) : (
                ''
            )}
            {myTroop && myTroop.ownerId != ownerId ? <EnemyTroop /> : ''}
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
function isAdjacent(pos: number, ss: number, currentTroop: Troop | null) {
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
