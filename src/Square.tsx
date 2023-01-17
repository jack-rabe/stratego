import { useState } from 'react';

export default function Square(props: {
    position: number;
    squareSelected: boolean;
    update: any;
}) {
    const [selected, selectSquare] = useState(false);

    const bgColor = selected ? ' bg-red-700' : ' bg-slate-700';
    const clickToSelect = () => {
        // only allow selection if no other square is clicked already
        if (props.squareSelected && !selected) return;
        selectSquare(!selected);
        props.update(!selected);
    };
    return (
        <div
            className={
                'border-l border-t border-black text-center hover:bg-slate-500 h-16 w-16 ' +
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
