import { useState } from 'react';

export default function Square(props: {
    position: number;
    squareSelected: number;
    update: any;
}) {
    const [selected, selectSquare] = useState(false);

    let bgColor = selected ? 'bg-red-700' : 'bg-slate-700';
    const ss = props.squareSelected;
    const pos = props.position;
    if (
        (ss + 10 == pos ||
            ss - 10 == pos ||
            (Math.abs(pos - ss) == 1 &&
                Math.floor(ss / 10) == Math.floor(pos / 10))) &&
        ss != -1
    )
        bgColor = 'bg-slate-100';
    bgColor = ` ${bgColor} hover:${bgColor}`;

    // handles click to attempt to select this square
    const clickToSelect = () => {
        // return early if another square is already selected
        if (props.squareSelected != -1 && !selected) return;

        selectSquare(!selected);
        if (!selected) props.update(props.position);
        else props.update(-1);
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
            {props.position}
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
