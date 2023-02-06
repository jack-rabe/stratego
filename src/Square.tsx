import EnemyTroop from './EnemyTroop';
import FriendlyTroop from './FriendlyTroop';
import { Troop } from './troop';

const ownerId = 2;
const water_tiles = [42, 43, 46, 47, 52, 53, 56, 57];
type Props = {
    position: number;
    squareSelected: number;
    update: React.Dispatch<React.SetStateAction<number>>;
    troops: (Troop | null)[];
    setTroops: React.Dispatch<React.SetStateAction<(Troop | null)[]>>;
    switchTurn: () => void;
};

export default function Square(props: Props) {
    const ss = props.squareSelected;
    const pos = props.position;
    const isSelected = ss == pos;
    const currentTroop = props.troops[pos];

    let bgColor: string;
    if (water_tiles.includes(pos)) bgColor = 'bg-blue-800';
    else if (isAdjacent(pos, ss, currentTroop))
        bgColor = 'bg-slate-500 hover:bg-blue-600';
    else bgColor = 'bg-slate-700';

    // handles click to attempt to select this square
    const clickToSelect = () => {
        // return early if no        // return early if the troop is the other player's
        if (currentTroop?.ownerId && currentTroop?.ownerId != ownerId) {
            handleAttack();
            return;
        }
        // return early if square is adjacent
        if (isAdjacent(pos, ss, currentTroop)) {
            handleMove();
            return;
        }
        // return early if another square is already selected or no troop is on square
        if ((props.squareSelected != -1 && ss != pos) || currentTroop == null)
            return;

        if (ss != pos) props.update(props.position);
        else props.update(-1);
    };
    // handles moving to an adjacent square
    const handleMove = () => {
        const tmp = props.troops[props.position];
        props.troops[props.position] = props.troops[props.squareSelected];
        props.troops[props.squareSelected] = tmp;
        props.setTroops(props.troops);
        props.update(-1);
        props.switchTurn();
    };
    const handleAttack = () => {
        const alliedTroop = props.troops[ss];
        let msg: string;
        if (currentTroop == null || alliedTroop == null) return;

        if (alliedTroop.value > currentTroop.value) {
            msg = 'You win!';
            props.troops[ss] = null;
            props.troops[props.position] = alliedTroop;
        } else if (alliedTroop.value < currentTroop.value) {
            msg = 'You lose!';
            props.troops[ss] = null;
        } else {
            msg = 'Tie';
            props.troops[ss] = null;
            props.troops[props.position] = null;
        }
        alert(msg);
        props.setTroops(props.troops);
        props.update(-1);
        props.switchTurn();
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
            {currentTroop && currentTroop.ownerId == ownerId ? (
                <FriendlyTroop
                    value={currentTroop.value}
                    representation={currentTroop.representation}
                    isSelected={isSelected}
                />
            ) : (
                ''
            )}
            {currentTroop && currentTroop.ownerId != ownerId ? (
                <EnemyTroop />
            ) : (
                ''
            )}
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
        (currentTroop == null || currentTroop.ownerId != ownerId) &&
        !water_tiles.includes(pos)
    );
}
