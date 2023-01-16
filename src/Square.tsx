import { useState } from 'react';

export default function Square(props: { position: number }) {
    const [selected, selectSquare] = useState(false);

    const color = selected ? ' bg-red-700' : ' bg-slate-700';
    return (
        <div
            className={
                'border-l border-t border-black text-center hover:bg-slate-500 h-16 w-16 ' +
                getBorderClasses(props.position) +
                color
            }
            // select or deselect square when clicked
            onClick={() => selectSquare(!selected)}
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
